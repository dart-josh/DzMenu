
export const ManageStoreShimmer = () => {
  return (
    <div className="animate-pulse w-full py-10 pt-5 space-y-12 overflow-hidden select-none">
      {/* Store Details */}
      <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-white shadow-md p-6 border border-teal-100/80">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-teal-200/40 rounded-xl"></div>
            <div>
              <div className="h-5 w-40 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
            </div>
          </div>
          <div className="h-6 w-48 bg-gray-200 rounded-full"></div>
        </div>
        <div className="mt-5 h-10 w-60 bg-gray-200 rounded-full"></div>
      </div>

      {/* Pages Section */}
      <div>
        <div className="h-8 w-40 bg-blue-200/60 rounded-md mb-4"></div>
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white px-5 py-5 border border-blue-100 shadow-sm">
          <div className="flex w-full overflow-x-auto pb-4 gap-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="min-w-[120px] h-[80px] bg-gray-200/60 rounded-xl"
                ></div>
              ))}
          </div>
          <div className="h-9 w-36 bg-blue-200/60 rounded-lg mt-5"></div>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="h-8 w-40 bg-emerald-200/60 rounded-md mb-4"></div>
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-white px-5 py-5 border border-emerald-100 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-[80px] bg-gray-200/60 rounded-xl"
                ></div>
              ))}
          </div>
          <div className="h-9 w-32 bg-emerald-200/60 rounded-lg mt-6"></div>
        </div>
      </div>

      {/* Settings Section */}
      <div>
        <div className="h-8 w-48 bg-violet-200/60 rounded-md mb-4"></div>
        <div className="h-20 w-full max-w-[500px] bg-gray-100/70 rounded-xl"></div>
        <div className="h-10 w-40 bg-violet-200/60 rounded-lg mt-4"></div>
      </div>

      {/* Danger Zone */}
      <div>
        <div className="h-8 w-48 bg-red-200/60 rounded-md mb-4"></div>
        <div className="h-20 w-full max-w-[500px] bg-gray-100/70 rounded-xl"></div>
        <div className="h-10 w-40 bg-red-200/60 rounded-lg mt-4"></div>
      </div>
    </div>
  );
};
