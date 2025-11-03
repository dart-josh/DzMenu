import { Plus } from "lucide-react";

const StoreList = () => {
  return (
    <div className="w-full py-10">
      <div className="w-full rounded-lg h-fit bg-white/70 px-6 py-6">
        <Stores />

        <div className="flex mt-10 cursor-pointer rounded font-semibold items-center bg-white shadow-sm h-10 w-[200px] text-black/80 gap-2 px-2">
          <Plus />
          Add new store
        </div>
      </div>
    </div>
  );
};

const Stores = () => {
  return (
    <div className="flex flex-wrap w-full gap-4">
      {[1, 2, 3].map((store, i) => (
        <div>
          <StoreTile />
        </div>
      ))}
    </div>
  );
};

const StoreTile = () => {
  return (
    <div className="h-[150px] w-[200px] flex flex-col bg-white shadow-2xl rounded-lg">
      <div className="h-full flex items-center justify-center font-semibold text-black text-xl text-center">
        {"Delightsome Juice"}
      </div>
      <div className="h-10 text-black/80 flex text-sm items-center px-3 bg-gray-300 rounded-b-lg">
        {"delightsome-juice"}
      </div>
    </div>
  );
};

export default StoreList;
