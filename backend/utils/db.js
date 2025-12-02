// utils/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({quiet: true});

const isDev = process.env.NODE_ENV === "development";

// === GLOBAL CACHE ON serverless GLOBAL SCOPE ===
// Keep a single place for cached connections and models
if (!globalThis.__DB_CACHE) {
  globalThis.__DB_CACHE = {
    main: { conn: null, promise: null, models: {} },
    tenants: {} // tenants[dbName] = { conn, promise, models: {} }
  };
}
const CACHE = globalThis.__DB_CACHE;

// === UTILS ===
function getMainUri() {
  return isDev ? process.env.DEV_MONGO_MAIN_URI : process.env.MONGO_MAIN_URI;
}
function getTenantBaseUri() {
  return isDev ? process.env.DEV_MONGO_TENANT_URI : process.env.MONGO_TENANT_URI;
}

/**
 * Connect or return cached main DB (mongoose singleton)
 * Use mongoose.connect to reuse the global mongoose instance.
 */
export async function connectMainDB() {
  if (CACHE.main.conn) return CACHE.main.conn;

  if (!CACHE.main.promise) {
    const uri = getMainUri();
    if (!uri) throw new Error("Missing main DB URI env var");

    CACHE.main.promise = mongoose
      .connect(uri, {
        // tune for serverless: small pool and short timeouts
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        // keepAlive options are handled by driver default
      })
      .then((mongooseInstance) => {
        CACHE.main.conn = mongooseInstance;
        console.log("✅ Main DB connected");
        return CACHE.main.conn;
      })
      .catch((err) => {
        CACHE.main.promise = null;
        console.error("❌ Main DB connection failed:", err);
        throw err;
      });
  }

  return CACHE.main.promise;
}

/**
 * Get (or create) a tenant connection. Each tenant uses its own mongoose Connection.
 * dbName is the tenant identifier and will replace <DB_NAME> in the base URI
 */
export async function getTenantConnection(dbName) {
  if (!dbName) throw new Error("dbName is required for tenant connection");

  // return cached ready connection
  const cached = CACHE.tenants[dbName];
  if (cached?.conn) return cached.conn;

  // prepare slot
  if (!CACHE.tenants[dbName]) {
    CACHE.tenants[dbName] = { conn: null, promise: null, models: {} };
  }

  if (!CACHE.tenants[dbName].promise) {
    const baseUri = getTenantBaseUri();
    if (!baseUri) throw new Error("Missing tenant base URI env var");

    const uri = baseUri.replace("<DB_NAME>", dbName);

    // createConnection returns a Connection not the global mongoose
    const connPromise = mongoose
      .createConnection(uri, {
        maxPoolSize: 5, // small pool per tenant (tune as needed)
        minPoolSize: 1,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      .asPromise()
      .then((conn) => {
        // helpful listeners for debugging
        conn.on("connected", () => console.log(`✅ Tenant connected: ${dbName}`));
        conn.on("disconnected", () =>
          console.warn(`⚠️ Tenant disconnected: ${dbName}`)
        );
        conn.on("error", (err) =>
          console.error(`❌ Tenant ${dbName} connection error:`, err)
        );

        CACHE.tenants[dbName].conn = conn;
        return conn;
      })
      .catch((err) => {
        CACHE.tenants[dbName].promise = null;
        console.error(`❌ Failed connecting tenant ${dbName}:`, err);
        throw err;
      });

    CACHE.tenants[dbName].promise = connPromise;
  }

  return CACHE.tenants[dbName].promise;
}

/**
 * Get or create a model for a tenant connection.
 * schema should be a mongoose.Schema instance.
 */
export async function getTenantModel(dbName, modelName, schema) {
  const conn = await getTenantConnection(dbName);
  CACHE.tenants[dbName].models = CACHE.tenants[dbName].models || {};

  if (CACHE.tenants[dbName].models[modelName]) {
    return CACHE.tenants[dbName].models[modelName];
  }

  const model = conn.model(modelName, schema);
  CACHE.tenants[dbName].models[modelName] = model;
  return model;
}

/**
 * Get or register a model on main DB (global mongoose instance)
 * schema is mongoose.Schema
 */
export async function getMainModel(modelName, schema) {
  await connectMainDB(); // make sure main connected
  CACHE.main.models = CACHE.main.models || {};

  if (CACHE.main.models[modelName]) return CACHE.main.models[modelName];

  // mongoose.model on global mongoose
  const model = mongoose.model(modelName, schema);
  CACHE.main.models[modelName] = model;
  return model;
}
