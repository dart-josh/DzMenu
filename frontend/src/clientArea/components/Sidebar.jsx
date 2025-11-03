import { Book, LayoutDashboard, Store } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogoTile } from "../../components/LogoTile";

const Sidebar = () => {
  const sideItems = [
    {
      link: "/client/dashboard",
      icon: <LayoutDashboard className="size-5" />,
      title: "Dashboard",
    },
    {
      link: "/client/store",
      icon: <Store className="size-5" />,
      title: "Store",
      sub: [
        {
          link: "/client/store/del",
          title: "Delightsome",
        },
        {
          link: "/client/store/bokku",
          title: "Bokku mart",
        },
      ],
    },
    {
      link: "/client/s/del/page",
      icon: <Book className="size-5" />,
      title: "Pages",
      sub: [
        {
          link: "/client/s/del/page/ach",
          title: "Juices",
        },
        {
          link: "/client/s/del/page/ach2",
          title: "Whole foods",
        },
      ],
    },
    {
      link: "/client/products",
      icon: <Store className="size-5" />,
      title: "Products",
    },
  ];

  return (
    <div className="w-[250px] pr-5 pb-4">
      <div className="h-18 pt-5">
        <LogoTile scale={105} size={25} color={"black"} />
      </div>

      <div className="flex flex-col w-full gap-3">
        {sideItems.map((item, i) => (
          <div key={i}>
            <ItemTile item={item} />
            {item.sub && item.sub.length > 0 && (
              <div className="mt-2">
                {item.sub.map((item, i) => (
                  <div key={i}>
                    <ItemTile item={item} isSub={true} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ItemTile = ({ item, isSub = false }) => {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(item.link);
  const isSubActive = pathname === item.link && isSub;
  return (
    <Link
      to={item.link}
      className={`${
        isActive && !isSub
          ? "bg-white/70 shadow-md text-black/80"
          : !isSub
          ? "hover:bg-white/70 hover:shadow-md hover:text-black/80 text-gray-800/90"
          : ""
      } ${
        isSubActive ? "underline text-green-950 font-semibold" : ""
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
