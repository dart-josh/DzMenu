import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";
import MenuPage from "../pages/MenuPage";
import { routerHook } from "../hooks/routerHook";
import { usePageStore } from "../store/usePageStore";

const FetchPageDetails = () => {
  const { pathname } = useLocation();

  const { route, isFetching, pageData, routePage } = routerHook();

  // path change
  useEffect(() => {
    routePage(pathname);
  }, [pathname, routePage]);

  // route change
  useEffect(() => {
    // replace path with route
  }, [route]);

  if (isFetching)
    return (
      <div className="h-screen flex items-center justify-center animate-pulse">
        Fetching....
      </div>
    );
  else if (route === "client_broken")
    return <BadPageRoute title={"Invalid Client URL"} />;
  else if (route === "store_broken")
    return <BadPageRoute title={"Invalid Store url"} />;
  else if (route === "not_found")
    return <BadPageRoute title={"Page not found"} />;
  // invalid page data
  else if (!pageData) return <BadPageRoute title={"Error fetching page"} />;
  // valid page
  else return <SetStoreData data={pageData}> </SetStoreData>;
};

// Set store data
const SetStoreData = ({ data }) => {
  const { setPageData } = usePageStore();

  useEffect(() => {
    setPageData(data);
  }, [data, setPageData]);

  return (
    <div className="bg-gradient-to-br from-slate-100 via-white to-slate-200">
      <RoutePage pageType={data.pageType} />;
    </div>
  );
};

// Route page with (pageType)
const RoutePage = ({ pageType }) => {
  switch (pageType) {
    case "Product":
      return <ProductsPage />;
    case "Menu":
      return <MenuPage />;

    default:
      return <ProductsPage />;
  }
};

//! Bad page
const BadPageRoute = ({ title }) => {
  return (
    <div className="h-screen flex items-center justify-center">{title}</div>
  );
};

export default FetchPageDetails;
