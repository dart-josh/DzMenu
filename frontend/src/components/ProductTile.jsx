// import { formatNumber } from "../utils/formats";

// const ProductTile = ({ product, showPrice = true, listType, setOpen, setActiveProductInfo }) => {
//   switch (listType) {
//     case "grid":
//       return <GridTile product={product} showPrice={showPrice} setOpen={setOpen} setActiveProductInfo={setActiveProductInfo} />;
//     case "list":
//       return <ListTile product={product} showPrice={showPrice} setOpen={setOpen} setActiveProductInfo={setActiveProductInfo}  />;

//     default:
//       return <GridTile product={product} showPrice={showPrice} setOpen={setOpen} setActiveProductInfo={setActiveProductInfo}  />;
//   }
// };

// const GridTile = ({ product, showPrice, setOpen, setActiveProductInfo }) => {
//   return (
//     <div className="" onClick={() => {
//       setActiveProductInfo(product);
//       setOpen(true);
//     }}>
//       <div className="bg-white/70 h-[130px] lg:h-[150px] relative rounded shadow hover:shadow-md transition cursor-pointer">
//         <img
//           src={product.image ? product.image : "/no-image.png"}
//           alt="Juice"
//           className="w-full h-full object-cover rounded"
//         />
//         <div className="absolute inset-0 bg-black/20 rounded z-30"></div>
//         <div className="px-2 absolute bottom-0 left-0 z-40 w-full py-1">
//           <h3 className="text-white font-semibold text-sm line-clamp-2 w-full text-shadow-lg">
//             {product.name}
//           </h3>
//         </div>
//         {showPrice && (
//           <div className="absolute top-1 right-1 font-semibold bg-teal-500/70 rounded-xl px-1.5">
//             <p className="text-white text-[12px] leading-4">
//               ₦{formatNumber(product.price)}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const ListTile = ({ product, showPrice, setOpen, setActiveProductInfo }) => {
//   return (
//     <div className="w-full flex items-center">
//       <div onClick={() => {
//         setActiveProductInfo(product);
//         setOpen(true);
//       }} className="relative size-12 shadow hover:shadow-md transition cursor-pointer">
//         <img
//           src={product.image ? product.image : "/no-image.png"}
//           alt="Juice"
//           className="w-full h-full object-cover rounded"
//         />
//         <div className="absolute inset-0 bg-black/10 rounded z-30"></div>
//       </div>

//       <div className="flex items-center h-11 px-2 rounded-r-lg w-full gap-3 bg-white dark:bg-slate-700 justify-between">
//         <h3 className="text-white font-semibold text-sm line-clamp-2 text-ellipsis w-ful text-shadow-lg leading-5">
//           {product.name}
//         </h3>

//         {showPrice && (
//           <div className="font-semibold bg-teal-500/70 rounded-xl px-1.5">
//             <p className="text-white text-[12px] leading-4">
//               ₦{formatNumber(product.price)}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductTile;



import { formatNumber } from "../utils/formats";

const ProductTile = ({ product, showPrice = true, listType, setOpen, setActiveProductInfo }) => {
  switch (listType) {
    case "grid":
      return <GridTile product={product} showPrice={showPrice} setOpen={setOpen} setActiveProductInfo={setActiveProductInfo} />;
    case "list":
      return <ListTile product={product} showPrice={showPrice} setOpen={setOpen} setActiveProductInfo={setActiveProductInfo} />;

    default:
      return <GridTile product={product} showPrice={showPrice} setOpen={setOpen} setActiveProductInfo={setActiveProductInfo} />;
  }
};

const GridTile = ({ product, showPrice, setOpen, setActiveProductInfo }) => {
  return (
    <div
      className="transition transform hover:scale-[1.02] active:scale-[0.98]"
      onClick={() => {
        setActiveProductInfo(product);
        setOpen(true);
      }}
    >
      <div
        className="
          relative h-[130px] lg:h-[150px] rounded-xl overflow-hidden cursor-pointer
          bg-white/60 dark:bg-white/10
          backdrop-blur-xl
          border border-white/40 dark:border-white/10
          shadow-[0_4px_12px_rgba(0,0,0,0.08)]
          hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
        "
      >
        <img
          src={product.image ? product.image : "/no-image.png"}
          alt="Juice"
          className="w-full h-full object-cover rounded-xl"
        />

        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] rounded-xl"></div>

        <div className="absolute bottom-0 left-0 z-40 w-full px-2 py-1 bg-gradient-to-t from-black/60 to-transparent rounded-b-xl">
          <h3 className="text-white font-semibold text-sm line-clamp-2 w-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            {product.name}
          </h3>
        </div>

        {showPrice && (
          <div
            className="
              absolute top-1 right-1 
              bg-blue-500/80 backdrop-blur-md
              border border-white/20 
              rounded-xl px-2 py-[2px]
              shadow-md
            "
          >
            <p className="text-white font-semibold text-[12px] leading-4">
              ₦{formatNumber(product.price)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ListTile = ({ product, showPrice, setOpen, setActiveProductInfo }) => {
  return (
    <div className="w-full flex items-center gap-3">
      <div
        onClick={() => {
          setActiveProductInfo(product);
          setOpen(true);
        }}
        className="
          relative size-12 rounded-lg overflow-hidden cursor-pointer
          bg-white/60 dark:bg-white/10 
          backdrop-blur-xl
          border border-white/30 dark:border-white/10 
          shadow-md hover:shadow-lg
          transition active:scale-95
        "
      >
        <img
          src={product.image ? product.image : "/no-image.png"}
          alt="Juice"
          className="w-full h-full object-cover rounded-lg"
        />

        <div className="absolute inset-0 bg-black/15 rounded-lg"></div>
      </div>

      <div
        className="
          flex items-center justify-between flex-1 h-12 px-3 rounded-xl
          bg-white/70 dark:bg-zinc-800/40 
          backdrop-blur-xl 
          border border-white/40 dark:border-white/10
          shadow-[0_4px_12px_rgba(0,0,0,0.08)]
        "
      >
        <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-sm line-clamp-2 leading-5">
          {product.name}
        </h3>

        {showPrice && (
          <div
            className="
              bg-blue-500/80 backdrop-blur-md 
              border border-white/20
              rounded-xl px-2 shadow-md
            "
          >
            <p className="text-white text-[12px] leading-4 font-semibold">
              ₦{formatNumber(product.price)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTile;