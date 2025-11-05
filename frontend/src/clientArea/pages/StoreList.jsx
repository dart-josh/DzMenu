import { Plus, Store, ArrowRight } from "lucide-react";
import ManageStoreDialog from "../dialogs/ManageStore";
import { useState } from "react";

const StoreList = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full py-10">
      <div className="w-full rounded-2xl h-fit bg-white/70 backdrop-blur-md px-6 py-8 shadow-md">
        <Stores />

        {/* Add new store button */}
        <div onClick={() => setOpen(true)} className="flex mt-10 cursor-pointer rounded-xl font-semibold items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:scale-[1.02] transition-all duration-200 h-12 w-[220px] gap-2">
          <Plus className="w-5 h-5" />
          Add New Store
        </div>
      </div>

      <ManageStoreDialog open={open} onClose={onClose} />
    </div>
  );
};

const Stores = () => {
  return (
    <div className="flex flex-wrap w-full gap-6">
      {[1, 2, 3].map((store, i) => (
        <StoreTile key={i} />
      ))}
    </div>
  );
};

const StoreTile = () => {
  return (
    <div className="group h-[170px] w-[230px] bg-white shadow-lg rounded-2xl border border-gray-200 hover:border-blue-400 transition-all duration-200 hover:shadow-blue-200/70 flex flex-col overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full px-4 text-center transition-transform duration-300 group-hover:scale-[1.02]">
        <Store className="w-8 h-8 text-blue-500 mb-2" />
        <h3 className="font-semibold text-lg text-gray-800">
          Delightsome Juice
        </h3>
        <p className="text-gray-500 text-sm">Fresh & tasty goodness</p>
      </div>

      <div className="h-10 bg-gray-100/80 border-t border-gray-200 flex items-center justify-between px-4 text-sm text-gray-600">
        <span>@delightsome-juice</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </div>
  );
};

export default StoreList;
