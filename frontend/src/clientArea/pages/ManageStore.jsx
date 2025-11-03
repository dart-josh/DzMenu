import {
  Cog,
  Copy,
  Edit,
  Eye,
  Link2,
  Plus,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ManageStore = () => {
  const { storeId } = useParams();

  useEffect(() => {
    // alert(storeId);
  }, [storeId]);

  return (
    <div className="w-full py-10">
      <StoreDetails />
      <Pages />
      <Products />
      <StoreSettings />
      <DeleteZone />
    </div>
  );
};

const StoreDetails = () => {
  return (
    <div className="pt-5">
      <div className="w-full fle lex-col rounded-lg h-fit bg-white/70 px-6 py-6">
        <div className="rounded-lg p-6 w-full transition shadow-sm bg-teal-200/80 flex flex-col max-w-[350px] text-black/80 text-sm">
          {/* store id */}
          <div className="flex gap-1 items-center px-2 bg-gray-400/80 rounded-full w-fit text-[13px]">
            <div className="text-gray-700/80">ID:</div>
            <div className="font-semibold">delightsome_143</div>
            <div className="ml-1">
              <Copy className="size-3.5" />
            </div>
          </div>

          {/* name */}
          <div className="text-2xl mt-2 font-semibold">
            Dellightsome Juice, smoothies & whole foods
          </div>

          {/* created date */}
          <div>
            <div className="text-gray-700/80 italic mt-6">
              Opened since July 2025
            </div>
          </div>
        </div>

        <StoreLink />
      </div>
    </div>
  );
};

const StoreLink = () => {
  return (
    <div className="flex mt-5 cursor-pointer rounded-full font-semibold items-center bg-white shadow-sm h-7 text-sm w-fit min-w-[200px] text-black/80 gap-3 px-4">
      <Link2 className="size-4" />
      <div className="text-green-800/80">delightsome_123</div>
      <Copy className="size-4" />
      <div className="flex items-center gap-1">
        <Eye className="size-4 mt-0.5" />
        <div className="">Live</div>
      </div>
    </div>
  );
};

const Pages = () => {
  return (
    <div className="pt-5">
      <div className="font-semibold text-2xl text-black/80 mt-3 mb-3">
        Pages
      </div>
      <div className="w-full rounded-lg h-fit bg-white/70 px-6 py-6">
        <div className="flex w-full overflow-x-auto pb-4 gap-6">
          {(true &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((page, i) => (
              <div
                key={i}
                className="min-w-[100px] bg-neutral-600/60 rounded-lg h-[100px]"
              ></div>
            ))) || <AddNewButton empty={true} label={"Add new page"} />}
        </div>

        {true && <AddNewButton label={"Add new page"} />}
      </div>
    </div>
  );
};

const Products = () => {
  return (
    <div className="pt-5">
      <div className="font-semibold text-2xl text-black/80 mt-3 mb-3">
        Products
      </div>
      <div className="w-full fle lex-col rounded-lg h-fit bg-white/70 px-6 py-6">
        <div className="grid grid-cols-2 w-full overflow-x-auto pb-4 gap-6">
          {(true &&
            [1, 2, 3, 4, 5, 6, 7, 8].map((page, i) => (
              <div
                key={i}
                className="min-w-[100px] bg-neutral-600/60 rounded-sm h-[40px]"
              ></div>
            ))) || <AddNewButton empty={true} />}
        </div>

        {true && <Link to={'/client/products'} className="w-ful flex justify-end text-black/70 underline italic">
          view more
          </Link>}

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

const StoreSettings = () => {
  return (
    <div className="pt-5">
      <div className="flex items-center gap-3 font-semibold text-2xl text-black/80 mt-3 mb-5 pb-2 border-b-2 border-gray-800/50">
        <Cog />
        Store settings
      </div>

      {/* edit */}
      <div className="mb-3 max-w-[400px] text-black/70 text-sm">
        Use this section to update your store’s details such as name,
        description, and status. Don’t forget to save your changes when you’re
        done.
      </div>
      <div className="flex items-center gap-3 font-semibold text-xl text-white/80 bg-neutral-700/80 rounded w-fit px-3 py-2 pr-10">
        <Edit />
        Edit Store details
      </div>
    </div>
  );
};

const DeleteZone = () => {
  return (
    <div className="pt-5">
      <div className="flex items-center gap-3 font-semibold text-2xl text-red-700/80 mt-3 mb-5 pb-2 border-b-2 border-red-800/50">
        <TriangleAlert />
        Danger zone
      </div>

      {/* edit */}
      <div className="mb-3 max-w-[400px] text-black/70 text-sm">
        Deleting this store is permanent. All associated pages, products, and
        data will be removed and cannot be recovered.
      </div>
      <div className="flex items-center gap-3 font-semibold text-xl text-white/90 bg-red-600/90 rounded w-fit px-3 py-2 pr-10">
        <Trash2 />
        Delete store
      </div>
    </div>
  );
};

export default ManageStore;
