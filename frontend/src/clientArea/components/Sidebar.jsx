import { Book, LayoutDashboard, Store, StoreIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { LogoTileLarge } from "../../components/LogoTile";
import { useClientStore } from "../../store/useClientStore";
import { useEffect } from "react";
import { useState } from "react";
import { useGeneralStore } from "../../store/useGeneralStore";

const Sidebar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const { activeStore, stores, getMyStores } = useClientStore();
  const [sideItems, setSideItems] = useState([
    {
      link: "/client/dashboard",
      icon: <LayoutDashboard className="size-5" />,
      title: "Dashboard",
    },
    {
      link: "/client/store",
      icon: <Store className="size-5" />,
      title: "Store",
    },
    {
      title: "Active",
      store: "",
    },
    {
      link: "/client/s/del/p",
      icon: <Book className="size-5" />,
      title: "Pages",
      sub: [
        { link: "/client/s/del/p/ach", title: "All products" },
        { link: "/client/s/del/p/ach2", title: "Whole foods" },
      ],
    },
    {
      link: "/client/products",
      icon: <Store className="size-5" />,
      title: "Products",
      sub: [
        { link: "/client/products/smoothies", title: "Smoothies" },
        { link: "/client/products/juice", title: "Juices" },
        { link: "/client/products/groceries", title: "Groceries" },
        { link: "/client/products/whole_foods", title: "Whole foods" },
      ],
    },
  ]);

  const closeSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const item = {
      link: "/client/store",
      icon: <Store className="size-5" />,
      title: "Store",
      sub: stores.map((store, i) => ({
        link: `/client/store/${store.storeId}`,
        title: store.storeName,
        id: i,
      })),
    };

    const updatedList = sideItems.map((store) =>
      store?.title === "Store"
        ? { ...item } // modify the object here
        : store
    );

    setSideItems(updatedList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stores]);

  useEffect(() => {
    const updatedList = sideItems.map((store) =>
      store?.title === "Active"
        ? { ...store, store: activeStore?.storeName || "" } // modify the object here
        : store
    );

    setSideItems(updatedList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStore]);

  useEffect(() => {
    getMyStores();
  }, [getMyStores]);

  return (
    <div className="flex flex-col h-full w-[250px] md:w-[210px] lg:w-[250px] pt-4 pl-2 md:pl-3 lg:pl-4">
      <div onClick={closeSidebar} className="mb-6">
        <LogoTileLarge />
      </div>

      <nav className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
        {sideItems.map((item, i) => (
          <div key={i}>
            <ItemTile closeSidebar={closeSidebar} item={item} />
            {(item?.sub && item?.sub?.length && (
              <div className="mt-2 space-y-1">
                {item.sub.map((sub, j) => (
                  <ItemTile
                    closeSidebar={closeSidebar}
                    key={j}
                    item={sub}
                    isSub
                  />
                ))}
              </div>
            )) ||
              ""}
          </div>
        ))}
      </nav>

      <div className="text-xs text-black/70 mt-3 mb-2 text-center">
        © 2025 DzVista
      </div>
    </div>
  );
};

const ItemTile = ({ item, isSub = false, closeSidebar }) => {
  const { changeStore, activeStore } = useClientStore();
  const { setConfirmDetails } = useGeneralStore();
  const { pathname } = useLocation();

  if (!item) return;

  if (item.title == "Active")
    if (!item.link && item.store)
      return (
        <div className="border-y mt-3 py-2 items-center flex gap-2 w-full text-sm">
          <Store className="size-4" />
          <span className="truncate w-full">{item.store}</span>
        </div>
      );
    else return;

  const isActive = pathname.startsWith(item.link);
  const isSubActive = pathname === item.link && isSub;

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

  return (
    <Link
      to={item.link}
      onClick={() => {
        closeSidebar();
        checkIfActive(item.link);
      }}
      className={`${
        isActive && !isSub
          ? "bg-white/70 shadow-md text-black/80"
          : !isSub
          ? "hover:bg-white/70 hover:shadow-md hover:text-black/80 text-gray-800/90"
          : ""
      } ${
        isSubActive
          ? "underline text-green-950 font-semibold"
          : "hover:text-green-950 hover:font-semibold"
      }  transition duration-300  ${
        isSub ? "text-gray-800/90 px-2 py-1 pl-10" : "font-semibold px-2 py-2"
      } text-[16px] rounded-lg  cursor-pointer flex items-center gap-2`}
    >
      {!isSub && item.icon}
      <div>{item.title}</div>
    </Link>
  );
};

export default Sidebar;
