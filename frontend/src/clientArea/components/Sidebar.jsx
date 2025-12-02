// import { Book, LayoutDashboard, Plus, Store, StoreIcon } from "lucide-react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { LogoTileLarge } from "../../components/LogoTile";
// import {
//   useClientPageStore,
//   useClientProductStore,
//   useClientStore,
// } from "../../store/useClientStore";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useGeneralStore } from "../../store/useGeneralStore";

// const Sidebar = ({ setIsSidebarOpen, isSidebarOpen, showSidebar }) => {
//   const { activeStore, stores, getMyStores } = useClientStore();
//   const { fetchProducts, categories } = useClientProductStore();
//   const { fetchPages, pages } = useClientPageStore();

//   const [sideItems, setSideItems] = useState([
//     {
//       link: "/client/dashboard",
//       icon: <LayoutDashboard className="size-5" />,
//       title: "Dashboard",
//     },
//     {
//       link: "/client/store",
//       icon: <Store className="size-5" />,
//       title: "Store",
//     },
//     {
//       title: "Active",
//     },
//     {
//       title: "Pages",
//     },
//     {
//       title: "Products",
//     },
//   ]);

//   const closeSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // update stores
//   useEffect(() => {
//     const item = {
//       link: "/client/store",
//       icon: <Store className="size-5" />,
//       title: "Store",
//       sub: stores.map((store, i) => ({
//         link: `/client/store/${store.storeId}`,
//         title: store.storeName,
//         id: i,
//       })),
//     };

//     const updatedList = sideItems.map((store) =>
//       store?.title === "Store"
//         ? { ...item } // modify the object here
//         : store
//     );
//     setSideItems(updatedList);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [stores, showSidebar]);

//   // update pages
//   useEffect(() => {
//     const item = activeStore?.storeId
//       ? {
//           link: `/client/s/${activeStore?.storeId}/p`,
//           newLink: `/client/s/${activeStore?.storeId}/p/new`,
//           icon: <Book className="size-5" />,
//           title: "Pages",
//           sub: pages.map((page, i) => ({
//             link: `/client/s/${activeStore?.storeId}/p/${page.pageId}`,
//             title: page.pageTitle,
//             id: i,
//           })),
//         }
//       : {
//           title: "Pages",
//         };

//     const updatedList = sideItems.map((sideItem) =>
//       sideItem?.title === "Pages"
//         ? { ...item } // modify the object here
//         : sideItem
//     );

//     setSideItems(updatedList);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pages, activeStore, showSidebar]);

//   // update products categories
//   useEffect(() => {
//     const updateProductSideItems = (categories) => {
//       const new_item = {
//         link: "/client/products",
//         icon: <Store className="size-5" />,
//         title: "Products",
//         sub: categories.map((category, i) => ({
//           link: `/client/products/${category
//             .toLowerCase()
//             .replaceAll(" ", "_")}`,
//           title: category,
//           id: i,
//         })),
//       };

//       const updatedList = sideItems.map((item) =>
//         item?.title === "Products"
//           ? { ...new_item } // modify the object here
//           : item
//       );

//       setSideItems(updatedList);
//     };

//     if (activeStore?.storeId) updateProductSideItems(categories);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeStore, categories, showSidebar]);

//   // update active store & fetch store data
//   useEffect(() => {
//     const updatedList = sideItems.map((store) =>
//       store?.title === "Active"
//         ? { ...store, store: activeStore?.storeName || "" } // modify the object here
//         : store
//     );

//     fetchProducts(activeStore);
//     fetchPages(activeStore);
//     setSideItems(updatedList);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeStore, showSidebar]);

//   // get stores
//   useEffect(() => {
//     getMyStores();
//   }, [getMyStores]);

//   return (
//     <div
//       className={`${
//         !showSidebar ? "hidden" : "flex"
//       } flex-col h-full w-[250px] md:w-[210px] lg:w-[250px] pt-4 pl-2 md:pl-3 lg:pl-4`}
//     >
//       <div onClick={closeSidebar} className="mb-6">
//         <LogoTileLarge />
//       </div>

//       <nav className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
//         {sideItems.map((item, i) => (
//           <div key={i}>
//             <ItemTile closeSidebar={closeSidebar} item={item} />
//             {(item?.sub && item?.sub?.length && (
//               <div className="mt-2 space-y-1">
//                 {item.sub.map((sub, j) => (
//                   <ItemTile
//                     closeSidebar={closeSidebar}
//                     key={j}
//                     item={sub}
//                     isSub
//                   />
//                 ))}
//               </div>
//             )) ||
//               ""}
//           </div>
//         ))}
//       </nav>

