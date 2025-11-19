import { Circle, EyeOff, Loader } from "lucide-react";
import {
  Cog,
  Copy,
  Edit,
  Eye,
  Link2,
  Plus,
  Trash2,
  TriangleAlert,
  Store,
  ShoppingBag,
  LayoutGrid,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryManager from "../components/CategoryManager";
import {
  useClientPageStore,
  useClientProductStore,
  useClientStore,
} from "../../store/useClientStore";
import {
  delete_store,
  get_pages,
  get_products,
  get_store,
  toggleStoreLive,
  update_store,
} from "../../helpers/serverHelpers";
import { useState } from "react";
import { formatNumber, formatOpenedSince } from "../../utils/formats";
import {
  copyToClipboard,
  getBaseUrl,
  scrollToTop,
} from "../../utils/generalFns";
import toast from "react-hot-toast";
import { useGeneralStore } from "../../store/useGeneralStore";
import ManageStoreDialog from "../dialogs/ManageStore";
import { notify } from "../../store/useNotificationStore";
import ManageProductDialog from "../dialogs/ManageProduct";
import { pageTypes } from "../../utils/globalVariables.jsx";
import { StoreNotFoundPage } from "../components/StoreNotFoundPage";
import { ManageStoreShimmer } from "../shimmers/ManageStoreShimmer";

const ManageStore = () => {
  const { storeId } = useParams();

  const { stores } = useClientStore();

  const [store, setStore] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      setIsLoading(true);
      if (!stores || !stores.length) {
        const res = await get_store(storeId);
        if (res) setStore(res);
      } else {
        const res = stores.find((store) => store.storeId === storeId);
        if (res) setStore(res);
      }
      setIsLoading(false);
    };

    fetchStoreDetails();
  }, [storeId, stores]);

  useEffect(() => {
    scrollToTop();
  }, [store]);

  if (isLoading) return <ManageStoreShimmer />;

  if (!store) return <StoreNotFoundPage />;

  return (
    <div className="w-full py-10 pt-5 space-y-12">
      <StoreDetails store={store} />
      <Pages storeId={storeId} />
      <Products storeId={storeId} />
      <CategoryManager storeId={storeId} />
      <StoreSettings store={store} />
      <DeleteZone storeId={storeId} />
    </div>
  );
};

// 🟢 Store Details Section
const StoreDetails = ({ store }) => {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-white shadow-lg p-6 border border-teal-100/80">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-teal-500/10 p-4 rounded-xl">
            <Store className="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {store?.storeName}
            </h2>
            <p className="text-gray-500 italic mt-1">
              {formatOpenedSince(store?.createdAt)}
            </p>
          </div>
        </div>

        <div
          onClick={() => copyToClipboard(store?.storeId)}
          className="flex min-w-fit items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700 font-medium shadow-inner"
        >
          <span>ID:</span>
          <span className="font-semibold">{store?.storeId}</span>
          <Copy className="w-4 h-4 cursor-pointer hover:text-teal-600" />
        </div>
      </div>

      <StoreLink store={store} />
    </div>
  );
};

