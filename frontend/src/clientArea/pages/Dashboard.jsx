// import {
//   Store,
//   LayoutGrid,
//   ShoppingBag,
//   Users,
//   Eye,
//   TrendingUp,
//   PlusCircle,
//   BarChart3,
//   Settings,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import {
//   useClientPageStore,
//   useClientProductStore,
//   useClientStore,
// } from "../../store/useClientStore";
// import {Link} from "react-router-dom"

// const Dashboard = () => {
//   const { stores, activeStore } = useClientStore();
//   const { pages } = useClientPageStore();
//   const { products } = useClientProductStore();

//   const [stats, setStats] = useState({
//     stores: stores.length,
//     pages: pages.length,
//     products: products.length,
//     views: 0,
//   });

//   useEffect(() => {
//     setStats({
//       stores: stores.length,
//       pages: pages.length,
//       products: products.length,
//       views: 0,
//     });
//   }, [stores, pages, products]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-6 md:p-10">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
//         <div>
//           <h1 className="text-3xl font-semibold bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
//             Client Dashboard
//           </h1>
//           <p className="text-gray-400 text-sm">
//             Manage your stores, pages, and products
//           </p>
//         </div>
//         <Link to={"/client/store?x=create"} className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition text-white px-5 py-2 rounded-xl shadow-md">
//           <PlusCircle className="w-5 h-5" /> Add New Store
//         </Link>
//       </div>

//       {/* Grid Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Section */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Stats Section */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//             <StatCard
//               icon={<Store className="w-5 h-5" />}
//               label="Stores"
//               value={stats.stores}
//               color="from-cyan-400 to-blue-500"
//             />
//             <StatCard
//               icon={<LayoutGrid className="w-5 h-5" />}
//               label="Pages"
//               value={stats.pages}
//               color="from-emerald-400 to-green-500"
//             />
//             <StatCard
//               icon={<ShoppingBag className="w-5 h-5" />}
//               label="Products"
//               value={stats.products}
//               color="from-purple-400 to-indigo-500"
//             />
//             {/* <StatCard
//               icon={<Eye className="w-5 h-5" />}
//               label="Views"
//               value={stats.views.toLocaleString()}
//               color="from-pink-400 to-rose-500"
//             /> */}
//           </div>

//           {/* Graph + Insights */}
//           <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg p-6">
//             <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
//               <BarChart3 className="w-5 h-5 text-cyan-400" />
//               Store Insights
//             </h2>
//             <FakeChart />
//             <p className="text-sm text-gray-400 mt-3">
//               Traffic and insights from the last 30 days. Coming soon...
//             </p>
//           </div>

//           {/* Pages & Products Overview */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <SegmentCard
//               icon={<LayoutGrid className="w-5 h-5 text-blue-400" />}
//               title="Your Pages"
//               items={pages.slice(0, 5)}
//               color="blue"
//               type="page"
//             />
//             <SegmentCard
//               icon={<ShoppingBag className="w-5 h-5 text-emerald-400" />}
//               title="Top Products"
//               items={products.slice(0, 5)}
//               color="emerald"
//               type="product"
//             />
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="space-y-6">
//           {/* Quick Actions */}
//           <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg p-5">
//             <h3 className="font-semibold text-lg mb-3">Quick Actions</h3>
//             <div className="space-y-3">
//               <QuickAction
//                 icon={<Store />}
//                 label="Create Store"
//                 color="from-cyan-400 to-blue-500"
//                 link={"/client/store?x=create"}
//               />
//               <QuickAction
//                 icon={<LayoutGrid />}
//                 label="Create Page"
//                 color="from-purple-400 to-indigo-500"
//                 link={`/client/s/${activeStore?.storeId}/p/new`}
//               />
//               <QuickAction
//                 icon={<ShoppingBag />}
//                 label="Add Product"
//                 color="from-emerald-400 to-green-500"
//                 link={`/client/products?x=create`}
//               />
//             </div>
//           </div>

