import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import HeaderArea from "../components/HeaderArea";
import Footer from "../components/Footer";
import { usePageStore } from "../store/usePageStore";
import MenuTile from "../components/MenuTile";
import ProductMealDialog from "../components/ProductMealDialog";
import Sidebar from "../components/SideBar";

const MenuPage = () => {
  const {
    applyCategory,
    defaultCategory,
    defaultListStyle,
    changeListType,
    setSearch,
    clearSearch,
    searchQuery,
    categories,
    activeProductInfo,
    setActiveProductInfo,
    externalPages,
  } = usePageStore();

  const headerHeight = 120; // total height of Header + Toolbar

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productMealDialogOpen, setProductMealDialogOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* Fixed Header + Toolbar */}
      <HeaderArea
        headerHeight={headerHeight}
        applyCategory={applyCategory}
        defaultCategory={defaultCategory}
        defaultListStyle={defaultListStyle}
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

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        pages={externalPages}
      />

      <ProductMealDialog
        open={productMealDialogOpen}
        onClose={() => {
          setProductMealDialogOpen(false);
          setActiveProductInfo(null);
        }}
        item={activeProductInfo}
      />
    </div>
  );
};

const ListArea = ({ setProductMealDialogOpen }) => {
  const {
    productsToDisplay,
    filteredProducts,
    searchQuery,
    defaultCategory,
    defaultListStyle,
    setActiveProductInfo,
  } = usePageStore();

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
        key={`${defaultListStyle}-${products
          .map((p) => p.id)
          .join("-")}-${searchQuery}-${defaultCategory}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible" // triggers animation when in view
        className={`w-full px-5 py-5 grid ${
          defaultListStyle === "list"
            ? "gap-x-1"
            : defaultListStyle === "grid"
            ? "gap-2 gap-y-3"
            : "gap-3 xs:gap-4"
        } ${
          defaultListStyle === "grid"
            ? "grid-cols-2 xs:grid-cols-3 sm:grid-cols-4"
            : "grid-cols-1 xs:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {products.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <MenuTile
              item={item}
              listType={defaultListStyle}
              setOpen={setProductMealDialogOpen}
              setActiveProductInfo={setActiveProductInfo}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default MenuPage;
