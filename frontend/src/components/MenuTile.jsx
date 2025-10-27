import { formatNumber } from "../utils/formats";

const MenuTile = ({
  item,
  showPrice = true,
  listType,
  setOpen,
  setActiveMealInfo,
}) => {
  switch (listType) {
    case "grid":
      return (
        <GridTileType
          item={item}
          showPrice={showPrice}
          setOpen={setOpen}
          setActiveMealInfo={setActiveMealInfo}
        />
      );
    case "list":
      return (
        <ListTileType
          item={item}
          showPrice={showPrice}
          setOpen={setOpen}
          setActiveMealInfo={setActiveMealInfo}
        />
      );
    case "menu":
      return (
        <MenuTileType
          item={item}
          showPrice={showPrice}
          setOpen={setOpen}
          setActiveMealInfo={setActiveMealInfo}
        />
      );

    default:
      return (
        <MenuTileType
          item={item}
          showPrice={showPrice}
          setOpen={setOpen}
          setActiveMealInfo={setActiveMealInfo}
        />
      );
  }
};

const MenuTileType = ({ item, showPrice, setOpen, setActiveMealInfo }) => {
  return (
    <div
      className="hover:shadow-lg transition cursor-pointer"
      onClick={() => {
        setActiveMealInfo(item);
        setOpen(true);
      }}
    >
      {/* Image */}
      <div className="h-[130px] relative">
        <img
          src={item.image ? item.image : "/no-image.png"}
          alt="Juice"
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute inset-0 bg-black/20 rounded z-30"></div>

        {showPrice && (
          <div className="absolute bottom-2 right-2 bg-gray-500/70 rounded-sm px-2.5 border border-gray-900 py-0.5 flex items-center font-semibold text-sm leading-4">
            ₦{formatNumber(item.price)}
          </div>
        )}
      </div>

      <div className="w-full py-2 flex items-end max-h-[85px]">
        <div className="w-full pr-2">
          <h3 className="text-white font-semibold text-sm line-clamp-2 w-full text-shadow-lg">
            {item.name}
          </h3>
          <div className="text-[12px] line-clamp-2 mt-1 leading-4 text-white/70">
            {item.description}
          </div>
        </div>
      </div>
    </div>
  );
};

const ListTileType = ({ item, showPrice, setOpen, setActiveMealInfo }) => {
  return (
    <div className="w-full flex items-center h-[120px] gap-2 py-3 px-3 sm:px-4 border-b border-gray-400/20 shadow">
      {/* details */}
      <div className="flex flex-col w-full gap-1">
        {/* name */}
        <h3 className="font-semibold text-sm line-clamp-2 text-ellipsis w-ful text-shadow-lg leading-5">
          {item.name}
        </h3>

        {/* description */}
        <div className="text-[12px] line-clamp-2 leading-4 text-white/70">
          {item.description}
        </div>

        {/* price */}
        {showPrice && (
          <div className="font-semibold pt-2">
            <p className="text-white text-[12px] leading-4">
              ₦{formatNumber(item.price)}
            </p>
          </div>
        )}
      </div>

      {/* image */}
      <div
        className="relative w-[70px] shadow hover:shadow-md transition cursor-pointer"
        onClick={() => {
          setActiveMealInfo(item);
          setOpen(true);
        }}
      >
        <img
          src={item.image ? item.image : "/no-image.png"}
          alt="Juice"
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute inset-0 bg-black/10 rounded z-30"></div>
      </div>
    </div>
  );
};

const GridTileType = ({ item, showPrice, setOpen, setActiveMealInfo }) => {
  return (
    <div
      className="transition flex flex-col w-full cursor-pointer"
      onClick={() => {
        setActiveMealInfo(item);
        setOpen(true);
      }}
    >
      {/* Image */}
      <div className="h-[100px] relative">
        <img
          src={item.image ? item.image : "/no-image.png"}
          alt="Juice"
          className="w-full h-full object-cover rounded-t"
        />
        <div className="absolute inset-0 bg-black/20 rounded-t z-30"></div>
      </div>

      {/* Info */}
      <div className="w-full py-2 bg-gray-700/60 rounded-b px-1.5 xs:px-2">
        <h3 className="h-[40px] font-semibold text-sm line-clamp-2 w-full text-shadow-lg">
          {item.name}
        </h3>
        {showPrice && (
          <div className="text-[12px] mt-2 line-clamp-2 leading-4 text-white/70">
            ₦{formatNumber(item.price)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuTile;
