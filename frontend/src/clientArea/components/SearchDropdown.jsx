import { useState, useEffect, useRef } from "react";
import { Search, FileText, Package, Store, X } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function SearchDropdown() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  // Fake search results for demo
  const results = {
    pages: [
      { id: 1, name: "About Us", type: "Page" },
      { id: 2, name: "Contact", type: "Page" },
    ],
    products: [
      { id: 1, name: "Blue Modern Chair", type: "Product" },
      { id: 2, name: "Luxury Table Lamp", type: "Product" },
    ],
    stores: [
      { id: 1, name: "Vista Home Store", type: "Store" },
      { id: 2, name: "UrbanStyle Furniture", type: "Store" },
    ],
  };

  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredResults([]);
      setOpen(false);
      return;
    }

    // Simulated search across categories
    const allResults = [
      ...results.pages
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .map((r) => ({ ...r, category: "Page" })),
      ...results.products
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .map((r) => ({ ...r, category: "Product" })),
      ...results.stores
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .map((r) => ({ ...r, category: "Store" })),
    ];

    setFilteredResults(allResults);
    setOpen(true);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={inputRef} className="relative w-full max-w-md">
      {/* Search Bar */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700 shadow-sm backdrop-blur-md focus-within:ring-2 focus-within:ring-blue-500 transition-all">
        <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Search pages, products, or stores..."
          className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setOpen(true)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {open && filteredResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 bg-white/90 dark:bg-zinc-900/90 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden z-50"
          >
            <ul className="divide-y divide-gray-100 dark:divide-zinc-800 max-h-[400px] overflow-auto custom-scrollbar">
              {filteredResults.map((item) => (
                <li
                  key={`${item.category}-${item.id}`}
                  className="p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50 dark:hover:from-zinc-800 dark:hover:to-zinc-900 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {item.category === "Page" && (
                      <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 rounded-lg">
                        <FileText className="w-4 h-4" />
                      </div>
                    )}
                    {item.category === "Product" && (
                      <div className="p-2 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-lg">
                        <Package className="w-4 h-4" />
                      </div>
                    )}
                    {item.category === "Store" && (
                      <div className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400 rounded-lg">
                        <Store className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-100">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.category}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* No Results */}
        {open && query && filteredResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 bg-white/90 dark:bg-zinc-900/90 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-2xl p-4 text-center text-gray-500 dark:text-gray-400 backdrop-blur-md z-50"
          >
            No results found for “{query}”
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