// 🔗 Store Link
const StoreLink = ({ store }) => {
  const { updateStore } = useClientStore();
  const { storeId, storeLive } = store;
  const { setConfirmDetails } = useGeneralStore();

  const [togglingLive, setTogglingLive] = useState();

  const toggleLive = async () => {
    setTogglingLive(true);
    const res = await toggleStoreLive({ storeId, value: !storeLive });
    setTogglingLive(false);

    const { success, message, store } = res;
    if (success) {
      toast.success(message, { id: "success1" });
    } else {
      toast.error(message, { id: "error1" });
    }

    if (store) {
      updateStore(store);
    }
  };

  const openConfirmDialog = () => {
    const conf = {
      onConfirm: toggleLive,
      title: storeLive ? "Hide Store" : "Go Live",
      description: storeLive
        ? "You are about to hide your store. All your pages would be hidden. Would you like to proceed?"
        : "You are about to make this store public. All your pages would be live and accessible.",
      icon: storeLive ? "warning" : "success",
      confirmText: storeLive ? "Hide store" : "Go live",
      cancelText: "Cancel",
    };

    setConfirmDetails(conf);
  };

  return (
    <div className="mt-5 inline-flex w-fit max-w-full items-center gap-2 xs:gap-3 bg-white shadow-md rounded-full px-5 py-2 text-sm text-gray-700 font-medium hover:shadow-lg transition">
      <div>
        <Link2 className="w-4 h-4 text-teal-600" />
      </div>
      <span className="text-teal-700 font-semibold truncate">
        {store?.storeId}
      </span>
      <div onClick={() => copyToClipboard(`${getBaseUrl()}/${store?.storeId}`)}>
        <Copy className="w-4 h-4 cursor-pointer hover:text-teal-500" />
      </div>
      <div
        onClick={openConfirmDialog}
        className={`${
          storeLive ? "text-green-600" : "text-amber-600"
        } font-medium`}
      >
        {(togglingLive && (
          <div className="flex gap-1 ml-3 items-center justify-center animate-pulse">
            <Circle className="size-2 fill-green-600" />
            <Circle className="size-2 fill-green-600" />
            <Circle className="size-2 fill-green-600" />
          </div>
        )) || (
          <div className="flex items-center gap-1">
            {storeLive ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
            <span>{storeLive ? "Live" : "Hidden"}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// 🧭 Pages Section
const Pages = ({ storeId }) => {
  const { pages, activeStoreId } = useClientPageStore();

  const [pagesTD, setPagesTD] = useState([]);

  const fetchPages = async () => {
    if (storeId === activeStoreId) {
      const pds = pages.map((p) => ({
        ...p,
        icon: pageIcon(p.pageType),
      }));

      setPagesTD([...pds].reverse());
    } else {
      const pd = await get_pages(storeId);
      if (pd != null) {
        const pds = pd.map((p) => ({ ...p, icon: pageIcon(p.pageType) }));

        setPagesTD([...pds].reverse());
      }
    }
  };

  useEffect(() => {
    fetchPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId, activeStoreId, pages]);

  const pageIcon = (pageType) => {
    return (
      pageTypes().find((p) => p.id == pageType)?.icon || (
        <Store className="size-4" />
      )
    );
  };

  return (
    <div>
      <SectionHeader icon={<LayoutGrid />} title="Pages" color="blue" />
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white px-3 xs:px-5 py-5 border border-blue-100 shadow-sm">
        <div className="flex w-full overflow-x-auto pb-4 gap-4">
          {pagesTD.map((page, i) => (
            <Link
              key={i}
              to={`/client/s/${storeId}/p/${page.pageId}`}
              className="min-w-[120px] h-[80px] bg-white border border-blue-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-400 transition flex flex-col items-start justify-center px-3"
            >
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                {page.icon}
                {page.pageTitle}
              </div>
              <p className="text-xs text-gray-500 mt-1">{page.pageId}</p>
            </Link>
          ))}
        </div>

        {storeId === activeStoreId && (
          <AddNewPageButton
            label="Add new page"
            color="blue"
            storeId={storeId}
          />
        )}
      </div>
    </div>
  );
};

// 🛍 Products Section
const Products = ({ storeId }) => {
  const { products, activeStoreId } = useClientProductStore();

  const [productsTD, setProductsTD] = useState([]);

  const [open, setOpen] = useState(false);

  const [productDetails, setProductDetails] = useState({});

  const onClose = () => setOpen(false);

  const openManageProduct = (product = null) => {
    if (storeId !== activeStoreId) return;

    setProductDetails(product);
    setOpen(true);
  };

  const fetchProducts = async () => {
    if (storeId === activeStoreId) {
      const pds = products.map((p) => ({
        ...p,
        icon: <ShoppingBag size={16} />,
      }));

      setProductsTD([...pds].reverse());
    } else {
      const pd = await get_products(storeId);
      if (pd != null) {
        const pds = pd.map((p) => ({ ...p, icon: <ShoppingBag size={16} /> }));

        setProductsTD([...pds].reverse());
      }
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId, activeStoreId, products]);

  return (
    <div>
      <SectionHeader icon={<ShoppingBag />} title="Products" color="emerald" />
      <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-white px-3 xs:px-5 py-5 border border-emerald-100 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {productsTD.slice(0, 12).map((prod, i) => (
            <div
              key={i}
              onClick={() => openManageProduct(prod)}
              className="h-[80px] bg-white border border-emerald-200 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-400 transition flex flex-col items-start justify-center px-3"
            >
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                {prod.icon}
                {prod.name}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                ₦{formatNumber(prod.price)}
              </p>
            </div>
          ))}
        </div>

        {storeId === activeStoreId && (
          <Link
            to="/client/products"
            className="block mt-3 text-right text-gray-500 hover:text-emerald-700 underline italic text-sm"
          >
            View more
          </Link>
        )}

        {storeId === activeStoreId && (
          <AddNewButton
            label="Add product"
            color="emerald"
            openManageProduct={openManageProduct}
          />
        )}
      </div>

      <ManageProductDialog
        open={open}
        onClose={onClose}
        product={productDetails}
        storeId={storeId}
      />
    </div>
  );
};

// ⚙ Store Settings Section
const StoreSettings = ({ store }) => {
  const { updateStore } = useClientStore();
  const { setConfirmDetails } = useGeneralStore();

  const [open, setOpen] = useState(false);
  const [storeDetails, setStoreDetails] = useState({});
  const onClose = () => setOpen(false);

  const openManageStore = () => {
    setStoreDetails(store);
    setOpen(true);
  };

  // create/update store
  const onSave = async (dataToSend, rawData, isCreate) => {
    let cat;
    if (!isCreate) {
      cat = await update_store(dataToSend);
    }

    if (!cat.success) toast.error(cat.message || "Error", { id: "error1" });
    else {
      notify({
        title: "Store Updated",
        message: `Your store with ID ${cat?.store?.storeId} was successfully ${
          isCreate ? "created" : "updated"
        }!`,
        type: "success",
        duration: 4000,
      });
      updateStore(cat.store);
    }
    return cat.success;
  };

  const openConfirmDialog = () => {
    const conf = {
      onConfirm: handleEdit,
      title: "Edit Store",
      description:
        "You are about to edit this store. Changes made are irreversible.",
      icon: "warning",
      confirmText: "Edit",
      cancelText: "Cancel",
    };

    setConfirmDetails(conf);
  };

  const handleEdit = () => {
    openManageStore(store);
  };

  return (
    <div>
      <SectionHeader icon={<Cog />} title="Store Settings" color="violet" />
      <p className="mb-4 max-w-[500px] text-gray-600 text-sm">
        Use this section to update your store’s details such as name,
        description, and status. Don’t forget to save your changes when you’re
        done.
      </p>

      <button
        onClick={openConfirmDialog}
        className="flex items-center gap-3 font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg px-4 py-2 transition-all shadow-sm"
      >
        <Edit className="w-5 h-5" />
        Edit Store Details
      </button>

      <ManageStoreDialog
        open={open}
        onClose={onClose}
        store={storeDetails}
        onSave={onSave}
      />
    </div>
  );
};

// 🔴 Danger Zone Section
const DeleteZone = ({ storeId }) => {
  const navigate = useNavigate();
  const { deleteStore } = useClientStore();
  const { setConfirmDetails } = useGeneralStore();

  const [deletingStore, setDeletingStore] = useState(false);

  const openConfirmDialog = () => {
    const conf = {
      onConfirm: handleDelete,
      title: "Delete Store",
      description:
        "You are about to delete this store. This process is irreversible.",
      icon: "warning",
      confirmText: "Delete",
      cancelText: "Cancel",
    };

    setConfirmDetails(conf);
  };

  const handleDelete = async () => {
    setDeletingStore(true);
    const res = await delete_store(storeId);
    setDeletingStore(false);

    const { success, message } = res;
    if (success == true) {
      notify({
        title: "Store Deleted",
        message: message,
        type: "success",
        duration: 4000,
      });
      deleteStore(storeId);
      navigate("/client/store");
    } else {
      notify({
        title: "Error deleting",
        message: message,
        type: "error",
        duration: 4000,
      });
    }
  };

  return (
    <div>
      <SectionHeader icon={<TriangleAlert />} title="Danger Zone" color="red" />
      <p className="mb-4 max-w-[500px] text-gray-600 text-sm">
        Deleting this store is permanent. All associated pages, products, and
        data will be removed and cannot be recovered.
      </p>

      <button
        onClick={openConfirmDialog}
        disabled={deletingStore}
        className="font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 transition-all shadow-sm"
      >
        {deletingStore}
        {(deletingStore && (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin">
              <Loader className="size-5" />
            </div>
            Deleting...
          </div>
        )) || (
          <div className="flex items-center justify-center gap-3">
            <Trash2 className="w-5 h-5" />
            Delete Store
          </div>
        )}
      </button>
    </div>
  );
};

// ➕ Add New Button
const AddNewButton = ({ label, color = "gray", openManageProduct }) => {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    emerald: "from-emerald-500 to-emerald-600",
    gray: "from-gray-500 to-gray-600",
  };

  return (
    <div className="mt-6">
      <button
        onClick={openManageProduct}
        className={`flex items-center justify-center gap-2 font-semibold text-white bg-gradient-to-r ${colorMap[color]} hover:opacity-90 rounded-lg px-5 py-2 shadow-md transition-all`}
      >
        <Plus className="w-5 h-5" />
        {label}
      </button>
    </div>
  );
};

const AddNewPageButton = ({ label, color = "gray", storeId }) => {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    emerald: "from-emerald-500 to-emerald-600",
    gray: "from-gray-500 to-gray-600",
  };

  return (
    <div className="mt-6">
      <Link
        to={`/client/s/${storeId}/p/new`}
        className={`flex items-center w-fit justify-center gap-2 font-semibold text-white bg-gradient-to-r ${colorMap[color]} hover:opacity-90 rounded-lg px-5 py-2 shadow-md transition-all`}
      >
        <Plus className="w-5 h-5" />
        {label}
      </Link>
    </div>
  );
};

// 🧩 Section Header Component
const SectionHeader = ({ icon, title, color = "gray" }) => {
  const textColor = {
    blue: "text-blue-700 border-blue-200",
    emerald: "text-emerald-700 border-emerald-200",
    violet: "text-violet-700 border-violet-200",
    red: "text-red-700 border-red-200",
    gray: "text-gray-700 border-gray-200",
  };

  return (
    <div
      className={`flex items-center gap-3 font-bold text-xl mb-4 pb-2 border-b-2 ${textColor[color]}`}
    >
      <div className="p-1 rounded-full bg-opacity-10">{icon}</div>
      {title}
    </div>
  );
};

export default ManageStore;
