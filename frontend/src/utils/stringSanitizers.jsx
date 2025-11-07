
export const validateString = (input) => {
  const str = input.toLowerCase().trim();

  // Expanded forbidden list
  const forbidden = [
    // Reserved / admin keywords
    "client",
    "admin",
    "root",
    "system",
    "superuser",
    "user",
    "users",
    "staff",
    "team",
    "employee",
    "dashboard",
    "panel",
    "settings",
    "config",
    "configuration",
    "control",
    "manage",
    "management",
    "secure",
    "auth",
    "authenticate",
    "login",
    "logout",
    "register",
    "signup",
    "signin",
    "account",
    "profile",

    // CRUD & code-related terms
    "new",
    "create",
    "return",
    "div",
    "case",
    "script",
    "update",
    "delete",
    "remove",
    "insert",
    "query",
    "fetch",
    "post",
    "get",
    "put",
    "patch",
    "sql",
    "api",
    "json",
    "ajax",
    "function",
    "var",
    "const",
    "let",
    "import",
    "export",
    "require",
    "class",
    "component",
    "store",
    "page",
    "pages",
    "category",
    "categories",

    // System paths
    "assets",
    "static",
    "public",
    "private",
    "uploads",
    "files",
    "media",
    "img",
    "image",
    "css",
    "js",
    "scripts",

    // Security or redirect-related
    "redirect",
    "callback",
    "token",
    "session",
    "cookie",
    "csrf",
  ];

  for (const word of forbidden) {
    if (str.includes(word)) {
      return false;
    }
  }

  // Allow only letters, numbers, '-', and '.'
  const specialCharRegex = /[^a-zA-Z0-9.-]/;
  if (specialCharRegex.test(str)) {
    return false;
  }

  return true; // ✅ valid
}

export const sanitizeStoreId = (value) => {
  if (!value) return "";

  return value
    .toLowerCase()               // make lowercase
    .trim()                      // remove surrounding spaces
    .replace(/[^a-z0-9.-]+/g, "-") // replace invalid chars with "-"
    .replace(/-+/g, "-")         // collapse multiple dashes
    .replace(/^-|-$/g, "-")       // trim leading/trailing dashes
    .slice(0, 20);               // limit to 25 characters
}

export const sanitizeString = (value, limit=100) => {
  if (!value) return "";

  return value                            // remove leading/trailing spaces
    .replace(/[^a-zA-Z0-9@(),.:;_\-\s']+/g, "") // remove unwanted chars
    .replace(/\s+/g, " ")                    // collapse multiple spaces
    .slice(0, limit);                          // optional: limit to 100 chars
}


