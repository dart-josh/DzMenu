import {
  Plus,
  FileText,
  Edit3,
  Eye,
  Trash2,
  MoreVertical,
  Loader,
  Circle,
  EyeOff,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useClientPageStore, useClientStore } from "../../store/useClientStore";
import { useEffect, useState } from "react";
import { pageTypes } from "../../utils/globarvariables";
import { useGeneralStore } from "../../store/useGeneralStore";
import { delete_page, togglePageLive } from "../../helpers/serverHelpers";
import { notify } from "../../store/useNotificationStore";
import toast from "react-hot-toast";
import { NoActiveStore } from "../components/NoActiveStore";

const PagesList = () => {
  const { storeId } = useParams();

  const { activeStore } = useClientStore();
  const { pages } = useClientPageStore();

  const [canEdit, setCanEdit] = useState(activeStore?.storeId === storeId);

  useEffect(() => {
    setCanEdit(activeStore?.storeId === storeId);
  }, [storeId, activeStore]);

  if (!activeStore?.storeId)
    return (
      <NoActiveStore />
    );

  return (
    <div className="w-full py-10 pt-5">
      <div className="w-full rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100 shadow-md px-3 xs:px-6 py-5 xs:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pages.map((page, i) => (
            <PageTile key={i} page={page} canEdit={canEdit} storeId={storeId} />
          ))}

          {canEdit && <AddNewButton empty label="Add new page" />}
        </div>

        <div className="mt-10">
          {canEdit && <AddNewButton label="Add new page" />}
        </div>
      </div>
    </div>
  );
};

// 🧩 Page Tile
const PageTile = ({ page, canEdit, storeId }) => {
  const getPageTypeIcon = (pageType) => {
    const pg = pageTypes("w-5 h-5 text-blue-600").find(
      (p) => p.id.toLowerCase() == pageType.toLowerCase()
    );

    if (pg) return pg.icon;
    else <FileText className="w-5 h-5 text-blue-600" />;
  };

  return (
    <Link
      to={`${page.pageId}`}
      className="group relative h-[160px] bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-200 p-4 flex flex-col justify-between"
    >
      {/* Top Icon */}
      <div className="flex justify-between items-start">
        <div className="bg-blue-500/10 p-2 rounded-lg">
          {getPageTypeIcon(page.pageType)}
        </div>

        {/* {canEdit && (
          <button className="opacity-20 group-hover:opacity-100 transition">
            <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-600 transition" />
          </button>
        )} */}
      </div>

      {/* Page Info */}
      <div>
        <h3 className="font-semibold text-lg text-gray-800 truncate">
          {page.pageTitle}
        </h3>
        <p
          className={`text-sm font-medium ${
            page.visibility === "Live"
              ? "text-green-600"
              : "text-gray-500 italic"
          }`}
        >
          {page.visibility}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-500 mt-2">
        <div className="flex items-center gap-3">
          {canEdit && <Visibility storeId={storeId} page={page} />}
          {canEdit && (
            <Edit3 className="w-4 h-4 cursor-pointer hover:text-blue-600 transition" />
          )}
          {canEdit && (
            <DeletePageButton pageId={page.pageId} storeId={storeId} />
          )}
        </div>
      </div>
    </Link>
  );
};

// ➕ Add New Button
const AddNewButton = ({ empty = false, label }) => {
  return (
    <Link
      to={"new"}
      className={`flex cursor-pointer items-center justify-center font-semibold text-gray-700 gap-2 rounded-xl transition-all ${
        empty
          ? "h-[160px] border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 flex-col"
          : "h-11 w-[220px] bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:scale-[1.02] hover:shadow-lg"
      }`}
    >
      <Plus className={empty ? "w-6 h-6 text-blue-500" : "w-5 h-5"} />
      {label}
    </Link>
  );
};

// togglePageLive
const Visibility = ({ storeId, page }) => {
  const { updatePage } = useClientPageStore();
  const { pageId, visibility } = page;
  const { setConfirmDetails } = useGeneralStore();

  const [togglingLive, setTogglingLive] = useState(false);

  const toggleLive = async () => {
    setTogglingLive(true);
    const res = await togglePageLive(storeId, {
      storeId,
      pageId,
      value: visibility == "Live" ? false : true,
    });
    setTogglingLive(false);

    const { success, message, page } = res;
    if (success) {
      toast.success(message, { id: "success1" });
    } else {
      toast.error(message, { id: "error1" });
    }

    if (page) {
      updatePage(page);
    }
  };

  const openConfirmDialog = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const conf = {
      onConfirm: toggleLive,
      title: visibility == "Live" ? "Hide Page" : "Go Live",
      description:
        visibility == "Live"
          ? "You are about to hide this page, Would you like to proceed?"
          : "You are about to make this page public. All your page data would be live and accessible.",
      icon: visibility == "Live" ? "warning" : "success",
      confirmText: visibility == "Live" ? "Hide page" : "Go live",
      cancelText: "Cancel",
    };

    setConfirmDetails(conf);
  };

  if (togglingLive)
    return (
      <div className="flex gap-1 items-center justify-center animate-pulse">
        <Circle className="size-2 fill-green-600" />
        <Circle className="size-2 fill-green-600" />
        <Circle className="size-2 fill-green-600" />
      </div>
    );
  else
    return page.visibility == "Hidden" ? (
      <Eye
        onClick={openConfirmDialog}
        className="w-4 h-4 cursor-pointer hover:text-green-600 transition"
      />
    ) : (
      <EyeOff
        onClick={openConfirmDialog}
        className="w-4 h-4 cursor-pointer hover:text-green-600 transition"
      />
    );
};

const DeletePageButton = ({ pageId, storeId }) => {
  const { setConfirmDetails } = useGeneralStore();
  const { deletePage } = useClientPageStore();

  const [isLoading, setIsLoading] = useState(false);

  const openConfirmDialog = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const conf = {
      onConfirm: handleDelete,
      title: "Delete Page",
      description:
        "You are about to delete this page?. This process is irreversible.",
      icon: "warning",
      confirmText: "Delete",
      cancelText: "Cancel",
    };

    setConfirmDetails(conf);
    return e.stopPropagation();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const res = await delete_page(storeId, pageId);
    setIsLoading(false);

    const { success, message } = res;
    if (success == true) {
      notify({
        title: "Page Deleted",
        message: `Page with ID ${pageId} has been deleted successfully!`,
        type: "success",
        duration: 4000,
        key: "success1",
      });
      deletePage(pageId);
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
      <div className="flex items-center justify-center">
        <div className="animate-spin">
          <Loader className="size-4" />
        </div>
      </div>
    );

  return (
    <Trash2
      onClick={openConfirmDialog}
      className="w-4 h-4 cursor-pointer hover:text-red-600 transition"
    />
  );
};

export default PagesList;
