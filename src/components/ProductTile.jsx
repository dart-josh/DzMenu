import { formatNumber } from "../utils/formats";

const ProductTile = ({ product, showPrice = true, listType }) => {
  if (listType == "grid")
    return (
      <div className="">
        <div class="bg-white/70 h-[130px] lg:h-[150px] relative rounded shadow hover:shadow-md transition">
          <img
            src={product.img ? product.img : '/no-image.png'}
            alt="Juice"
            class="w-full h-full object-cover rounded"
          />
          <div className="absolute inset-0 bg-black/20 rounded z-30"></div>
          <div class="px-2 absolute bottom-0 left-0 z-40 w-full py-1">
            <h3 class="text-white font-semibold text-sm line-clamp-2 w-full text-shadow-lg">
              {product.name}
            </h3>
          </div>
          {showPrice && (
            <div className="absolute top-1 right-1 font-semibold bg-teal-500/70 rounded-xl px-1.5">
              <p class="text-white text-[12px] leading-4">
                ₦{formatNumber(product.price)}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  else
    return (
      <div class="w-full flex items-center">
        <div className="relative size-12 shadow hover:shadow-md transition cursor-pointer">
          <img
            src={product.img ? product.img : '/no-image.png'}
            alt="Juice"
            class="w-full h-full object-cover rounded"
          />
          <div className="absolute inset-0 bg-black/10 rounded z-30"></div>
        </div>

        <div className="flex items-center h-11 px-2 rounded-r-lg w-full gap-3 bg-white dark:bg-slate-700 justify-between">
          <h3 class="text-white font-semibold text-sm line-clamp-2 text-ellipsis w-ful text-shadow-lg leading-5">
            {product.name}
          </h3>

          {showPrice && (
            <div className="font-semibold bg-teal-500/70 rounded-xl px-1.5">
              <p class="text-white text-[12px] leading-4">
                ₦{formatNumber(product.price)}
              </p>
            </div>
          )}
        </div>
      </div>
    );
};

export default ProductTile;
