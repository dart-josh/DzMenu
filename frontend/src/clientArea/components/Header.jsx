import { Bell, MessageCircle, Search, UserCircle2 } from "lucide-react";
import { LogoTileLarge } from "../../components/LogoTile";

const Header = ({ setIsSidebarOpen, isSidebarOpen }) => {
  return (
    <div className="h-18 flex gap-2 lg:gap-5 items-center w-full">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden"
      >
        <LogoTileLarge />
      </button>
      <div className="w-full font-bold text-3xl text-black">{"Dashboard"}</div>

      <SearchBar />

      <div className="flex gap-2 lg:gap-3 items-center">
        {/* Create */}
        <div className="hidden rounded-full h-10 w-20 sm:flex items-center justify-center bg-black/90 text-white font-semibold text-sm px-2 py-2">
          Create
        </div>

        {/* notification */}
        <div className="hidden xs:flex">
          <IconCircle icon={<Bell className="size-5" />} />
        </div>

        {/* inbox */}
        <div className="hidden xs:flex">
          <IconCircle icon={<MessageCircle className="size-5" />} />
        </div>

        {/* profile */}
        <IconCircle icon={<UserCircle2 className="size-5" />} />
      </div>
    </div>
  );
};

// Search bar
const SearchBar = () => {
  return (
    <div className="text-black/80 hidden gap-2 h-10 rounded-full bg-white/60 py-1.5 px-3 lg:flex items-center max-w-[500px] w-full">
      <Search className="size-5" />

      <input
        type="text"
        id="search"
        className="border-none w-full outline-none"
        placeholder="Search anything..."
      />
    </div>
  );
};

// Icon box
const IconCircle = ({ icon }) => {
  return (
    <div className="rounded-full size-10 bg-white/60 text-black/60 flex items-center justify-center">
      {icon}
    </div>
  );
};

export default Header;
