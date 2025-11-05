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
import { useState } from "react";

const Dashboard = () => {
  const [stats] = useState({
    stores: 4,
    pages: 16,
    products: 48,
    views: 10234,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Client Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Manage your stores, pages, and products
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition text-white px-5 py-2 rounded-xl shadow-md">
          <PlusCircle className="w-5 h-5" /> Add New Store
        </button>
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
              color="from-cyan-400 to-blue-500"
            />
            <StatCard
              icon={<LayoutGrid className="w-5 h-5" />}
              label="Pages"
              value={stats.pages}
              color="from-emerald-400 to-green-500"
            />
            <StatCard
              icon={<ShoppingBag className="w-5 h-5" />}
              label="Products"
              value={stats.products}
              color="from-purple-400 to-indigo-500"
            />
            <StatCard
              icon={<Eye className="w-5 h-5" />}
              label="Views"
              value={stats.views.toLocaleString()}
              color="from-pink-400 to-rose-500"
            />
          </div>

          {/* Graph + Insights */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              Store Insights
            </h2>
            <FakeChart />
            <p className="text-sm text-gray-400 mt-3">
              Traffic and sales insights from the last 30 days.
            </p>
          </div>

          {/* Pages & Products Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SegmentCard
              icon={<LayoutGrid className="w-5 h-5 text-blue-400" />}
              title="Your Pages"
              items={[
                { name: "Home", views: 2045 },
                { name: "Menu", views: 1580 },
                { name: "Gallery", views: 870 },
                { name: "Contact", views: 310 },
              ]}
              color="blue"
            />
            <SegmentCard
              icon={<ShoppingBag className="w-5 h-5 text-emerald-400" />}
              title="Top Products"
              items={[
                { name: "Classic Smoothie", sales: 320 },
                { name: "Organic Juice", sales: 278 },
                { name: "Deluxe Burger", sales: 145 },
                { name: "Vegan Wrap", sales: 97 },
              ]}
              color="emerald"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg p-5">
            <h3 className="font-semibold text-lg mb-3">Quick Actions</h3>
            <div className="space-y-3">
              <QuickAction
                icon={<Store />}
                label="Create Store"
                color="from-cyan-400 to-blue-500"
              />
              <QuickAction
                icon={<LayoutGrid />}
                label="Create Page"
                color="from-purple-400 to-indigo-500"
              />
              <QuickAction
                icon={<ShoppingBag />}
                label="Add Product"
                color="from-emerald-400 to-green-500"
              />
            </div>
          </div>

          {/* Activity Feed */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg p-5">
            <h3 className="font-semibold text-lg mb-3">Recent Activity</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <ActivityItem
                icon={<TrendingUp className="text-green-400" />}
                text="Store ‘Vista Lounge’ gained +320 new views"
                time="3h ago"
              />
              <ActivityItem
                icon={<ShoppingBag className="text-blue-400" />}
                text="Added new product ‘Vegan Smoothie’"
                time="5h ago"
              />
              <ActivityItem
                icon={<LayoutGrid className="text-indigo-400" />}
                text="Edited page ‘Gallery’"
                time="1 day ago"
              />
              <ActivityItem
                icon={<Settings className="text-gray-400" />}
                text="Updated store settings"
                time="2 days ago"
              />
            </div>
          </div>

          {/* Users */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg p-5">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" /> Team Members
            </h3>
            <div className="space-y-3">
              {["Joshua", "Damilola", "Chika", "Ademola"].map((user, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2"
                >
                  <span>{user}</span>
                  <span className="text-gray-400 text-xs">Admin</span>
                </div>
              ))}
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
    className={`rounded-2xl bg-gradient-to-br ${color} p-4 shadow-md backdrop-blur-lg border border-white/10`}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm text-white/80">{label}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
    </div>
  </div>
);

const SegmentCard = ({ icon, title, items, color }) => (
  <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-md p-5">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="font-semibold">{title}</h3>
    </div>
    <div className="space-y-3 text-sm">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-xl hover:bg-white/10 transition"
        >
          <span>{item.name}</span>
          <span className="text-gray-400">
            {item.views ? `${item.views} views` : `${item.sales} sales`}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const QuickAction = ({ icon, label, color }) => (
  <button
    className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg bg-gradient-to-r ${color} hover:opacity-90 transition text-white shadow`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const ActivityItem = ({ icon, text, time }) => (
  <div className="flex items-start gap-2">
    <div className="mt-1">{icon}</div>
    <div>
      <p>{text}</p>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  </div>
);

const FakeChart = () => (
  <div className="h-40 bg-gradient-to-t from-blue-500/20 to-transparent rounded-xl relative overflow-hidden">
    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-3">
      {[20, 50, 80, 40, 90, 70, 100].map((h, i) => (
        <div
          key={i}
          className="w-4 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-t"
          style={{ height: `${h}%` }}
        ></div>
      ))}
    </div>
  </div>
);

export default Dashboard;

// =================================================================

// import {
//   BarChart3,
//   Store,
//   ShoppingBag,
//   LayoutDashboard,
//   Eye,
//   Settings,
//   Users,
//   PlusCircle,
// } from "lucide-react";

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-100 p-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-extrabold tracking-tight">
//             Client Dashboard
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400">
//             Manage stores, pages, and products at a glance.
//           </p>
//         </div>
//         <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-xl transition shadow-md hover:shadow-lg dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md">
//           <PlusCircle className="w-5 h-5" />
//           New Store
//         </button>
//       </div>

//       {/* Overview Grid */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         {[
//           {
//             title: "Total Stores",
//             value: "12",
//             icon: <Store className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
//           },
//           {
//             title: "Products",
//             value: "248",
//             icon: (
//               <ShoppingBag className="w-6 h-6 text-green-600 dark:text-green-400" />
//             ),
//           },
//           {
//             title: "Page Views",
//             value: "58,402",
//             icon: <Eye className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
//           },
//           {
//             title: "Customers",
//             value: "1,234",
//             icon: <Users className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
//           },
//         ].map((stat, idx) => (
//           <div
//             key={idx}
//             className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-5 flex items-center gap-4"
//           >
//             <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700/60">
//               {stat.icon}
//             </div>
//             <div>
//               <h4 className="text-sm text-gray-500 dark:text-gray-400 font-medium">
//                 {stat.title}
//               </h4>
//               <p className="text-2xl font-semibold">{stat.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Analytics Section */}
//         <div className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 backdrop-blur-lg">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-semibold text-lg">Store Insights</h3>
//             <BarChart3 className="text-blue-500" />
//           </div>
//           <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 border border-dashed rounded-xl">
//             <span>📊 Chart or Visualization (e.g., Recharts)</span>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="space-y-6">
//           <div className="bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-md backdrop-blur-lg">
//             <h3 className="font-semibold text-lg mb-3">Quick Actions</h3>
//             <div className="flex flex-col gap-3">
//               {[
//                 { icon: <Store />, label: "Create New Store" },
//                 { icon: <ShoppingBag />, label: "Add Product" },
//                 { icon: <LayoutDashboard />, label: "Manage Pages" },
//                 { icon: <Settings />, label: "Store Settings" },
//               ].map((action, idx) => (
//                 <button
//                   key={idx}
//                   className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
//                 >
//                   <span className="text-gray-600 dark:text-gray-300">
//                     {action.icon}
//                   </span>
//                   <span className="font-medium">{action.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Activity Log */}
//           <div className="bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-md backdrop-blur-lg">
//             <h3 className="font-semibold text-lg mb-3">Recent Activity</h3>
//             <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
//               <li>🛍️ New product “Summer Smoothie” added</li>
//               <li>🏬 Store “Urban Bites” updated details</li>
//               <li>👀 1.2k new page views in the last 24 hours</li>
//               <li>💰 Product “Classic Burger” got 38 new orders</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
