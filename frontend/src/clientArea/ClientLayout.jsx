import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

const ClientLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex relative min-h-screen overflow-hidden bg-gray-400 px-4">
      {/* Mobile sidebar */}
      <div
        className={`fixed md:hidden flex top-0 z-50 left-0 shadow-sm transform transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } h-screen bg-white/60`}
      >
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
      </div>
      
      {/* big screen sidebar */}
      <div className="fixed hidden md:flex top-0 z-50 left-0 h-screen">
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
      </div>

      {/* body */}
      <div className="w-full">
        {/* header */}
        <div className="fixed top-0 left-0 right-0 pr-2 pl-4 sm:pr-4 bg-gray-400 md:pl-[216px] lg:pl-[266px]">
          <Header
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </div>

        {/* main */}
        <main className="mt-18 md:ml-[200px] lg:ml-[250px]">
          {/* content */}
          <Outlet />
        </main>
      </div>

      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ClientLayout;
