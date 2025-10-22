import { useEffect, useState, useRef } from "react";
import ProductTile from "./components/ProductTile";
import {
  Search,
  Sun,
  Moon,
  LayoutGrid,
  List,
  ArrowDownRightFromSquare,
  X,
} from "lucide-react";
import { LogoTile } from "./components/LogoTile";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useProductStore } from "./store/useProductStore";

const ProductsPage = () => {
  const headerHeight = 110; // total height of Header + Toolbar
  const [offset, setOffset] = useState(0); // how much header/toolbar have slid up
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const [listType, setListType] = useState(
    localStorage.getItem("listType") || "grid"
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Scroll down → hide
          if (diff > 0 && currentScrollY > 0) {
            setOffset((prev) => Math.min(prev + diff, headerHeight));
          }
          // Scroll up → show
          else if (diff < 0) {
            setOffset((prev) => Math.max(prev + diff, 0));
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* Fixed Header + Toolbar */}
      <HeaderArea
        offset={offset}
        listType={listType}
        setListType={setListType}
      />

      {/* Spacer to offset fixed elements */}
      <div style={{ height: `${headerHeight}px` }} />

      {/* Page content */}
      <div className="max-w-4xl w-full flex-1">
        <ListArea listType={listType} />
      </div>

      <Footer />
    </div>
  );
};

const HeaderArea = ({ offset, listType, setListType }) => {
  return (
    <div
      className={`fixed top-0 gap-0 left-0 w-full flex flex-col items-center z-50 bg-transparent transition-transform duration-200 ease-out`}
      style={{
        transform: `translateY(-${offset}px)`,
      }}
    >
      <Header />
      <div className="pt-4 px-2 flex justify-center">
        <Toolbar listType={listType} setListType={setListType} />
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="mx-3 h-15 bg-[#242424] pt-2 w-full flex justify-center items-center">
      <div className="size-8 bg-teal-500/70 absolute left-2.5 top-2.5 rounded flex justify-center items-center">
        {/* <Menu /> */}
        <LogoTile scale="0" showLogo={false} />
      </div>
      <div className="">
        <img
          src={"/delightsome-logo-165x83-1.png"}
          className="w-[100px]"
          alt=""
        />
      </div>

      {/* <div className="text-sm mt-3 font-semibold absolute right-2.5 top-2.5 text-gray-300">
        Smoothies
      </div> */}
    </div>
  );
};

const SearchBar = ({ setSearchOpen }) => {
  const { setSearch, clearSearch: clearS, searchQuery } = useProductStore();
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        if (!searchQuery) setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSearchOpen, searchQuery]);

  const runSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
  };

  const clearSearch = () => {
    if (searchRef.current.value == "") {
      setSearchOpen(false);
    }
    searchRef.current.value = "";
    clearS();
  };

  return (
    <div className="w-full flex gap-2 items-center">
      <Search className="size-5 mt-0.5 text-gray-500 dark:text-gray-400" />
      <div className="w-full flex items-center px-2 py-0.5 rounded-full border border-gray-600 focus-within:border-gray-300 transition">
        <input
          ref={searchRef}
          type="text"
          name="search"
          id="search"
          onChange={runSearch}
          className="w-full group px-2 outline-none text-sm border-none"
        />

        <X
          onClick={clearSearch}
          className="size-4 text-gray-600/70 hover:text-gray-600 dark:text-gray-500 hover:dark:text-gray-300 cursor-pointer transition mt-0.5"
        />
      </div>
    </div>
  );
};

const Toolbar = ({ listType, setListType }) => {
  const { applyCategory } = useProductStore();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [category, setCategory] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    applyCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category, applyCategory]);

  // Apply theme to <html> element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("listType", listType);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [listType]);

  // Toggle between light & dark
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Toggle between list style
  const toggleListType = () => {
    setListType(listType === "grid" ? "list" : "grid");
  };

  const CategoryElement = () => {
    return (
      <div className="flex gap-1 mr-2 items-center justify-center cursor-pointer">
        <ArrowDownRightFromSquare className="size-4 xs:size-4.5 text-gray-600 dark:text-gray-300 hover:text-teal-500 transition" />

        <div className="text-[12px] xs:text-sm font-semibold">{category}</div>
      </div>
    );
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

  return (
    <motion.div
      layout // 👈 enables smooth layout transitions
      transition={{ duration: 0.5, ease: "easeInOut" }} // smooth timing
      className="w-full flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full px-3 xs:px-4 py-1.5 xs:py-2 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      <AnimatePresence mode="wait">
        {searchOpen ? (
          <motion.div
            key="searchbar"
            layout
            variants={searchVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <SearchBar setSearchOpen={setSearchOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="icons"
            layout
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex items-center justify-center gap-3"
          >
            <motion.div variants={itemVariants}>
              <CategoryDropdown
                element={<CategoryElement />}
                setCategory={setCategory}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Search
                onClick={() => setSearchOpen(true)}
                className="size-4.5 xs:size-5 text-gray-600 dark:text-gray-300 hover:text-white/50 cursor-pointer transition"
              />
            </motion.div>

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

            <motion.div variants={itemVariants}>
              {listType === "grid" ? (
                <LayoutGrid
                  onClick={toggleListType}
                  className="size-4.5 xs:size-5 text-gray-600 dark:text-gray-300 hover:text-teal-500 cursor-pointer transition"
                />
              ) : (
                <List
                  onClick={toggleListType}
                  className="size-4.5 xs:size-5 text-gray-600 dark:text-gray-300 hover:text-amber-500 cursor-pointer transition"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CategoryDropdown = ({ element, setCategory }) => {
  const { categories } = useProductStore();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

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
      <div onClick={() => setOpen(!open)} className="">
        {element}
      </div>

      {open && (
        <div className="absolute left-0 mt-3 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg max-h-[300px] overflow-auto">
          {categories.map((c) => (
            <button
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

const ListArea = ({ listType }) => {
  const { productsToDisplay, filteredProducts, searchQuery } =
    useProductStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // delay between each item
        delayChildren: 0.1, // wait before first item starts
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.25 } },
  };

  const products = searchQuery != "" ? filteredProducts : productsToDisplay;

  return (
    <AnimatePresence>
      <motion.div
        key={`${listType}-${products
          .map((p) => p.id)
          .join("-")}-${searchQuery}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // triggers animation when in view
        viewport={{ once: false, amount: 0.2 }} // re-animate every time visible
        className={`w-full px-5 py-5 grid ${
          listType === "grid"
            ? "grid-cols-2 xs:grid-cols-3 xs:gap-2.5 sm:gap-3 sm:grid-cols-4 gap-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3"
        }`}
      >
        {products.map((product, index) => (
          <motion.div key={index} variants={itemVariants}>
            <ProductTile product={product} listType={listType} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

const Footer = () => {
  return (
    <div className="bottom-0 mt-10 mb-5 flex gap-1 items-center justify-center">
      <LogoTile />
      <div className="text-sm">
        Powered by <span className="font-bold">Dz Menu</span>
      </div>
    </div>
  );
};

export default ProductsPage;
