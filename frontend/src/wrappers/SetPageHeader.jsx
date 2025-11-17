import { useEffect } from "react";
import { usePageHeaderStore } from "../store/useGeneralStore";

const SetPageHeader = ({ title, children }) => {
  const { setActivePage } = usePageHeaderStore();

  useEffect(() => {
    setActivePage(title || "Dashboard");
  }, [title, setActivePage]);

  return <>{children}</>; // ✅ Return JSX, not an object
};

export default SetPageHeader;
