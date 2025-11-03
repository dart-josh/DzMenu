import { Plus } from "lucide-react";

const ProductsPage = () => {
  return (
    <div className="w-full py-10">
      {/* categories */}
      <div className="flex gap-5 overflow-x-auto pb-4 w-full">
        {["Smoothies", "Juice", "Whole foods", "Groceries", "Smoothies", "Juice", 'Bread'].map(
          (category, i) => (
            <div key={i}>
              <CategoryTile category={category} />
            </div>
          )
        )}
      </div>
      <div className="font-semibold text-2xl text-black/80 mt-3 mb-3">
        Products
      </div>

      <div className="w-full rounded-lg h-fit bg-white/70 px-6 py-6">
        <div className="grid grid-cols-2 w-full pb-4 gap-6">
          {(true &&
            [1, 2, 3, 4, 5, 6, 7, 8].map((page, i) => (
              <div
                key={i}
                className="min-w-[100px] bg-neutral-600/60 rounded-sm h-[40px]"
              ></div>
            ))) || <AddNewButton empty={true} />}
        </div>

        {true && <AddNewButton label={"Add product"} />}
      </div>
    </div>
  );
};

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

const CategoryTile = ({ category }) => {
  return (
    <div className="rounded px-4 py-1 flex items-center bg-white shadow-sm text-black/80 min-w-[130px] text-center justify-center">
      {category}
    </div>
  );
};

export default ProductsPage;
