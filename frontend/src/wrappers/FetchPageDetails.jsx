import { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { useMenuStore } from "../store/useMenuStore";
import { useLocation } from "react-router-dom";
import { fetchPageFromRoute } from "../helpers/storeHelpers";
import ProductsPage from "../ProductsPage";
import MenuPage from "../MenuPage";

const FetchPageDetails = () => {
  const { pathname } = useLocation();

  const [isFetching, setIsFetching] = useState(true);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    async function fetchPageDetails() {
      const res = await fetchPageFromRoute(pathname);

      if (res && res.pageType) {
        setPageData(res);
      }
      setIsFetching(false);
    }

    setIsFetching(true);
    fetchPageDetails();
  }, [pathname]);

  if (isFetching)
    return (
      <div className="h-screen flex items-center justify-center animate-pulse">
        Fetching....
      </div>
    );
  else return <SetStoreData data={pageData}> </SetStoreData>;
};

const SetStoreData = ({ data }) => {
  const { setProductStoreData } = useProductStore();
  const { setMenuStoreData } = useMenuStore();

  useEffect(() => {
    if (data.pageType == "Product") setProductStoreData(data.storeData);
    if (data.pageType == "Menu")
      setMenuStoreData({ ...data.storeData, items: data.storeData.products });
  }, [data, setMenuStoreData, setProductStoreData]);

  return <RoutePage pageType={data.pageType} />;
};

const RoutePage = ({ pageType }) => {
  switch (pageType) {
    case "Product":
      return <ProductsPage />;
    case "Menu":
      return <MenuPage />;

    default:
      <></>;
  }
};

export default FetchPageDetails;
