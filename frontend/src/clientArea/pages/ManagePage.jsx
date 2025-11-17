import { useState, useEffect } from "react";
import {
  LayoutGrid,
  ShoppingBag,
  Plus,
  Pencil,
  Save,
  Eye,
  Tag,
  Grid3X3,
  List,
  Rows3,
  Package,
  Filter,
  Grid,
  Layers,
  Trash2,
  Calendar,
  Link2,
  Type,
  Check,
  X,
  SquareCheckBig,
  AlertCircle,
  Loader,
  EyeOff,
  Circle,
  View,
} from "lucide-react";
import {
  sanitizePageId,
  sanitizeString,
  validateString,
} from "../../utils/stringSanitizers";
import { pageListStyles, pageTypes } from "../../utils/globarvariables";
import {
  useClientPageStore,
  useClientProductStore,
  useClientStore,
} from "../../store/useClientStore";
import toast from "react-hot-toast";
import {
  create_page,
  delete_page,
  fetch_page,
  togglePageLive,
  update_page,
} from "../../helpers/serverHelpers";
import { notify } from "../../store/useNotificationStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGeneralStore } from "../../store/useGeneralStore";
import { formatReadableDate } from "../../utils/formats";
import { FullPageLoader } from "../components/FullPageLoader";
import { PageNotFound } from "../components/PageNotFound";
import { NoActiveStore } from "../components/NoActiveStore";
import { AccessDeniedPage } from "../components/AccessDeniedPage";