//       <div className="text-xs text-black/70 mt-3 mb-2 text-center">
//         © 2025 DzVista
//       </div>
//     </div>
//   );
// };

// const ItemTile = ({ item, isSub = false, closeSidebar }) => {
//   const navigate = useNavigate();
//   const { changeStore, activeStore } = useClientStore();
//   const { setConfirmDetails } = useGeneralStore();
//   const { pathname } = useLocation();

//   if (!item) return;

//   if (item.title == "Active" && item.store)
//     return (
//       <div className="border-y mt-3 py-2 items-center flex gap-2 w-full text-sm">
//         <Store className="size-4" />
//         <span className="truncate w-full">{item.store}</span>
//       </div>
//     );

//   if (!item.link) return;

//   const isActive = pathname.startsWith(item.link);
//   const isSubActive = pathname === item.link && isSub;

//   const checkIfActive = (link) => {
//     if (!isSub) return;
//     if (!item?.link?.includes("client/store")) return;

//     const openConfirmDialog = (storeId) => {
//       const conf = {
//         onConfirm: handleChange,
//         title: "Change Store",
//         description: `You are about to change your active store to store with ID ${storeId}`,
//         icon: "warning",
//         confirmText: "Change store",
//         cancelText: "Just view",
//       };

//       setConfirmDetails(conf);
//     };

//     const handleChange = () => {
//       changeStore(storeId);
//     };

//     const storeId = link.split("/").pop();
//     if (!activeStore?.storeId) {
//       changeStore(storeId);
//     } else if (activeStore?.storeId !== storeId) {
//       openConfirmDialog(storeId);
//     }
//   };

//   const goToLink = (e) => {
//     e.stopPropagation();
//     navigate(item.newLink);
//     closeSidebar();
//   };

//   if (!item.newLink)
//     return (
//       <Link
//         to={item.link}
//         onClick={() => {
//           closeSidebar();
//           checkIfActive(item.link);
//         }}
//         className={`${
//           isActive && !isSub
//             ? "bg-white/70 shadow-md text-black/80"
//             : !isSub
//             ? "hover:bg-white/70 hover:shadow-md hover:text-black/80 text-gray-800/90"
//             : ""
//         } ${
//           isSubActive
//             ? "underline text-green-950 font-semibold"
//             : "hover:text-green-950 hover:font-semibold"
//         }  transition duration-300  ${
//           isSub ? "text-gray-800/90 px-2 py-1 pl-10" : "font-semibold px-2 py-2"
//         } text-[16px] rounded-lg  cursor-pointer flex items-center gap-2`}
//       >
//         {!isSub && item.icon}
//         <div>{item.title}</div>
//       </Link>
//     );
//   else
//     return (
//       <NewLinkTile
//         item={item}
//         closeSidebar={closeSidebar}
//         checkIfActive={checkIfActive}
//         isActive={isActive}
//         isSub={isSub}
//         isSubActive={isSubActive}
//         goToLink={goToLink}
//       />
//     );
// };

// const NewLinkTile = ({
//   item,
//   closeSidebar,
//   checkIfActive,
//   isActive,
//   isSub,
//   isSubActive,
//   goToLink,
// }) => {
//   return (
//     <div
//       onClick={() => {
//         closeSidebar();
//         checkIfActive(item.link);
//       }}
//       className={`${
//         isActive && !isSub
//           ? "bg-white/70 shadow-md text-black/80"
//           : !isSub
//           ? "hover:bg-white/70 hover:shadow-md hover:text-black/80 text-gray-800/90"
//           : ""
//       } ${
//         isSubActive
//           ? "underline text-green-950 font-semibold"
//           : "hover:text-green-950 hover:font-semibold"
//       }  transition duration-300  ${
//         isSub ? "text-gray-800/90 px-2 py-1 pl-10" : "font-semibold"
//       } text-[16px] rounded-lg  cursor-pointer flex items-center gap-2 px-2`}
//     >
//       <Link to={item.link} className="flex items-center gap-2  py-2 w-full">
//         {!isSub && item.icon}
//         <div>{item.title}</div>
//       </Link>

//       {item.newLink && (
//         <div onClick={goToLink} className="ml-auto pr-1">
//           <Plus className="size-6" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;


