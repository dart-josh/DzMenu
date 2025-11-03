import { Bell, MessageCircle, Search, UserCircle2 } from "lucide-react";

const Header = () => {
  return (
    <div className="h-18 flex gap-5 items-center">
      <div className="w-full font-bold text-3xl text-black">{"Dashboard"}</div>

      <SearchBar />

      <div className="flex gap-3 items-center">
        {/* Create */}
        <div className="rounded-full h-10 bg-black/90 text-white font-semibold text-sm px-5 py-2">
          Create
        </div>

        {/* notification */}
        <div className="rounded-full size-10 bg-white/60 text-black/60 flex items-center justify-center">
          <Bell className="size-5" />
        </div>
        {/* inbox */}
        <div className="rounded-full size-10 bg-white/60 text-black/60 flex items-center justify-center">
          <MessageCircle className="size-5" />
        </div>
        {/* profile */}
        <div className="rounded-full size-10 bg-white/60 text-black/60 flex items-center justify-center">
          <UserCircle2 className="size-5" />
        </div>
      </div>
    </div>
  );
};

// Top bar
const SearchBar = () => {
  return (
    <div className="text-black/80 gap-2 h-10 rounded-full bg-white/60 py-1.5 px-3 flex items-center w-[500px]">
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

export default Header;
