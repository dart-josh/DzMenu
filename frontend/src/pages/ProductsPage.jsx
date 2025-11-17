import { useState } from "react";
import ProductTile from "../components/ProductTile";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { usePageStore } from "../store/usePageStore";
import HeaderArea from "../components/HeaderArea";
import Footer from "../components/Footer";
import ProductMealDialog from "../components/ProductMealDialog";
import Sidebar from "../components/SideBar";

const ProductsPage = () => {
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

  const [productMealDialogOpen, setProductMealDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col items-center custom-scrollbar overflow-y-scroll">
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
        pageType={"product"}
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

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} pages={externalPages} />

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
    category,
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
  // console.log(productsToDisplay)
  return (
    <AnimatePresence>
      <motion.div
        key={`${defaultListStyle}-${products
          .map((p) => p.id)
          .join("-")}-${searchQuery}-${category}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible" // triggers animation when in view
        className={`w-full px-5 py-5 grid ${
          defaultListStyle === "grid"
            ? "grid-cols-2 xs:grid-cols-3 xs:gap-2.5 sm:gap-3 sm:grid-cols-4 gap-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3"
        }`}
      >
        {products.map((product, index) => (
          <motion.div key={index} variants={itemVariants}>
            <ProductTile
              product={product}
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

export default ProductsPage;
