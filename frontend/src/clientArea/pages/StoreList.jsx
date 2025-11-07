import { Plus, Store, ArrowRight, Edit3, Eye, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useClientStore } from "../../store/useClientStore";
import { Link } from "react-router-dom";
import { useGeneralStore } from "../../store/useGeneralStore";
import { create_store, update_store } from "../../helpers/serverHelpers";
import toast from "react-hot-toast";
import ManageStoreDialog from "../dialogs/ManageStore";
import { notify } from "../../store/useNotificationStore";

const StoreList = () => {
  const { updateStore, getMyStores } = useClientStore();

  const [open, setOpen] = useState(false);

  const [storeDetails, setStoreDetails] = useState({});

  const onClose = () => setOpen(false);

  const openManageStore = (store = null) => {
    setStoreDetails(store);
    setOpen(true);
  };

  // create/update store
  const onSave = async (dataToSend, rawData, isCreate) => {
    let cat;
    if (isCreate) {
      cat = await create_store(dataToSend);
    } else {
      cat = await update_store(dataToSend);
    }

    if (!cat.success) toast.error(cat.message || "Error", { id: "error1" });
    else {
      notify({
        title: "Store Updated",
        message: "Your store was successfully updated!",
        type: "success",
        duration: 4000,
      });
      updateStore(rawData);
    }
    return cat.success;
  };

  useEffect(() => {
    getMyStores();
  }, [getMyStores]);

  return (
    <div className="w-full py-10 pt-5">
      <div className="w-full rounded-2xl h-fit bg-white/70 backdrop-blur-md px-3 sm:px-6 py-8 shadow-md space-y-10">
        {/* Active Store Section */}
        <ActiveStore openManageStore={openManageStore} />
      </div>

      <div className="border-b border-gray-700/60 py-2 mb-3 mt-10 flex items-center gap-2 text-xl font-semibold">
        <Store className="size-5" />
        Other stores
      </div>

      <div className="w-full rounded-2xl h-fit bg-white/70 backdrop-blur-md px-3 sm:px-6 py-8 shadow-md space-y-10">
        {/* Store List */}
        <Stores />

        {/* Add new store button */}
        <div
          onClick={() => openManageStore(null)}
          className="flex mt-10 cursor-pointer rounded-xl font-semibold items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:scale-[1.02] transition-all duration-200 h-12 w-[220px] gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Store
        </div>
      </div>

      <ManageStoreDialog
        open={open}
        onClose={onClose}
        store={storeDetails}
        onSave={onSave}
      />
    </div>
  );
};

const ActiveStore = ({ openManageStore }) => {
  const { activeStore: store } = useClientStore();
  const { setConfirmDetails } = useGeneralStore();

  if (!store) return null;

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
    <div className="w-full overflow-hidden bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-lg">
      {/* Left section: logo and store info */}
      <div className="flex w-full lg:w-fit items-center gap-5 flex-col xs:flex-row justify-center">
        <div className="min-w-20 h-20 rounded-2xl flex items-center justify-center border border-gray-300 shadow-sm">
          {" "}
          <Store className="size-10 text-blue-500" />
        </div>
        {/* Store info */}
        <div className="w-full max-w-[300px] overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 leading-6">
            {store.storeName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 overflow-hidden">
            {store.shortInfo}
          </p>
          <div className="w-full flex items-center gap-2 mt-4 text-sm flex-col xs:flex-row">
            <span className="bg-blue-100 min-w-fit text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full">
              {store.segment}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {store.storeId}
            </span>
          </div>
        </div>
      </div>

      {/* Right section: quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          to={`${store.storeId}`}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">View Store</span>
        </Link>

        <button
          onClick={openConfirmDialog}
          className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-xl bg-gray-900 hover:bg-gray-800 text-white transition"
        >
          <Edit3 className="w-4 h-4" />
          <span className="text-sm font-medium">Edit store</span>
        </button>
      </div>
    </div>
  );
};

const Stores = () => {
  const { stores } = useClientStore();

  return (
    <div className="flex flex-wrap justify-center items-center w-full gap-6">
      {(stores &&
        stores.length &&
        stores.map((store, i) => <StoreTile key={i} store={store} />)) || (
        <div className="flex items-center gap-2">
          <ShoppingBag className="size-5" />
          <div className="w-full">
            You haven't added any stores. Create one to start listing and
            displaying your store.
          </div>
        </div>
      )}
    </div>
  );
};

const StoreTile = ({ store }) => {
  const { changeStore, activeStore } = useClientStore();
  const { setConfirmDetails } = useGeneralStore();

  const checkIfActive = (storeId) => {
    const openConfirmDialog = (storeId) => {
      const conf = {
        onConfirm: handleChange,
        title: "Change Store",
        description: `You are about to change your active store to store with ID ${storeId}`,
        icon: "warning",
        confirmText: "Change store",
        cancelText: "Just view",
      };

      setConfirmDetails(conf);
    };

    const handleChange = () => {
      changeStore(storeId);
    };

    if (!activeStore?.storeId) {
      changeStore(storeId);
    } else if (activeStore?.storeId !== storeId) {
      openConfirmDialog(storeId);
    } 
  };

  return (
    <Link
      to={`${store.storeId}`}
      onClick={() => checkIfActive(store?.storeId)}
      className="group h-[170px] w-[230px] bg-white shadow-lg rounded-2xl border border-gray-200 hover:border-blue-400 transition-all duration-200 hover:shadow-blue-200/70 flex flex-col overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center h-full px-4 text-center transition-transform duration-300 group-hover:scale-[1.02]">
        <Store className="w-8 h-8 text-blue-500 mb-2" />
        <h3 className="font-semibold text-lg text-gray-800 leading-5">
          {store.storeName}
        </h3>
        <p className="text-gray-500 text-sm mt-1.5">{store.slogan}</p>
      </div>

      <div className="h-10 bg-gray-100/80 border-t border-gray-200 flex items-center justify-between px-4 text-sm text-gray-600">
        <span className="leading-3">@{store.storeId}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </Link>
  );
};

export default StoreList;
