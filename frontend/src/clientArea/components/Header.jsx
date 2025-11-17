import { Bell, MessageCircle, Search, UserCircle2 } from "lucide-react";
import { LogoTileLarge } from "../../components/LogoTile";
import { usePageHeaderStore } from "../../store/useGeneralStore";
import NotificationDropdown from "./NotificationDropdown";
import UserMenuDropdown from "../userArea/components/UserMenuDropdown";
import InboxDropdown from "./InboxDropdown";
import SearchDropdown from "./SearchDropdown";

const Header = ({ setIsSidebarOpen, isSidebarOpen, setCreateDialogOpen }) => {
  const { activePage } = usePageHeaderStore();

  return (
    <div className="h-18 flex gap-2 lg:gap-5 items-center w-full">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden"
      >
        <LogoTileLarge />
      </button>
      <div className="w-full font-bold text-3xl text-black">{activePage}</div>

      {/* <SearchBar /> */}
      <div className="w-full hidden lg:flex">
        <SearchDropdown />
      </div>

      <div className="flex gap-2 lg:gap-3 items-center">
        {/* Create */}
        <div
          onClick={() => setCreateDialogOpen(true)}
          className="cursor-pointer hidden rounded-full h-10 w-20 sm:flex items-center justify-center bg-black/90 text-white font-semibold text-sm px-2 py-2"
        >
          Create
        </div>

        {/* notification */}
        <div className="hidden xs:flex">
          <NotificationDropdown />
        </div>

        {/* inbox */}
        <div className="hidden xs:flex">
          <InboxDropdown />
        </div>

        {/* profile */}
        <UserMenuDropdown />
      </div>
    </div>
  );
};

export default Header;
