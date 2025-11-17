import { useEffect, useRef, useState } from "react";
import { LogoTile } from "./LogoTile";
import Toolbar from "./Toolbar";

const HeaderArea = ({
  headerHeight,
  applyCategory,
  defaultCategory,
  defaultListStyle,
  changeListType,
  setSearch,
  clearSearch,
  searchQuery,
  categories,
  setSidebarOpen,
}) => {
  const [offset, setOffset] = useState(0); // how much header/toolbar have slid up
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // show & hide header with page scroll
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
  }, [headerHeight]);

  return (
    <div
      className={`fixed top-0 gap-0 left-0 w-full flex flex-col items-center z-50 bg-transparent transition-transform duration-200 ease-out`}
      style={{
        transform: `translateY(-${offset}px)`,
      }}
    >
      <Header setSidebarOpen={setSidebarOpen} />

      {/* Toolbar */}
      <div className="pt-3 px-2 flex justify-center">
        <Toolbar
          defaultListStyle={defaultListStyle}
          changeListType={changeListType}
          applyCategory={applyCategory}
          defaultCategory={defaultCategory}
          setSearch={setSearch}
          clearSearch={clearSearch}
          searchQuery={searchQuery}
          categories={categories}
        />
      </div>
    </div>
  );
};

// Header
const Header = ({ setSidebarOpen }) => {
  return (
    <div className="mx-3 h-18 bg-[#242424] pt-1 w-full flex justify-center items-center">
      {/* Sidebar button */}
      <div
        onClick={() => setSidebarOpen(true)}
        className="size-8 bg-teal-500/70 absolute left-2.5 top-2.5 rounded flex justify-center items-center cursor-pointer"
      >
        <LogoTile scale="0" showLogo={false} />
      </div>

      <img
        src={"/delightsome-logo-165x83-1.png"}
        className="w-[120px] "
        alt="Brand Logo"
      />
    </div>
  );
};

export default HeaderArea;