//           {/* Activity Feed */}
//           <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg p-5">
//             <h3 className="font-semibold text-lg mb-3">Recent Activity</h3>
//             <div className="space-y-3 text-sm text-gray-300">
//               {/* <ActivityItem
//                 icon={<TrendingUp className="text-green-400" />}
//                 text="Store ‘Vista Lounge’ gained +320 new views"
//                 time="3h ago"
//               />
//               <ActivityItem
//                 icon={<ShoppingBag className="text-blue-400" />}
//                 text="Added new product ‘Vegan Smoothie’"
//                 time="5h ago"
//               />
//               <ActivityItem
//                 icon={<LayoutGrid className="text-indigo-400" />}
//                 text="Edited page ‘Gallery’"
//                 time="1 day ago"
//               />
//               <ActivityItem
//                 icon={<Settings className="text-gray-400" />}
//                 text="Updated store settings"
//                 time="2 days ago"
//               /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ------------------------- COMPONENTS ------------------------- */

// const StatCard = ({ icon, label, value, color }) => (
//   <div
//     className={`rounded-2xl bg-gradient-to-br ${color} p-4 shadow-md backdrop-blur-lg border border-white/10`}
//   >
//     <div className="flex items-center justify-between">
//       <div>
//         <h3 className="text-sm text-white/80">{label}</h3>
//         <p className="text-2xl font-bold">{value}</p>
//       </div>
//       <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
//     </div>
//   </div>
// );

// const SegmentCard = ({ icon, title, items, type }) => {
//   const isPage = type == "page";
//   return (
//     <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-md p-5">
//       <div className="flex items-center gap-2 mb-3">
//         {icon}
//         <h3 className="font-semibold">{title}</h3>
//       </div>
//       <div className="space-y-3 text-sm">
//         {items.map((item, i) => (
//           <div
//             key={i}
//             className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-xl hover:bg-white/10 transition"
//           >
//             <span>{isPage ? item.pageTitle : item.name}</span>
//             <span className="text-gray-400">
//               {/* {item.views ? `${item.views} views` : `${item.sales} sales`} */}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const QuickAction = ({ icon, label, color, link }) => (
//   <Link
//   to={link}
//     className={`w-full cursor-pointer flex items-center gap-2 text-left px-3 py-2 rounded-lg bg-gradient-to-r ${color} hover:opacity-90 transition text-white shadow`}
//   >
//     {icon}
//     <span className="text-sm font-medium">{label}</span>
//   </Link>
// );

// const ActivityItem = ({ icon, text, time }) => (
//   <div className="flex items-start gap-2">
//     <div className="mt-1">{icon}</div>
//     <div>
//       <p>{text}</p>
//       <span className="text-xs text-gray-500">{time}</span>
//     </div>
//   </div>
// );

// const FakeChart = () => (
//   <div className="h-40 bg-gradient-to-t from-blue-500/20 to-transparent rounded-xl relative overflow-hidden">
//     <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-3">
//       {[20, 50, 80, 40, 90, 70, 100].map((h, i) => (
//         <div
//           key={i}
//           className="w-4 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-t"
//           style={{ height: `${h}%` }}
//         ></div>
//       ))}
//     </div>
//   </div>
// );

// export default Dashboard;

import {
  Store,
  LayoutGrid,
  ShoppingBag,
  Users,
  Eye,
  TrendingUp,
  PlusCircle,
  BarChart3,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  useClientPageStore,
  useClientProductStore,
  useClientStore,
} from "../../store/useClientStore";
import { Link } from "react-router-dom";
import { useUserStore } from "../userArea/hooks/useUserStore";

