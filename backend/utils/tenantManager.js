import mongoose from "mongoose";
import {LRUCache} from "lru-cache";

// Keep up to 50 tenant DBs active (auto-close least used)
const connectionCache = new LRUCache({
  max: 50, // number of active DB connections
  ttl: 1000 * 60 * 60, // 1 hour inactivity timeout
  updateAgeOnGet: true, // refresh TTL when reused
  dispose: (dbName, conn) => {
    console.log(`🧹 Closing idle connection: ${dbName}`);
    conn
      .close()
      .catch((err) => console.error(`❌ Error closing ${dbName}`, err));
  },
});

const modelCache = {}; // Cache models per tenant DB

/**
 * Get or create a Mongo connection for a tenant DB
*/
export async function getTenantConnection(dbName) {
  if (connectionCache.has(dbName)) return connectionCache.get(dbName);

  const isDev = process.env.NODE_ENV === "development";
  const db_uri = isDev
    ? process.env.DEV_MONGO_TENANT_URI
    : process.env.MONGO_TENANT_URI;

  const uri = db_uri.replace("<DB_NAME>", dbName);

  const conn = await mongoose.createConnection(uri, {
    maxPoolSize: 10,
    minPoolSize: 1,
    serverSelectionTimeoutMS: 5000,
  }).asPromise();

  conn.on("connected", () => console.log(`✅ Connected to ${dbName}`));
  conn.on("disconnected", () => console.warn(`⚠️ Disconnected from ${dbName}`));
  conn.on("error", (err) => console.error(`❌ Mongo error in ${dbName}:`, err));

  connectionCache.set(dbName, conn);
  modelCache[dbName] = modelCache[dbName] || {};

  return conn;
}

/**
 * Get or register a tenant model (cached per tenant)
 */
export async function getTenantModel(dbName, modelName, schema) {
  const conn = await getTenantConnection(dbName);
  modelCache[dbName] = modelCache[dbName] || {};

  if (modelCache[dbName][modelName]) {
    return modelCache[dbName][modelName];
  }

  const model = conn.model(modelName, schema);
  modelCache[dbName][modelName] = model;
  return model;
}
