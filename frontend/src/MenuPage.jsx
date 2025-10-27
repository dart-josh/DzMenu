import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import HeaderArea from "./components/HeaderArea";
import Footer from "./components/Footer";
import { useMenuStore } from "./store/useMenuStore";
import MenuTile from "./components/MenuTile";
import ProductMealDialog from "./components/ProductMealDialog";
import Sidebar from "./components/SideBar";

const MenuPage = () => {
  const {
    applyCategory,
    category,
    listType,
    changeListType,
    setSearch,
    clearSearch,
    searchQuery,
    categories,
    activeMealInfo,
    setActiveMealInfo,
    pages,
  } = useMenuStore();

  const headerHeight = 120; // total height of Header + Toolbar

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productMealDialogOpen, setProductMealDialogOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* Fixed Header + Toolbar */}
      <HeaderArea
        headerHeight={headerHeight}
        applyCategory={applyCategory}
        category={category}
        listType={listType}
        changeListType={changeListType}
        setSearch={setSearch}
        clearSearch={clearSearch}
        searchQuery={searchQuery}
        categories={categories}
        pageType={"menu"}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Spacer to offset fixed elements */}
      <div style={{ height: `${headerHeight}px` }} />

      {/* Page content */}
      <div className="max-w-4xl w-full flex-1">
        <ListArea setProductMealDialogOpen={setProductMealDialogOpen} />
      </div>

      {/* Footer */}
      <Footer />

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} pages={pages} />

      <ProductMealDialog
        open={productMealDialogOpen}
        onClose={() => {
          setProductMealDialogOpen(false);
          setActiveMealInfo(null);
        }}
        item={activeMealInfo}
      />
    </div>
  );
};

const ListArea = ({ setProductMealDialogOpen }) => {
  const {
    itemsToDisplay,
    filteredItems,
    searchQuery,
    category,
    listType,
    setActiveMealInfo,
  } = useMenuStore();

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

  const items = searchQuery != "" ? filteredItems : itemsToDisplay;

  return (
    <AnimatePresence>
      <motion.div
        key={`${listType}-${items
          .map((p) => p.id)
          .join("-")}-${searchQuery}-${category}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible" // triggers animation when in view
        className={`w-full px-5 py-5 grid ${
          listType === "list"
            ? "gap-x-1"
            : listType === "grid"
            ? "gap-2 gap-y-3"
            : "gap-3 xs:gap-4"
        } ${
          listType === "grid"
            ? "grid-cols-2 xs:grid-cols-3 sm:grid-cols-4"
            : "grid-cols-1 xs:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {items.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <MenuTile
              item={item}
              listType={listType}
              setOpen={setProductMealDialogOpen}
              setActiveMealInfo={setActiveMealInfo}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default MenuPage;