const ManagePage = () => {
  const navigate = useNavigate();
  const { storeId, pageId } = useParams();

  const { activeStore } = useClientStore();
  const { existingIds, pages, getPage, updatePage } = useClientPageStore();
  const { categories, products } = useClientProductStore();

  const [canEdit, setCanEdit] = useState(activeStore?.storeId === storeId);
  const [page, setPage] = useState(getPage(pageId));

  const initialForm = (page) => ({
    pageId: page?.pageId || "",
    pageTitle: page?.pageTitle || "",
    pageType: page?.pageType || "",
    description: page?.description || "",
    listStyle: page?.listStyle || [],
    defaultListStyle: page?.defaultListStyle || "",
    categories: page?.categories || [],
    defaultCategory: page?.defaultCategory || "",
    newCategory: "",
    products: page?.products || [],
    shuffleProducts: page?.shuffleProducts || false,
    externalPages: page?.externalPages || [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(initialForm(page));

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTab, setDialogTab] = useState("select"); // select | current
  const [selectMode, setSelectMode] = useState("all"); // all | category
  const [filterCategory, setFilterCategory] = useState("All");

  const [storeCategories, setStoreCategories] = useState(categories);

  const [isLoading, setIsLoading] = useState(false);

  // Errors
  const [idError, setIdError] = useState("");
  const [titleError, setTitleError] = useState("");

  const [onChange, setOnChange] = useState(false);

  function updateField(k, v) {
    if (k === "pageId") {
      const id = sanitizePageId(v);
      setForm((s) => ({ ...s, pageId: id }));
    } else {
      const limit =
        k === "newCategory"
          ? 40
          : k === "pageTitle"
          ? 40
          : k === "description"
          ? 300
          : undefined;
      const vs = k !== "products" ? sanitizeString(v, limit) : v;
      setForm((s) => ({ ...s, [k]: vs }));
    }
    setOnChange(true);
  }

  function toggleListStyle(style) {
    if (!isEditing) return;
    setForm((s) =>
      s.listStyle.includes(style)
        ? {
            ...s,
            listStyle: s.listStyle.filter((x) => x !== style),
            defaultListStyle:
              s.defaultListStyle == style ? "" : s.defaultListStyle,
          }
        : { ...s, listStyle: [...s.listStyle, style] }
    );
    setOnChange(true);
  }

  function setDefaultStyle(e, style) {
    e.stopPropagation();
    if (!isEditing) return;
    if (!form.listStyle.includes(style)) return;
    setForm((s) => ({ ...s, defaultListStyle: style }));
    setOnChange(true);
  }

  function clearListStyle() {
    if (!isEditing) return;
    setForm((s) => ({ ...s, defaultListStyle: "", listStyle: [] }));
    setOnChange(true);
  }

  function toggleCategory(cat) {
    if (!isEditing) return;
    setForm((s) =>
      s.categories.includes(cat)
        ? {
            ...s,
            categories: s.categories.filter((c) => c !== cat),
            defaultCategory: s.defaultCategory == cat ? "" : s.defaultCategory,
          }
        : { ...s, categories: [...s.categories, cat] }
    );
    setOnChange(true);
  }

  function addCategory() {
    const v = form.newCategory?.trim();
    if (!isEditing || !v) return;
    if (!form.categories.includes(v)) {
      setForm((s) => ({
        ...s,
        categories: [...s.categories, v],
        newCategory: "",
      }));
      if (!storeCategories.includes(v)) {
        // setStoreCategories([...storeCategories, v]);
      }
    } else {
      setForm((s) => ({ ...s, newCategory: "" }));
    }
    setOnChange(true);
  }

  function setDefaultCategory(cat) {
    if (!isEditing) return;
    if (!form.categories.includes(cat)) return;
    setForm((s) => ({ ...s, defaultCategory: cat }));
    setOnChange(true);
  }

  function toggleProductSelection(id) {
    if (!isEditing) return;
    setForm((s) =>
      s.products.includes(id)
        ? { ...s, products: s.products.filter((x) => x !== id) }
        : { ...s, products: [...s.products, id] }
    );
    setOnChange(true);
  }

  const availableProducts =
    selectMode === "all"
      ? products
      : products.filter((p) =>
          filterCategory === "All"
            ? true
            : p.category.toLowerCase() === filterCategory.toLowerCase()
        );

  function selectAll(select) {
    if (!isEditing) return;
    if (!availableProducts.length) return;

    for (let index = 0; index < availableProducts.length; index++) {
      const element = availableProducts[index];

      setForm((s) =>
        !select
          ? { ...s, products: [] }
          : s.products.includes(element._id)
          ? { ...s, products: [...s.products] }
          : { ...s, products: [...s.products, element._id] }
      );
    }
  }

  const clearErrors = () => {
    setIdError("");
    setTitleError("");
  };

  const checkErrors = () => {
    if (!form.pageId.trim()) {
      setIdError("Page ID cannot be empty");
      return { error: "Page ID empty", success: false };
    }

    if (form.pageId.trim().length < 3) {
      setIdError("Page ID too short");
      return { error: "Page ID too short", success: false };
    }

    if (!validateString(form.pageId.trim())) {
      setIdError("Invalid page ID");
      return { error: "Invalid page ID", success: false };
    }

    if (
      existingIds.includes(form.pageId.trim()) &&
      page?.pageId !== form.pageId.trim()
    ) {
      setIdError("This page ID is not available");
      return { error: "Page ID not available", success: false };
    }

    // title
    if (!form.pageTitle.trim()) {
      setTitleError("Title cannot be empty");
      return { error: "Title is empty", success: false };
    }

    if (form.pageTitle.trim().length < 3) {
      setTitleError("Page title too short");
      return { error: "Title too short", success: false };
    }

    if (!form.pageType) {
      return { error: "Select a page type", success: false };
    }

    if (!form.listStyle.length) {
      return { error: "Select at least one list style", success: false };
    }

    if (!form.defaultListStyle) {
      return { error: "Select a default list style", success: false };
    }

    return { success: true };
  };

  async function savePage() {
    const res = await handleSubmit();
    if (!res) return;
    setIsEditing(false);
    if (pageId == "new")
      navigate(`/client/s/${storeId || ""}/p/${form.pageId}`);
  }

  const handleSubmit = async () => {
    // form.defaultCategory || "All"
    const { success, error } = checkErrors();
    if (!success) {
      toast.error(error, { id: "error1" });
      return false;
    }

    const formDataToSend = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    const isCreate = !page?.pageId;
    setIsLoading(true);
    const res = await onSave(storeId, formDataToSend, form, isCreate);
    setIsLoading(false);

    return res;
  };

  // create/update store
  const onSave = async (storeId, dataToSend, rawData, isCreate) => {
    let cat;
    setIsLoading(true);
    if (isCreate) {
      cat = await create_page(storeId, { pageDetails: rawData });
    } else {
      cat = await update_page(storeId, { pageDetails: rawData });
    }
    setIsLoading(false);

    if (!cat.success) toast.error(cat.message || "Error", { id: "error1" });
    else {
      notify({
        title: `Page ${isCreate ? "Created" : "Updated"}`,
        message: `Your page with page ID ${rawData?.pageId || ""} has been ${
          isCreate ? "created" : "updated"
        } successfully`,
        type: "success",
        duration: 3000,
      });
      updatePage(cat.page);
    }
    return cat.success;
  };

  const assignInitialVars = (page) => {
    clearErrors();
    setForm(initialForm(page));
  };

  const cancelEdit = () => {
    assignInitialVars(page);
    setIsEditing(false);
  };

  useEffect(() => {
    setCanEdit(activeStore?.storeId === storeId);
    const canEd = activeStore?.storeId === storeId;

    const startEdit = canEd && (!pageId || pageId == "new");
    setIsEditing(startEdit);

    const assignPage = async () => {
      setIsLoading(true);
      const pg = canEd ? getPage(pageId) : await fetch_page(storeId, pageId);
      setIsLoading(false);
      setPage(pg);
      assignInitialVars(pg);
    };

    assignPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId, storeId, activeStore, pages]);

  useEffect(() => {
    setStoreCategories(categories);
  }, [categories, products]);

  if (!activeStore?.storeId) return <NoActiveStore />;

  if (!page && pageId !== "new" && !isLoading)
    return <PageNotFound storeId={storeId} owner={canEdit} />;

  if (!canEdit && pageId == "new")
    return <AccessDeniedPage storeId={storeId} owner={canEdit} />;

  const mergedCategories = [
    ...storeCategories,
    ...(page?.categories.filter(
      (cat) => !storeCategories.some((c) => c === cat)
    ) || []),
    ...(form?.categories.filter(
      (cat) =>
        !storeCategories.some((c) => c === cat) &&
        !page?.categories.some((c) => c === cat || [])
    ) || []),
  ];

  const mergedCategories2 = [...(page?.categories || [])];

  const cats = isEditing ? mergedCategories : mergedCategories2;

  return (
    <div className="w-full py-4">
      <div className="mx-auto space-y-6 text-black/80 w-full">
        {/* Title bar */}
        <TitleBar
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          cancelEdit={cancelEdit}
          storeId={storeId}
          page={page}
          canEdit={canEdit}
          pageId={pageId}
        />

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-6 w-full grid-cols-1">
          {/* Basic card: ID and URL */}
          <PageInfo
            isEditing={isEditing}
            form={form}
            updateField={updateField}
            storeId={storeId}
            page={page}
            idError={idError}
            setIdError={setIdError}
            titleError={titleError}
            setTitleError={setTitleError}
            pageId={pageId}
            onChange={onChange}
          />

          {/* Page Type and List Styles */}
          <PageSetting
            isEditing={isEditing}
            updateField={updateField}
            form={form}
            setDefaultStyle={setDefaultStyle}
            toggleListStyle={toggleListStyle}
            clearListStyle={clearListStyle}
          />

          {/* Categories card */}
          <CategoriesCard
            isEditing={isEditing}
            addCategory={addCategory}
            toggleCategory={toggleCategory}
            form={form}
            updateField={updateField}
            storeCategories={cats}
            setDefaultCategory={setDefaultCategory}
          />

          {/* Products preview card */}
          <ProductsCard
            isEditing={isEditing}
            form={form}
            updateField={updateField}
            setDialogOpen={setDialogOpen}
            setDialogTab={setDialogTab}
            products={canEdit ? products : page?.products}
            canEdit={canEdit}
          />
        </div>

        {/* Footer actions */}
        <FooterArea
          isEditing={isEditing}
          page={page}
          savePage={savePage}
          assignInitialVars={assignInitialVars}
          setIsEditing={setIsEditing}
          cancelEdit={cancelEdit}
          storeId={storeId}
          canEdit={canEdit}
        />
      </div>

      {/* Product Dialog */}
      {dialogOpen && (
        <ManageProductDialog
          selectAll={selectAll}
          isEditing={isEditing}
          availableProducts={availableProducts}
          form={form}
          updateField={updateField}
          toggleProductSelection={toggleProductSelection}
          setDialogOpen={setDialogOpen}
          setDialogTab={setDialogTab}
          dialogTab={dialogTab}
          setSelectMode={setSelectMode}
          selectMode={selectMode}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categoriesList={categories}
          products={canEdit ? products : page?.products}
          canEdit={canEdit}
        />
      )}

      {isLoading && <FullPageLoader text="Please wait..." />}
    </div>
  );
};

const TitleBar = ({
  isEditing,
  setIsEditing,
  cancelEdit,
  storeId,
  page,
  canEdit,
  pageId,
}) => {
  return (
    <div className="flex flex-col sm:flex-row md:flex-co lg:flex-row md:items-start lg:items-center sm:items-center justify-between gap-4">
      <div className="w-full">
        <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-800">
          <LayoutGrid className="w-6 h-6 text-blue-600" />
          Webpage {isEditing ? "Editor" : "Viewer"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {isEditing ? "Edit" : "View"} how this page will be generated on your
          site.
        </p>
      </div>

      <div className="w-full flex flex-col items-end">
        <div className="flex items-center gap-3 justify-end w-full">
          {canEdit && (
            <button
              onClick={() => {
                if (isEditing) cancelEdit();
                else setIsEditing(true);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                isEditing
                  ? "bg-slate-100 border-slate-300"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              {isEditing ? (
                <>
                  <Eye className="w-4 h-4" /> View
                </>
              ) : (
                <>
                  <Pencil className="w-4 h-4" /> Edit
                </>
              )}
            </button>
          )}

          {pageId != "new" && (
            <Link
              to={`/${storeId}/${page?.pageId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 xs:gap-2 xs:px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
            >
              <Eye className="size-5" />
              Preview page
            </Link>
          )}
        </div>
        {page?.pageId && (
          <Visibility storeId={storeId} page={page} canEdit={canEdit} />
        )}
      </div>
    </div>
  );
};

const PageInfo = ({
  isEditing,
  form,
  updateField,
  storeId,
  existingIds = [],
  page,
  idError,
  setIdError,
  titleError,
  setTitleError,
  pageId,
  onChange,
}) => {
  const [pageUrl, setPageUrl] = useState(`/${storeId || ""}/${form.pageId}`);

  // Id error
  useEffect(() => {
    if (!onChange) {
      return setIdError("");
    }

    if (!form.pageId.trim()) {
      return setIdError("Page ID cannot be empty");
    }

    if (form.pageId.trim().length < 3) {
      return setIdError("Page ID too short");
    }

    if (!validateString(form.pageId.trim())) {
      return setIdError("Invalid product ID");
    }

    if (
      existingIds.includes(form.pageId.trim()) &&
      page?.pageId !== form.pageId.trim()
    ) {
      setIdError("This page ID is not available");
    } else setIdError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingIds, form.pageId, page?.pageId]);

  // title error
  useEffect(() => {
    if (!form.pageTitle.trim()) {
      return setTitleError("Title cannot be empty");
    }

    if (form.pageTitle.trim().length < 3) {
      setTitleError("Page title too short");
    } else setTitleError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.pageTitle]);

  useEffect(() => {
    setPageUrl(`/${storeId || ""}/${form.pageId}`);
  }, [form.pageId, storeId]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border shadow-sm">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* pageId */}
        <div>
          <label className="text-xs text-slate-500 flex items-center gap-2">
            <Link2 className="w-4 h-4" /> Page ID
          </label>
          <input
            readOnly={!isEditing || pageId != "new"}
            value={form.pageId}
            onChange={(e) => updateField("pageId", e.target.value)}
            className={`mt-2 w-full px-3 py-2 rounded-md border ${
              isEditing ? "bg-white" : "bg-slate-100"
            }`}
          />
          {idError && (
            <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" /> {idError}
            </div>
          )}
        </div>

        {/* url */}
        <div>
          <label className="text-xs text-slate-500 flex items-center gap-2">
            <Link2 className="w-4 h-4" /> Page URL
          </label>
          <input
            readOnly={true}
            value={pageUrl}
            // onChange={(e) => updateField("pageUrl", e.target.value)}
            className={`mt-2 w-full px-3 py-2 rounded-md border ${
              isEditing ? "bg-white text-blue-600" : "bg-slate-100"
            }`}
          />
        </div>
      </div>

      {/* page title */}
      <div className="mt-4">
        <label className="text-xs text-slate-500 flex items-center gap-2">
          <Type className="w-4 h-4" /> Page Title
        </label>
        <input
          readOnly={!isEditing}
          value={form.pageTitle}
          onChange={(e) => updateField("pageTitle", e.target.value)}
          className={`mt-2 w-full px-3 py-2 rounded-md border ${
            isEditing ? "bg-white" : "bg-slate-100"
          }`}
        />
        {titleError && (
          <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" /> {titleError}
          </div>
        )}
      </div>

      {/* page description */}
      <div className="mt-4">
        <label className="text-xs text-slate-500 flex items-center gap-2">
          <Package className="w-4 h-4" /> Description
        </label>
        <textarea
          readOnly={!isEditing}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          className={`mt-2 w-full px-3 py-2 rounded-md border resize-none ${
            isEditing ? "bg-white" : "bg-slate-100"
          }`}
        />
      </div>
    </div>
  );
};

const CategoriesCard = ({
  isEditing,
  addCategory,
  toggleCategory,
  form,
  updateField,
  storeCategories,
  setDefaultCategory,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 max-h-fit rounded-xl p-4 border shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-slate-800">Categories</h3>
        </div>
        <div className="text-xs text-slate-500">Choose or add</div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {storeCategories.map((c, i) => (
          <button
            key={i}
            onClick={() => toggleCategory(c)}
            disabled={!isEditing}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              form?.categories?.includes(c)
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : "bg-white text-slate-600 border-gray-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {isEditing && (
        <div className="mt-3 flex gap-2">
          <input
            readOnly={!isEditing}
            value={form.newCategory}
            onChange={(e) => updateField("newCategory", e.target.value)}
            placeholder="Add custom category..."
            className={`flex w-full px-3 py-2 rounded-md border ${
              isEditing ? "bg-white" : "bg-slate-100"
            }`}
          />
          <button
            onClick={addCategory}
            disabled={!isEditing}
            className={`px-3 py-2 rounded-md ${
              isEditing
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="mt-5">
        {(form?.categories?.length && (
          <div className="xs:ml-auto flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <div>Default</div>
            {(isEditing && (
              <select
                value={form.defaultCategory}
                disabled={!isEditing}
                onChange={(e) => setDefaultCategory(e.target.value)}
                className="px-2 py-1 border rounded-md"
              >
                <option value="All" hidden>
                  All
                </option>
                {form.categories.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            )) || (
              <div className="font-semibold flex items-center gap-2 ml-1">
                <div>-</div>
                {form.defaultCategory || "All"}
              </div>
            )}
          </div>
        )) ||
          ""}
      </div>
    </div>
  );
};

const PageSetting = ({
  isEditing,
  updateField,
  form,
  setDefaultStyle,
  toggleListStyle,
  clearListStyle,
}) => {
  const [listStyles, setListStyles] = useState([]);

  useEffect(() => {
    const getListStyle = (pageType) => {
      if (!form.pageType) {
        return setListStyles([]);
      }
      const page = pageTypes().find((p) => p.id == pageType);
      if (!page) {
        return setListStyles([]);
      }

      let lists = [];
      for (let index = 0; index < page.lists.length; index++) {
        const element = page.lists[index];
        const list_s = pageListStyles.find(
          (p) => p.id.toLowerCase() == element.toLowerCase()
        );
        if (list_s) {
          lists = [...lists, list_s];
        }
      }

      clearListStyle();
      setListStyles(lists);
    };

    getListStyle(form.pageType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.pageType]);

  return (
    <div className="bg-white w-full dark:bg-slate-800 rounded-xl p-4 border shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Grid3X3 className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-slate-800">Page Type</h3>
        </div>
        <div className="text-xs text-slate-500">Visual selector</div>
      </div>

      {/* page type */}
      <div className="mt-3 flex gap-2 flex-wrap">
        {pageTypes().map((pt) => (
          <button
            key={pt.id}
            disabled={!isEditing}
            onClick={() => isEditing && updateField("pageType", pt.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${
              form.pageType === pt.id
                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                : "bg-white text-slate-700 border-gray-200"
            }`}
          >
            {pt.icon}
            {pt.id}
          </button>
        ))}
      </div>

      {/* List style visuals */}
      <div className="mt-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-600" />
            <div className="text-sm font-medium text-slate-700">
              List Styles
            </div>
          </div>
          <div className="text-xs text-slate-500">pick multiple</div>
        </div>

        <div className="mt-3 w-full flex overflow-x-auto gap-3 pb-2">
          {listStyles.map((s) => {
            const active = form.listStyle.includes(s.id);
            return (
              <div
                key={s.id}
                onClick={() => toggleListStyle(s.id)}
                className={`p-3 min-w-[130px] rounded-lg border cursor-pointer select-none transition flex flex-col items-start gap-2 ${
                  active
                    ? "bg-blue-50 border-blue-200"
                    : "bg-white border-gray-200"
                } ${!isEditing ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded bg-white/30">{s.preview}</div>
                  <div className="font-medium text-sm">{s.label}</div>
                </div>
                <div className="text-xs text-slate-500">
                  {s.id === "grid" && "Compact card grid preview"}
                  {s.id === "list" && "Dense vertical list preview"}
                  {s.id === "menu" && "Menu / grouped categories view"}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={(e) => setDefaultStyle(e, s.id)}
                    disabled={!isEditing || !active}
                    className={`text-xs px-2 py-1 rounded-full border ${
                      form.defaultListStyle === s.id
                        ? "bg-slate-700 text-white"
                        : "bg-white text-slate-600"
                    } ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {form.defaultListStyle === s.id ? (
                      <>
                        <Check className="w-3 h-3 inline" /> Default
                      </>
                    ) : (
                      "Make default"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ProductsCard = ({
  isEditing,
  form,
  updateField,
  setDialogOpen,
  setDialogTab,
  products,
  canEdit,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-pink-600" />
          <h3 className="font-semibold text-slate-800">Products</h3>
        </div>
        <div className="text-xs text-slate-500">quick overview</div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 max-h-[180px] overflow-y-auto">
        {form.products?.length ? (
          form.products.map((pid, i) => {
            const p = products.find((x) =>
              canEdit ? x._id === pid : x._id === pid._id
            );
            if (!p) return null;
            return (
              <div
                key={i}
                className="px-3 gap-2 py-2 border rounded-md bg-slate-50 flex items-center justify-between"
              >
                <div className="flex max-w-[220px] items-center gap-2 text-slate-700 w-full">
                  <Package className="w-4 h-4 text-slate-500" />
                  <span className="text-sm truncate">{p.name}</span>
                </div>
                {isEditing && (
                  <button
                    onClick={() =>
                      updateField(
                        "products",
                        form.products.filter((x) => x !== pid)
                      )
                    }
                    className="text-red-500 w-4"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-sm text-slate-400 italic">
            No products assigned to this page.
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            setDialogOpen(true);
            if (isEditing) setDialogTab("select");
            if (!canEdit) setDialogTab("current");
          }}
          className="flex items-center gap-1 px-2 xs:gap-2 xs:px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
        >
          {(isEditing && (
            <>
              <Plus className="w-4 h-4" /> Manage Products
            </>
          )) || (
            <>
              <ShoppingBag className="w-4 h-4" /> View Products
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const FooterArea = ({
  isEditing,
  page,
  savePage,
  cancelEdit,
  storeId,
  canEdit,
}) => {
  return (
    <div className="flex flex-col gap-2 xs:flex-row items-center justify-between mt-6">
      {page?.createdAt && (
        <div className="text-sm order-1 xs:order-0 text-slate-500 flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Created:{" "}
          {formatReadableDate(page?.createdAt || "")}
        </div>
      )}

      {(isEditing && canEdit && (
        <div className="flex items-center gap-3 ml-auto">
          {isEditing && (
            <button
              onClick={savePage}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Save changes
            </button>
          )}

          {isEditing && (
            <button
              onClick={() => {
                // reset to initial on cancel during edit
                if (isEditing) {
                  cancelEdit();
                }
              }}
              className="px-3 py-2 rounded-md border"
            >
              Cancel
            </button>
          )}
        </div>
      )) ||
        (page && canEdit ? (
          <DeletePageButton pageId={page?.pageId} storeId={storeId} />
        ) : null)}
    </div>
  );
};

// togglePageLive
const Visibility = ({ storeId, page, canEdit }) => {
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

    if (!canEdit) return;
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
      <div className="mt-2 flex gap-1 items-center justify-center animate-pulse">
        <Circle className="size-2 fill-green-600 stroke-green-600" />
        <Circle className="size-2 fill-green-600 stroke-green-600" />
        <Circle className="size-2 fill-green-600 stroke-green-600" />
      </div>
    );
  else
    return (
      <div
        className="mt-2 flex items-center group justify-end gap-2"
        onClick={openConfirmDialog}
      >
        {page.visibility == "Hidden" ? (
          <Eye
            onClick={openConfirmDialog}
            className="w-4 h-4 cursor-pointer group-hover:text-green-600 transition"
          />
        ) : (
          <EyeOff
            onClick={openConfirmDialog}
            className="w-4 h-4 cursor-pointer group-hover:text-green-600 transition"
          />
        )}

        <div className="cursor-pointer transition hover:underline">
          {page.visibility == "Hidden"
            ? `This page is hidden${canEdit ? ", make it live" : ""}`
            : `This page is live${canEdit ? ", click to hide" : ""}`}
        </div>
      </div>
    );
};

const DeletePageButton = ({ pageId, storeId }) => {
  const navigate = useNavigate();
  const { setConfirmDetails } = useGeneralStore();
  const { deletePage } = useClientPageStore();

  const [isLoading, setIsLoading] = useState(false);

  const openConfirmDialog = () => {
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
      navigate(`/client/s/${storeId || ""}/p`);
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
      <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-md border">
        <div className="animate-spin">
          <Loader className="size-4" />
        </div>
        Deleting...
      </div>
    );

  return (
    <div
      onClick={openConfirmDialog}
      className="flex items-center text-red-800 gap-1 pl-5 px-3 py-2 rounded-md border"
    >
      <Trash2 className="w-4 h-4 hover:text-red-800 cursor-pointer" />
      Delete Page
    </div>
  );
};

//!
const ManageProductDialog = ({
  selectAll,
  isEditing,
  availableProducts,
  form,
  updateField,
  toggleProductSelection,
  setDialogOpen,
  setDialogTab,
  dialogTab,
  setSelectMode,
  selectMode,
  filterCategory,
  setFilterCategory,
  categoriesList,
  products,
  canEdit,
}) => {
  const [allSelected, setAllSelected] = useState(false);

  const select_all = () => {
    selectAll(!allSelected);
    setAllSelected(!allSelected);
  };

  useEffect(() => {
    setAllSelected(false);
  }, [filterCategory, selectMode]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setDialogOpen(false)}
      />

      <div className="relative max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
        {/* title bar */}
        <div className="p-4 pb-2 border-b">
          <div className="flex flex-col sm:flex-row gap-y-2 items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Manage Products</h3>
            </div>

            {/* tab selector */}
            <div className="flex gap-0 xs:gap-2 border rounded-lg p-1">
              <button
                onClick={() => {
                  if (canEdit) setDialogTab("select");
                }}
                className={`px-3 py-1 text-sm rounded ${
                  dialogTab === "select"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600"
                }`}
              >
                Select Products
              </button>
              <button
                onClick={() => {
                  setDialogTab("current");
                }}
                className={`px-3 py-1 text-sm rounded ${
                  dialogTab === "current"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600"
                }`}
              >
                Current Products
              </button>
            </div>
          </div>

          {dialogTab === "select" && (
            <div className="flex flex-col xs:flex-row items-center gap-3 mt-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectMode("all")}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    selectMode === "all"
                      ? "bg-blue-600 text-white"
                      : "text-slate-600"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectMode("category")}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    selectMode === "category"
                      ? "bg-blue-600 text-white"
                      : "text-slate-600"
                  }`}
                >
                  By Category
                </button>
              </div>

              {selectMode === "category" && (
                <div className="xs:ml-auto flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-2 py-1 border rounded-md"
                  >
                    {categoriesList.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {dialogTab === "select" && isEditing && (
            <div
              onClick={select_all}
              className="cursor-pointer flex items-center w-full text-sm gap-1 mt-3"
            >
              <SquareCheckBig className="size-4.5" />
              {allSelected ? "Unselect all" : "Select all"}
            </div>
          )}
        </div>

        {/* main list */}
        <div className="py-4 px-2 sm:px-4 max-h-[50vh] min-h-[40vh] overflow-y-auto">
          {dialogTab === "select" && (
            <div>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3">
                {availableProducts.map((p, i) => {
                  const selected = form.products.includes(p._id);
                  if (selectMode === "category" && filterCategory !== "All") {
                    if (p.category !== filterCategory) return null;
                  }
                  return (
                    <div
                      key={i}
                      onClick={() => toggleProductSelection(p._id)}
                      className={`p-3 rounded-lg border cursor-pointer transition ${
                        selected
                          ? "bg-blue-50 border-blue-300"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3 w-full">
                          <Package className="w-5 h-5 text-slate-600" />
                          <div className="w-full">
                            <div className="font-medium  text-slate-800">
                              {p.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {p.category}
                            </div>
                          </div>
                        </div>
                        {selected && (
                          <div className="text-blue-600">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {dialogTab === "current" && (
            <div className="space-y-3 grid grid-cols-1 gap-x-3 sm:grid-cols-2">
              {form.products.length ? (
                form.products.map((pid, i) => {
                  const p = products.find((x) =>
                    canEdit ? x._id === pid : x._id === pid._id
                  );
                  if (!p) return null;
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between border rounded-lg px-2 sm:px-3 py-2 w-full"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Package className="w-5 h-5 text-slate-600" />
                        <div className="w-full">
                          <div className="font-medium text-slate-800">
                            {p.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {p.category}
                          </div>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateField(
                                "products",
                                form.products.filter((x) => x !== pid)
                              )
                            }
                            className="text-red-500 pl-2 py-1 rounded hover:bg-red-50"
                          >
                            <X className="size-6" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-slate-400 italic">
                  No products assigned yet.
                </div>
              )}
            </div>
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t">
          <button
            onClick={() => setDialogOpen(false)}
            className="px-4 py-2 rounded-md border"
          >
            Close
          </button>
          <button
            onClick={() => setDialogOpen(false)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagePage;
