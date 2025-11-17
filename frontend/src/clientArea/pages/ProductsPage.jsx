import {
  Plus,
  Grid,
  List,
  ShoppingBag,
  Trash2,
  ListFilterIcon,
  ImageOff,
  Loader,
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ManageProductDialog from "../dialogs/ManageProduct";
import {
  useClientProductStore,
  useClientStore,
} from "../../store/useClientStore";
import { notify } from "../../store/useNotificationStore";
import { formatNumber } from "../../utils/formats";
import { useGeneralStore } from "../../store/useGeneralStore";
import { delete_product } from "../../helpers/serverHelpers";
import { NoActiveStore } from "../components/NoActiveStore";
import { useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("x");

  const { activeStore } = useClientStore();
  const { products, categories } = useClientProductStore();
  const { category } = useParams();
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const [productsToDisplay, setProductsToDisplay] = useState([]);

  const [open, setOpen] = useState(false);

  const [productDetails, setProductDetails] = useState({});

  const onClose = () => setOpen(false);

  const openManageProduct = (product = null) => {
    if (!activeStore?.storeId) {
      return notify({
        title: "No active store",
        message: "You need to have an active store to manage products",
        type: "error",
        duration: 3000,
        key: "error1",
      });
    }

    setProductDetails(product);
    setOpen(true);
  };

  // filter products
  useEffect(() => {
    if (!category || category.toLowerCase() === "all")
      setProductsToDisplay(products);
    else {
      const ptd = products.filter(
        (p) =>
          p.category.replaceAll(" ", "_").toLowerCase() ==
          category.replaceAll(" ", "_").toLowerCase()
      );
      setProductsToDisplay(ptd);
    }
  }, [category, products]);

  useEffect(() => {
    if (query == "create") {
      openManageProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (!activeStore?.storeId) return <NoActiveStore />;

  return (
    <div className="w-full py-10 pt-5">
      {/* 🟩 Categories */}
      {categories.length > 0 && (
        <div className="flex gap-2 xs:gap-3 sm:gap-4 overflow-x-auto custom-scrollbar pb-3 w-full">
          {categories.map((cat, i) => {
            let link;
            const _link = `/client/products/${cat
              .toLowerCase()
              .replaceAll(" ", "_")}`;
            if (pathname == _link) {
              link = "/client/products";
            } else link = _link;

            return (
              <Link key={i} to={link}>
                <CategoryTile
                  category={cat}
                  active={category === cat.toLowerCase().replaceAll(" ", "_")}
                />
              </Link>
            );
          })}
        </div>
      )}

      {/* 🏷 Current Category */}
      <div className="flex items-center justify-between mt-3 xs:mt-5 mb-3">
        <div className="flex items-center gap-5">
          <div className="font-semibold text-2xl text-gray-800 capitalize">
            {category?.replaceAll("_", " ") || "All products"}
          </div>

          <AddNewButton_2 openManageProduct={openManageProduct} />
        </div>

        {/* Toggle View */}
        <div className="flex items-center gap-2 bg-white shadow-sm border rounded-full px-2 xs:px-3 py-0.5 xs:py-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-full transition ${
              viewMode === "grid"
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-full transition ${
              viewMode === "list"
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* 🛍 Product Section */}
      <div className="w-full rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm px-2 xs:px-6 py-3 xs:py-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-6">
            {(productsToDisplay.length &&
              productsToDisplay.map((product, i) => (
                <ProductTile
                  key={i}
                  product={product}
                  openManageProduct={openManageProduct}
                />
              ))) || <EmptyList />}
            <AddNewButton
              empty
              label="Add product"
              openManageProduct={openManageProduct}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(productsToDisplay.length &&
              productsToDisplay &&
              productsToDisplay.map((product, i) => (
                <ProductRow
                  key={i}
                  product={product}
                  openManageProduct={openManageProduct}
                  storeId={activeStore?.storeId}
                />
              ))) || <EmptyList />}
            <AddNewButton
              label="Add product"
              openManageProduct={openManageProduct}
            />
          </div>
        )}
      </div>

      <ManageProductDialog
        open={open}
        onClose={onClose}
        product={productDetails}
        storeId={activeStore?.storeId}
        category={category}
      />
    </div>
  );
};

const CategoryTile = ({ category, active }) => {
  return (
    <div
      className={`flex items-center gap-2 px-3 xs:px-5 py-1 xs:py-2 max-w-fit truncate rounded-full border text-sm font-medium transition-all cursor-pointer shadow-sm 
        ${
          active
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-md"
            : "bg-white text-gray-700 hover:bg-blue-50 border-gray-200"
        }`}
    >
      <ShoppingBag
        size={16}
        className={active ? "text-white" : "text-blue-500"}
      />
      <span className="capitalize">{category}</span>
    </div>
  );
};

// 🧱 Product Tile (Grid)
const ProductTile = ({ product, openManageProduct }) => {
  return (
    <div className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg bg-white transition-all border border-gray-100 hover:border-blue-300">
      {(product?.image && (
        <img
          onClick={() => openManageProduct(product)}
          src={product.image}
          alt={product.name}
          className="h-30 xs:h-40 w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      )) || (
        <div
          onClick={() => openManageProduct(product)}
          className="h-30 xs:h-40 w-full flex items-center justify-center"
        >
          <ImageOff className="size-10 xs:size-14 text-gray-600" />
        </div>
      )}
      <div className="p-4 flex flex-col justify-between">
        <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
        <div className="text-sm text-gray-600 mt-1">
          ₦{formatNumber(product.price)}
        </div>
      </div>
    </div>
  );
};

// 📋 Product Row (List)
const ProductRow = ({ product, openManageProduct, storeId }) => {
  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl shadow-sm p-3 hover:shadow-md hover:border-blue-200 transition">
      <div className="flex items-center gap-3">
        {(product?.image && (
          <img
            onClick={() => openManageProduct(product)}
            src={product.image}
            alt={product.name}
            className="w-14 h-14 object-cover rounded-lg"
          />
        )) || (
          <div
            onClick={() => openManageProduct(product)}
            className="size-14 flex items-center justify-center"
          >
            <ImageOff className="size-8 text-gray-600" />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-500 text-sm">
            ₦{formatNumber(product.price)}
          </p>
        </div>
      </div>
      <DeleteProductButton storeId={storeId} productId={product.productId} />
    </div>
  );
};

const DeleteProductButton = ({ productId, storeId }) => {
  const { setConfirmDetails } = useGeneralStore();
  const { deleteProduct } = useClientProductStore();

  const [isLoading, setIsLoading] = useState(false);

  const openConfirmDialog = () => {
    const conf = {
      onConfirm: handleDelete,
      title: "Delete Product",
      description:
        "You are about to delete this product?. This process is irreversible.",
      icon: "warning",
      confirmText: "Delete",
      cancelText: "Cancel",
    };

    setConfirmDetails(conf);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const res = await delete_product(storeId, productId);
    setIsLoading(false);

    const { success, message } = res;
    if (success == true) {
      notify({
        title: "Product Deleted",
        message: message,
        type: "success",
        duration: 4000,
        key: "success1",
      });
      deleteProduct(productId);
    } else {
      notify({
        title: "Error deleting",
        message: message,
        type: "error",
        duration: 4000,
        key: "error1",
      });
    }
  };
  if (isLoading)
    return (
      <div className="flex items-center justify-center gap-2">
        <div className="animate-spin">
          <Loader className="size-4" />
        </div>
        Deleting...
      </div>
    );

  return (
    <div className="flex items-center text-gray-500">
      <Trash2
        onClick={openConfirmDialog}
        className="w-4 h-4 hover:text-red-500 cursor-pointer"
      />
    </div>
  );
};

// ➕ Add New Button
const AddNewButton = ({ empty = false, label, openManageProduct }) => {
  return (
    <div
      onClick={() => openManageProduct()}
      className={`flex cursor-pointer items-center justify-center font-semibold gap-2 rounded-xl transition-all ${
        empty
          ? "flex-col h-[180px] border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 text-gray-600"
          : "h-11 w-[220px] mt-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:scale-[1.02] hover:shadow-lg"
      }`}
    >
      <Plus className={empty ? "w-7 h-7 text-blue-500" : "w-5 h-5"} />
      {label}
    </div>
  );
};

const AddNewButton_2 = ({ openManageProduct }) => {
  return (
    <div
      onClick={() => openManageProduct()}
      className={`flex cursor-pointer items-center justify-center font-semibold gap-1 rounded-xl transition-all border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 w-25 text-gray-600`}
    >
      <Plus className={"size-5 text-blue-500"} />
      Add
    </div>
  );
};

const EmptyList = () => {
  return (
    <div
      className={`flex cursor-pointer items-center justify-center text-lg  font-semibold gap-2 rounded-xl transition-all ${"flex-col h-[180px] border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 text-gray-600"}`}
    >
      <ListFilterIcon className={"w-7 h-7 text-blue-500"} />
      No Products
    </div>
  );
};

export default ProductsPage;
