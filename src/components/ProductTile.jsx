import { formatNumber } from "../utils/formats";

const ProductTile = ({ product, showPrice = true }) => {
  return (
    <div className="">
      <div class="bg-white h-[130px] lg:h-[150px] relative rounded shadow hover:shadow-md transition">
        <img
          src={product.img}
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
};

export default ProductTile;
