import { useRoutes } from "react-router-dom";
import routes from "./utils/routesConfig";

function App() {
  const routing = useRoutes(routes);

  return (
    <div className="dark:bg-[#242424] bg-white min-h-screen flex flex-col">
      {routing}
    </div>
  );
}

export default App;
