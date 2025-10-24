import { useEffect, useState } from "react";
import ProductTile from "./components/ProductTile";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useProductStore } from "./store/useProductStore";
import HeaderArea from "./components/HeaderArea";
import Footer from "./components/Footer";
import ProductMealDialog from "./components/ProductMealDialog";
import Sidebar from "./components/SideBar";

const ProductsPage = () => {
  const {
    setProducts,
    products,
    applyCategory,
    category,
    listType,
    setListType,
    setSearch,
    clearSearch,
    searchQuery,
    categories,
    activeProductInfo,
    setActiveProductInfo,
  } = useProductStore();

  const pages = [{link: '/meals', label: 'Meals'}, {link: '/category', label: 'Category'}];

  const headerHeight = 120; // total height of Header + Toolbar

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  const [productMealDialogOpen, setProductMealDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col items-center custom-scrollbar verflow-y-scroll">
      {/* Fixed Header + Toolbar */}
      <HeaderArea
        headerHeight={headerHeight}
        applyCategory={applyCategory}
        category={category}
        listType={listType}
        setListType={setListType}
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

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} pages={pages} />

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
    listType,
    setActiveProductInfo,
  } = useProductStore();

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
          .join("-")}-${searchQuery}-${category}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible" // triggers animation when in view
        className={`w-full px-5 py-5 grid ${
          listType === "grid"
            ? "grid-cols-2 xs:grid-cols-3 xs:gap-2.5 sm:gap-3 sm:grid-cols-4 gap-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3"
        }`}
      >
        {products.map((product, index) => (
          <motion.div key={index} variants={itemVariants}>
            <ProductTile
              product={product}
              listType={listType}
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
