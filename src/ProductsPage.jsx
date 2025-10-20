import { useEffect, useState, useRef } from "react";
import ProductTile from "./components/ProductTile";
import {
  Search,
  Sun,
  Moon,
  LayoutGrid,
  List,
  Home,
  Square,
} from "lucide-react";
import { LogoTile } from "./components/LogoTile";

const ProductsPage = () => {
  const headerHeight = 110; // total height of Header + Toolbar
  const [offset, setOffset] = useState(0); // how much header/toolbar have slid up
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

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
    <div className="flex flex-col items-center w-full">
      {/* Fixed Header + Toolbar */}
      <div
        className={`fixed top-0 gap-0 left-0 w-full flex flex-col items-center z-50 bg-transparent shadow-sm transition-transform duration-200 ease-out`}
        style={{
          transform: `translateY(-${offset}px)`,
        }}
      >
        <Header />
        <div className="w-full pt-2 px-5 flex justify-center">
          <div className="flex justify-center">
            <Toolbar />
          </div>
        </div>
      </div>

      {/* Spacer to offset fixed elements */}
      <div style={{ height: `${headerHeight}px` }} />

      {/* Page content */}
      <ListArea />
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <div className="mx-3 h-15 bg-[#242424] pt-2 w-full flex justify-center items-center">
      <div className="size-8 bg-teal-500/70 absolute left-2.5 top-2.5 rounded"></div>
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

const Toolbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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

  return (
    <div className="flex items-center justify-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full px-3 xs:px-4 py-1.5 xs:py-2 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="flex gap-0.5 mr-2 items-center justify-center">
        <Square className="size-4 xs:size-5 text-gray-600 dark:text-gray-300 hover:text-blue-600 cursor-pointer" />

        <div className="text-[12px] xs:text-sm font-semibold">Smoothies</div>
      </div>

      {/* Search */}
      <Search className="size-4 xs:size-5 text-gray-600 dark:text-gray-300 hover:text-blue-600 cursor-pointer" />

      {/* Theme toggle */}
      {theme === "light" ? (
        <Sun
          onClick={toggleTheme}
          className="size-4 xs:size-5 text-gray-600 hover:text-yellow-500 cursor-pointer"
        />
      ) : (
        <Moon
          onClick={toggleTheme}
          className="size-4 xs:size-5 text-gray-300 hover:text-indigo-400 cursor-pointer"
        />
      )}

      {/* Layout Icons */}
      <LayoutGrid className="size-4 xs:size-5 text-gray-600 dark:text-gray-300 hover:text-green-500 cursor-pointer" />
      <List className="size-4 xs:size-5 text-gray-600 dark:text-gray-300 hover:text-purple-500 cursor-pointer" />
    </div>
  );
};

const ListArea = () => {
  const products = [
    {
      name: "Be Radiant",
      price: 2500,
      img: "/products/Juice-Be-Radiant-web.jpg",
    },
    {
      name: "Brighter Side",
      price: 2500,
      img: "/products/Juice-Brighter-Side-web.jpg",
    },
    {
      name: "Lift Me Up",
      price: 2500,
      img: "/products/Juice-Lift-Me-Up-web.jpg",
    },
    {
      name: "Lovely Beet",
      price: 2500,
      img: "/products/Juice-Lovely-Beet-web.jpg",
    },
    {
      name: "Move On Juice",
      price: 2500,
      img: "/products/Juice-Move-On-web.jpg",
    },
    {
      name: "Follow Me",
      price: 2500,
      img: "/products/Smoothies-Follow-Me-web.jpg",
    },
    {
      name: "Green Blossom",
      price: 2500,
      img: "/products/Smoothies-Green-Blossom-web.jpg",
    },
    {
      name: "Pink Connect",
      price: 2500,
      img: "/products/Smoothies-Pink-Connect-web.jpg",
    },
    { name: "Revive", price: 2500, img: "/products/Smoothies-Revive-web.jpg" },
    {
      name: "Whitesnow",
      price: 2500,
      img: "/products/Smoothies-Whitesnow-web.jpg",
    },
    {
      name: "Tigernut Banana",
      price: 2500,
      img: "/products/Tigernut-Banana-web.jpg",
    },
    {
      name: "Tigernut Delight Me",
      price: 2500,
      img: "/products/Tigernut-Delight-Me-web.jpg",
    },
    {
      name: "Tigernut Ginger",
      price: 2500,
      img: "/products/Tigernut-Ginger-web.jpg",
    },
    {
      name: "Tigernut Relish",
      price: 2500,
      img: "/products/Tigernut-Relish-web.jpg",
    },

    {
      name: "Tigernut Relish",
      price: 2500,
      img: "/products/revive.png",
    },
  ];

  return (
    <div className="max-w-4xl w-full grid grid-cols-2 xs:grid-cols-3 xs:gap-2.5 sm:gap-3 sm:grid-cols-4 gap-2 px-5 py-5">
      {products.map((product) => (
        <ProductTile product={product} />
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <div className="mt-10 mb-5 flex gap-1 items-center justify-center">
      <LogoTile/>
      <div className="text-sm">
        Powered by <span className="font-bold">Dz Menu</span>
      </div>
    </div>
  );
};

export default ProductsPage;
