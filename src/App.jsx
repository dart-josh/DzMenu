import { Routes, Route } from "react-router-dom";

import MenuPage from "./MenuPage";
import ProductsPage from "./ProductsPage";
import RequireAuth from "./wrappers/RequireAuth";

function App() {
  return (
    <div className="dark:bg-[#242424] bg-white min-h-screen flex flex-col">
      {/* <ProductsPage /> */}
      <Routes>
        {/* Public / General layout */}
        <Route path="/" element={<MenuPage />} />
        <Route path="/meals" element={<MenuPage />} />
        <Route path="/products" element={<ProductsPage />} />

        {/* Auth / Protected */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <></>
            </RequireAuth>
          }
        />

        {/* Fallback / redirect */}
        <Route path="*" element={<ProductsPage/>} />
      </Routes>
    </div>
  );
}

export default App;