// Sidebar.jsx
import { Book, LayoutDashboard, Plus, Store } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoTileLarge } from "../../components/LogoTile";
import {
  useClientPageStore,
  useClientProductStore,
  useClientStore,
} from "../../store/useClientStore";
import { useEffect, useMemo, useCallback } from "react";
import { useGeneralStore } from "../../store/useGeneralStore";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Apple-like, modern Sidebar
 * - sideItems are derived via useMemo (no conflicting setState updates)
 * - animations via framer-motion
 * - keeps your API hooks unchanged
 */

const Sidebar = ({ setIsSidebarOpen, isSidebarOpen, showSidebar }) => {
  const { activeStore, stores, getMyStores, changeStore } = useClientStore();
  const { fetchProducts, categories } = useClientProductStore();
  const { fetchPages, pages } = useClientPageStore();
  const { pathname } = useLocation();

  // fetch stores on mount
  useEffect(() => {
    getMyStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch products & pages when activeStore changes (keeps original behavior)
  useEffect(() => {
    if (activeStore) {
      fetchProducts(activeStore);
      fetchPages(activeStore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStore]);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [setIsSidebarOpen, isSidebarOpen]);

  // derive sidebar items from the latest stores/pages/categories/activeStore
  const sideItems = useMemo(() => {
    const base = [
      {
        link: "/client/dashboard",
        icon: <LayoutDashboard className="size-5" />,
        title: "Dashboard",
      },
      {
        // Store parent with dynamic subs
        link: "/client/store",
        icon: <Store className="size-5" />,
        title: "Store",
        sub:
          Array.isArray(stores) && stores.length
            ? stores.map((store) => ({
                link: `/client/store/${store.storeId}`,
                title: store.storeName,
                id: store.storeId,
              }))
            : [],
      },
      {
        title: "Active",
        // storeName filled below via activeStore
      },
      {
        // pages (depends on activeStore)
        link: activeStore?.storeId ? `/client/s/${activeStore.storeId}/p` : null,
        newLink: activeStore?.storeId ? `/client/s/${activeStore.storeId}/p/new` : null,
        icon: <Book className="size-5" />,
        title: "Pages",
        sub:
          activeStore?.storeId && Array.isArray(pages) && pages.length
            ? pages.map((page) => ({
                link: `/client/s/${activeStore.storeId}/p/${page.pageId}`,
                title: page.pageTitle,
                id: page.pageId,
              }))
            : [],
      },
      {
        // products (categories -> subs)
        link: "/client/products",
        icon: <Store className="size-5" />,
        title: "Products",
        sub:
          activeStore?.storeId && Array.isArray(categories) && categories.length
            ? categories.map((category) => ({
                // mimic original transform
                link: `/client/products/${category
                  .toLowerCase()
                  .replaceAll(" ", "_")}`,
                title: category,
                id: category,
              }))
            : [],
      },
    ];

    // inject active store name into the "Active" item
    return base.map((it) =>
      it.title === "Active" ? { ...it, store: activeStore?.storeName || "" } : it
    );
  }, [stores, pages, categories, activeStore]);

  return (
    <AnimatePresence>
      {showSidebar && (
        <motion.aside
          key="sidebar"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className={`flex flex-col h-full w-[250px] md:w-[210px] lg:w-[250px] pt-4 pl-3 pr-2`}
          aria-hidden={!showSidebar}
        >
          {/* Logo */}
          <div
            onClick={closeSidebar}
            className="mb-6 cursor-pointer select-none"
            aria-label="Close sidebar"
          >
            <LogoTileLarge />
          </div>

          {/* Card-like container */}
          <div className="flex flex-col flex-1 px-1">
            <nav className="flex-1 overflow-y-auto custom-scrollbar">
              <ul className="space-y-2">
                {sideItems.map((item, i) => (
                  <li key={i} className="group">
                    <ItemTile item={item} closeSidebar={closeSidebar} />
                    {item?.sub && item.sub.length > 0 && (
                      <motion.ul
                        initial="collapsed"
                        animate="open"
                        variants={{
                          open: { opacity: 1, height: "auto", transition: { staggerChildren: 0.03 } },
                          collapsed: { opacity: 0, height: 0, transition: { when: "afterChildren" } },
                        }}
                        className="mt-2 space-y-1 pl-2"
                      >
                        {item.sub.map((sub) => (
                          <motion.li
                            key={sub.id ?? sub.link}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -4 }}
                          >
                            <ItemTile closeSidebar={closeSidebar} item={sub} isSub />
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-4 text-center">
              <div className="text-xs text-black/70">© 2025 DzVista</div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

/* ------------------------------
   ItemTile (kept behavior, cleaned)
   - supports parent links, newLink (plus icon) via NewLinkTile
   - supports Active store display
   - preserves changeStore confirm logic exactly (no API changes)
   ------------------------------*/
const ItemTile = ({ item, isSub = false, closeSidebar }) => {
  const navigate = useNavigate();
  const { changeStore, activeStore } = useClientStore();
  const { setConfirmDetails } = useGeneralStore();
  const { pathname } = useLocation();

  if (!item) return null;

  // Active store display
  if (item.title === "Active" && item.store) {
    return (
      <div className="mt-3 py-2 px-3 flex items-center gap-3 rounded-lg bg-white/60 backdrop-blur-sm border border-white/40">
        <Store className="size-4" />
        <div className="truncate text-sm font-medium">{item.store}</div>
      </div>
    );
  }

  // If no link, just render title (defensive)
  if (!item.link) {
    return (
      <div
        className={`px-2 py-2 text-sm font-semibold rounded-lg text-gray-700`}
      >
        {item.title}
      </div>
    );
  }

  const isActive = pathname.startsWith(item.link);
  const isSubActive = pathname === item.link && isSub;

  // preserves your original confirmation/change store flow
  const checkIfActive = (link) => {
    if (!isSub) return;
    if (!item?.link?.includes("client/store")) return;

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

    const storeId = link.split("/").pop();
    if (!activeStore?.storeId) {
      changeStore(storeId);
    } else if (activeStore?.storeId !== storeId) {
      openConfirmDialog(storeId);
    }
  };

  // when item has newLink (e.g., Pages with "add" button), render NewLinkTile
  if (item.newLink) {
    return (
      <NewLinkTile
        item={item}
        closeSidebar={closeSidebar}
        checkIfActive={checkIfActive}
        isActive={isActive}
        isSub={isSub}
        isSubActive={isSubActive}
      />
    );
  }

  // normal link tile
  return (
    <Link
      to={item.link}
      onClick={() => {
        closeSidebar();
        checkIfActive(item.link);
      }}
      className={`flex items-center gap-3 w-full transition-all duration-250 rounded-lg px-3 py-2
        ${
          !isSub
            ? isActive
              ? "bg-white/80 shadow-md text-black/90"
              : "hover:bg-white/60 hover:shadow-sm text-gray-800/90"
            : "text-gray-800/90 pl-8"
        }
      `}
    >
      {!isSub && item.icon}
      <div
        className={`flex-1 text-[15px] ${
          isSub ? "truncate" : "font-semibold"
        }`}
      >
        {item.title}
      </div>

      {/* sub active marker */}
      {isSubActive && (
        <div className="text-green-700 font-semibold text-sm">●</div>
      )}
    </Link>
  );
};

/* ------------------------------
   NewLinkTile (parent item with a "new" action)
   - clicking main body navigates to item.link
   - clicking plus icon goes to item.newLink
   ------------------------------*/
const NewLinkTile = ({
  item,
  closeSidebar,
  checkIfActive,
  isActive,
  isSub,
  isSubActive,
}) => {
  const navigate = useNavigate();

  const onPlusClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // navigate to the new item creation path
    navigate(item.newLink);
    closeSidebar();
  };

  return (
    <div
      onClick={() => {
        closeSidebar();
        checkIfActive(item.link);
      }}
      className={`flex items-center gap-3 w-full transition-all duration-250 rounded-lg px-2 py-2
        ${!isSub ? (isActive ? "bg-white/80 shadow-md" : "hover:bg-white/60") : "pl-8"}
      `}
    >
      <Link to={item.link} className="flex items-center gap-3 py-1 w-full">
        {!isSub && item.icon}
        <div className={`${isSub ? "truncate" : "font-semibold"} text-[15px]`}>
          {item.title}
        </div>
      </Link>

      {item.newLink && (
        <button
          onClick={onPlusClick}
          className="ml-auto pr-1 rounded-md p-1 hover:bg-white/30 transition"
          aria-label={`create new ${item.title}`}
        >
          <Plus className="size-5" />
        </button>
      )}
    </div>
  );
};

export default Sidebar;
