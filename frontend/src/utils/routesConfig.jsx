import ClientLayout from "../clientArea/ClientLayout";
import ManageStore from "../clientArea/pages/ManageStore";
import Dashboard from "../clientArea/pages/Dashboard";
import FetchPageDetails from "../wrappers/FetchPageDetails";
import RequireAuth from "../wrappers/RequireAuth";
import StoreList from "../clientArea/pages/StoreList";
import ProductsPage from "../clientArea/pages/ProductsPage";
import PagesList from "../clientArea/pages/PagesList";
import ManagePage from "../clientArea/pages/ManagePage";

const routes = [
  {
    path: "/",
    element: <div className="flex w-full h-screen items-center justify-center">Welcome to DzVista</div>,
  },

  // client,
  {
    path: "client",
    element: <ClientLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "store", element: <StoreList /> },
      { path: "store/:storeId", element: <ManageStore /> },
      { path: "s/:storeId/p", element: <PagesList /> },
      { path: "s/:storeId/p/:pageId", element: <ManagePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:category", element: <ProductsPage /> },
    ],
  },

  // admin,
  {
    path: "admin",
    element: <ClientLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },

  // Web pages
  {
    path: "*",
    element: <FetchPageDetails />,
  },
];

export default routes;

// {
//   element: <FetchPageDetails />,
//   children: [
//     { path: "/", element: <MenuPage /> },
//     { path: "/meals", element: <MenuPage /> },
//     { path: "/products", element: <ProductsPage /> },
//   ],
// },
