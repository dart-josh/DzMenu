import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const ClientLayout = () => {
  return (
    <div className="flex relative min-h-screen overflow-hidden bg-gray-400 px-4">
        {/* sidebar */}
        <div className="fixed top-0 left-4 max-w-[250px]">
              <Sidebar />
            </div>
        

        {/* body */}
        <div className="w-full">
            {/* topbar */}
            <div className="fixed top-0 right-4 bg-gray-400">
              <Header />
            </div>

            {/* main */}
            <div className="mt-18 ml-[250px] pr-4">
                {/* content */}
                <Outlet />
            </div>

        </div>
    </div>
  )
}

export default ClientLayout