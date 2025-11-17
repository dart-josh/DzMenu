const MyAccount = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-white to-slate-200 px-5 py-10 flex justify-center">
      <div className="w-full max-w-4xl space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            My Account
          </h1>
          <p className="text-slate-500 mt-1">Manage your profile, plan, and identity</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl p-6 
                        hover:shadow-xl transition-all">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="size-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              JD
            </div>

            {/* Info */}
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-slate-800">John Doe</h2>
              <p className="text-sm text-slate-500">ID: 548391-039</p>
              <p className="text-sm text-slate-500">
                Email: johndoe@gmail.com 
                <span className="ml-2 text-green-500 font-semibold">(Verified)</span>
              </p>
              <p className="text-sm text-slate-600">
                Role: <span className="font-medium text-indigo-600">Product Designer</span>
              </p>

              {/* Edit profile button */}
              <button className="mt-2 px-4 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow hover:opacity-85 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Current Plan */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl p-6 space-y-5
                        hover:shadow-xl transition-all">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            Current Plan
          </h3>

          {/* Plan Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <PlanStat label="Stores" value="1 / 4" />
            <PlanStat label="Pages" value="1 / 5" />
            <PlanStat label="Products" value="1 / 100" />
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            Your current plan allows you to create up to 4 stores, 5 pages, and 100 products. 
            Upgrade your plan to unlock unlimited possibilities and premium tools.
          </p>

          {/* Upgrade Button */}
          <a
            href="/client/plans"
            className="inline-block px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow hover:opacity-85 transition"
          >
            View Plans & Upgrade
          </a>
        </div>

      </div>
    </div>
  );
};

const PlanStat = ({ label, value }) => (
  <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-white/40 shadow p-4 flex flex-col items-center">
    <span className="text-slate-500 text-sm">{label}</span>
    <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
      {value}
    </span>
  </div>
);

export default MyAccount;
