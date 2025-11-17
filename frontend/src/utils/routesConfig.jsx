import ClientLayout from "../clientArea/ClientLayout";
import ManageStore from "../clientArea/pages/ManageStore";
import Dashboard from "../clientArea/pages/Dashboard";
import FetchPageDetails from "../wrappers/FetchPageDetails";
import RequireAuth from "../wrappers/RequireAuth";
import StoreList from "../clientArea/pages/StoreList";
import ProductsPage from "../clientArea/pages/ProductsPage";
import PagesList from "../clientArea/pages/PagesList";
import ManagePage from "../clientArea/pages/ManagePage";
import SetPageHeader from "../wrappers/SetPageHeader";
import Client404 from "../clientArea/components/Client404";
import MyAccount from "../clientArea/userArea/pages/My AccountPage";

const routes = [
  {
    path: "/",
    element: (
      <div className="flex w-full h-screen items-center justify-center">
        Welcome to DzVista
      </div>
    ),
  },

  //?- Client,
  {
    path: "client",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: (
          <SetPageHeader title="Dashboard">
            <Dashboard />
          </SetPageHeader>
        ),
      },
      {
        path: "dashboard",
        element: (
          <SetPageHeader title="Dashboard">
            <Dashboard />
          </SetPageHeader>
        ),
      },
      {
        path: "store",
        element: (
          <SetPageHeader title="My Stores">
            <StoreList />
          </SetPageHeader>
        ),
      },
      {
        path: "store/:storeId",
        element: (
          <SetPageHeader title="Manage Store">
            <ManageStore />
          </SetPageHeader>
        ),
      },
      {
        path: "s/:storeId/p",
        element: (
          <SetPageHeader title="My Pages">
            <PagesList />
          </SetPageHeader>
        ),
      },
      {
        path: "s/:storeId/p/:pageId",
        element: (
          <SetPageHeader title="Manage Page">
            <ManagePage />
          </SetPageHeader>
        ),
      },
      {
        path: "products",
        element: (
          <SetPageHeader title="Products">
            <ProductsPage />
          </SetPageHeader>
        ),
      },
      {
        path: "products/:category",
        element: (
          <SetPageHeader title="Products">
            <ProductsPage />
          </SetPageHeader>
        ),
      },
      {
        path: "account",
        element: (
          <SetPageHeader title="My Account">
            <MyAccount />
          </SetPageHeader>
        ),
      },
      {
        path: "*",
        element: (
          <SetPageHeader title="Invalid page">
            <Client404 />
          </SetPageHeader>
        ),
      },
    ],
  },

  //? Admin,
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
