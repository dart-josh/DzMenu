import CreateProductPage from "../clientArea/CreateProductPage";
import FetchPageDetails from "../wrappers/FetchPageDetails";
import RequireAuth from "../wrappers/RequireAuth";

const routes = [
  {
    path: "/",
    element: <>Home</>,
  },

  // client,
  // admin,
  {
    path: "client/store/:storeId/create_product",
    element: (
      <RequireAuth>
        <CreateProductPage />
      </RequireAuth>
    ),
  },
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