const Dashboard = () => {
  const { planUsage } = useUserStore();
  const { stores, activeStore } = useClientStore();
  const { pages } = useClientPageStore();
  const { products } = useClientProductStore();

  const [stats, setStats] = useState({
    stores: planUsage?.stores || 0,
    pages: planUsage?.pages || 0,
    products: planUsage?.products || 0,
    views: 0,
  });

  useEffect(() => {
    setStats({
      stores: planUsage?.stores || 0,
      pages: planUsage?.pages || 0,
      products: planUsage?.products || 0,
      views: 0,
    });
  }, [stores, planUsage]);

  return (
    <div className="min-h-screen text-gray-900 p-6 md:p-10">
      {/* bg-gradient-to-br from-white via-slate-50 to-gray-100 */}
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Client Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your stores, pages, and products
          </p>
        </div>
        <Link
          to={"/client/store?x=create"}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-400 hover:to-teal-400 transition text-white px-5 py-2 rounded-xl shadow-md"
        >
          <PlusCircle className="w-5 h-5" /> Add New Store
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              icon={<Store className="w-5 h-5" />}
              label="Stores"
              value={stats.stores}
              color="from-blue-400 to-teal-500"
            />
            <StatCard
              icon={<LayoutGrid className="w-5 h-5" />}
              label="Pages"
              value={stats.pages}
              color="from-green-400 to-emerald-500"
            />
            <StatCard
              icon={<ShoppingBag className="w-5 h-5" />}
              label="Products"
              value={stats.products}
              color="from-purple-400 to-indigo-500"
            />
          </div>

          {/* Graph + Insights */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              Store Insights
            </h2>
            <FakeChart />
            <p className="text-sm text-gray-500 mt-3">
              Traffic and insights from the last 30 days. Coming soon...
            </p>
          </div>

          {/* Pages & Products Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SegmentCard
              icon={<LayoutGrid className="w-5 h-5 text-blue-500" />}
              title="Your Pages"
              items={pages.slice(0, 5)}
              color="blue"
              type="page"
            />
            <SegmentCard
              icon={<ShoppingBag className="w-5 h-5 text-emerald-500" />}
              title="Top Products"
              items={products.slice(0, 5)}
              color="emerald"
              type="product"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
            <h3 className="font-semibold text-lg mb-3 text-gray-800">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <QuickAction
                icon={<Store />}
                label="Create Store"
                color="from-blue-500 to-teal-500"
                link={"/client/store?x=create"}
              />
              <QuickAction
                icon={<LayoutGrid />}
                label="Create Page"
                color="from-indigo-500 to-purple-500"
                link={`/client/s/${activeStore?.storeId}/p/new`}
              />
              <QuickAction
                icon={<ShoppingBag />}
                label="Add Product"
                color="from-emerald-500 to-green-500"
                link={`/client/products?x=create`}
              />
            </div>
          </div>

          {/* Activity Feed */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
            <h3 className="font-semibold text-lg mb-3 text-gray-800">
              Recent Activity
            </h3>
            <div className="space-y-3 text-sm text-gray-500">
              {/* Activity log will appear here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------- COMPONENTS ------------------------- */

const StatCard = ({ icon, label, value, color }) => (
  <div
    className={`rounded-2xl bg-gradient-to-br ${color} p-4 shadow-md text-white border border-white/20`}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm opacity-90">{label}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="bg-white/30 p-2 rounded-lg">{icon}</div>
    </div>
  </div>
);

const SegmentCard = ({ icon, title, items, type }) => {
  const isPage = type === "page";
  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-3 text-sm">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            <span className="text-gray-700">
              {isPage ? item.pageTitle : item.name}
            </span>
            <span className="text-gray-400 text-xs">...</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickAction = ({ icon, label, color, link }) => (
  <Link
    to={link}
    className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg bg-gradient-to-r ${color} hover:opacity-90 transition text-white shadow`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const FakeChart = () => (
  <div className="h-40 bg-gradient-to-t from-blue-200/40 to-transparent rounded-xl relative overflow-hidden">
    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-3">
      {[20, 50, 80, 40, 90, 70, 100].map((h, i) => (
        <div
          key={i}
          className="w-4 bg-gradient-to-t from-blue-400 to-teal-400 rounded-t"
          style={{ height: `${h}%` }}
        ></div>
      ))}
    </div>
  </div>
);

export default Dashboard;
