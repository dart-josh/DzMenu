import { Plus } from "lucide-react";


const PagesList = () => {
  return (
    <div className="w-full py-10">
      <div className="w-full rounded-lg h-fit bg-white/70 px-6 py-6">
        <div className="grid grid-cols-2 w-full overflow-x-auto pb-4 gap-6">
          {(true &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((page, i) => (
              <div
                key={i}
                className="min-w-[100px] bg-neutral-600/60 rounded-lg h-[150px]"
              ></div>
            ))) || <AddNewButton empty={true} label={"Add new page"} />}
        </div>

        {true && <AddNewButton label={"Add new page"} />}
      </div>
    </div>
  )
}

const AddNewButton = ({ empty = false, label }) => {
  return (
    <div
      className={`flex cursor-pointer rounded font-semibold items-center bg-white shadow-sm text-black/80 gap-2 px-2 ${
        empty
          ? " justify-center text-center flex-col h-[100px] w-[150px]"
          : "h-10 w-[200px] flex-row mt-10"
      }`}
    >
      <Plus />
      {label}
    </div>
  );
};

export default PagesList