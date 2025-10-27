import FetchPageDetails from "../wrappers/FetchPageDetails";
import RequireAuth from "../wrappers/RequireAuth";

const routes = [
  // {
  //   element: <FetchPageDetails />,
  //   children: [
  //     { path: "/", element: <MenuPage /> },
  //     { path: "/meals", element: <MenuPage /> },
  //     { path: "/products", element: <ProductsPage /> },
  //   ],
  // },
  {
    path: "client",
    element: (
      <RequireAuth>
        <></>
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: (<FetchPageDetails />),
  },
];

export default routes;