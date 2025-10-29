import { useEffect, useRef, useState } from "react";
import {
  Search,
  Sun,
  Moon,
  LayoutGrid,
  List,
  ArrowDownRightFromSquare,
  X,
  Theater,
} from "lucide-react";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

// Toolbar
const Toolbar = ({
  listType,
  changeListType,
  applyCategory,
  category,
  setSearch,
  clearSearch,
  searchQuery,
  categories,
}) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const [searchOpen, setSearchOpen] = useState(false);

  // animate page if category or listType changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category, listType]);

  // Apply theme to <html> element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light & dark
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Toolbar container animation
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  // Individual icon animation
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.6, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.7, y: -10, transition: { duration: 0.25 } },
  };

  // Search bar animation
  const searchVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.25 } },
  };

  const iconClass =
    "size-4.5 xs:size-5 text-gray-600 dark:text-gray-300 cursor-pointer transition";


  const ListTypeIcon = () => {
    switch (listType) {
      case "menu":
        return (
          <Theater
            onClick={() => changeListType()}
            className={`${iconClass} hover:text-lime-500`}
          />
        );
      case "grid":
        return (
          <LayoutGrid
            onClick={() => changeListType()}
            className={`${iconClass} hover:text-teal-500`}
          />
        );

      case "list":
        return (
          <List
            onClick={() => changeListType()}
            className={`${iconClass} hover:text-amber-500`}
          />
        );

      default:
        return (
          <LayoutGrid
            onClick={() => changeListType()}
            className={`${iconClass} hover:text-lime-500`}
          />
        );
    }
  };

  return (
    <motion.div
      layout // 👈 enables smooth layout transitions
      transition={{ duration: 0.5, ease: "easeInOut" }} // smooth timing
      className="w-full flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full px-3 xs:px-4 py-1.5 xs:py-2 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      <AnimatePresence mode="wait">
        {
          // Searchbar
          searchOpen ? (
            <motion.div
              key="searchbar"
              layout
              variants={searchVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              <SearchBar
                setSearchOpen={setSearchOpen}
                setSearch={setSearch}
                clearSearch={clearSearch}
                searchQuery={searchQuery}
                category={category}
                categories={categories}
              />
            </motion.div>
          ) : (
            // Category & Actions
            <motion.div
              key="icons"
              layout
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full flex items-center justify-center gap-3"
            >
              {/* Category */}
              <motion.div variants={itemVariants}>
                <CategoryDropdown
                  element={<CategoryElement category={category} />}
                  setCategory={applyCategory}
                  categories={categories}
                />
              </motion.div>

              {/* Search Icon */}
              <motion.div variants={itemVariants}>
                <Search
                  onClick={() => setSearchOpen(true)}
                  className="size-4.5 xs:size-5 text-gray-600 dark:text-gray-300 hover:text-white/50 cursor-pointer transition"
                />
              </motion.div>

              {/* Theme */}
              <motion.div variants={itemVariants}>
                {theme === "light" ? (
                  <Sun
                    onClick={toggleTheme}
                    className="size-4.5 xs:size-5 text-gray-600 hover:text-yellow-500 cursor-pointer transition"
                  />
                ) : (
                  <Moon
                    onClick={toggleTheme}
                    className="size-4.5 xs:size-5 text-gray-300 hover:text-indigo-400 cursor-pointer transition"
                  />
                )}
              </motion.div>

              {/* List Type */}
              <motion.div variants={itemVariants}>
                <ListTypeIcon />
              </motion.div>

              {/*  */}
            </motion.div>
          )
        }
      </AnimatePresence>
    </motion.div>
  );
};

// Category select
const CategoryDropdown = ({ element, setCategory, categories }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  //   close category select
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Toggle element */}
      <div onClick={() => setOpen(!open)} className="">
        {element}
      </div>

      {/* category options */}
      {open && (
        <div className="absolute left-0 mt-3 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg max-h-[300px] overflow-auto custom-scrollbar">
          {categories && categories.map((c, i) => (
            <button
              key={i}
              onClick={() => {
                setCategory(c);
                setOpen(false);
              }}
              className="w-full px-4 py-2 text-left truncate text-gray-700 hover:bg-gray-100"
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Category title
const CategoryElement = ({ category }) => {
  return (
    <div className="flex gap-1 mr-2 items-center justify-center cursor-pointer">
      <ArrowDownRightFromSquare className="size-4 xs:size-4.5 text-gray-600 dark:text-gray-300 hover:text-teal-500 transition" />

      <div className="text-[13px] xs:text-sm font-semibold">{category}</div>
    </div>
  );
};

// Search bar
const SearchBar = ({
  setSearchOpen,
  setSearch,
  clearSearch,
  searchQuery,
  category,
  categories,
}) => {
  const searchRef = useRef(null);
  const searchBarRef = useRef(null);
  const [searchCategory, setSearchCategory] = useState(category);

  //   focus input once in view
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  //   apply category
  useEffect(() => {
    const val = searchRef.current.value;
    setSearch(val, searchCategory);
  }, [searchCategory, setSearch]);

  //   close searchbar if query is empty
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
        if (!searchQuery) setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSearchOpen, searchQuery]);

  //   search
  const runSearch = (e) => {
    const val = e.target.value;
    setSearch(val, searchCategory);
  };

  //   clear search
  const runClearSearch = () => {
    if (searchRef.current.value == "") {
      setSearchOpen(false);
    }
    searchRef.current.value = "";
    clearSearch();
    setSearchCategory(category);
  };

  return (
    <div className="w-full gap-2 flex items-center" ref={searchBarRef}>
      {/* Category */}
      <CategoryDropdown
        element={
          <div className="flex gap-1 items-center cursor-pointer max-w-[100px] xs:max-w-[150px]">
            <Search className="size-4 mt-0.5 text-gray-500 dark:text-gray-400" />
            <div className="text-[12px] truncate xs:text-sm font-semibold">
              {searchCategory}
            </div>
          </div>
        }
        setCategory={setSearchCategory}
        categories={categories}
      />

      {/* Input */}
      <div className="w-full flex items-center px-2 py-0.5 rounded-full border border-gray-600 focus-within:border-gray-300 transition">
        <input
          ref={searchRef}
          type="text"
          name="search"
          id="search"
          onChange={runSearch}
          className="w-full group px-2 outline-none text-sm border-none"
        />

        {/* clear icon */}
        <X
          onClick={runClearSearch}
          className="size-4 text-gray-600/70 hover:text-gray-600 dark:text-gray-500 hover:dark:text-gray-300 cursor-pointer transition mt-0.5"
        />
      </div>
    </div>
  );
};

export default Toolbar;
