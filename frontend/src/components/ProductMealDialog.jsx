import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { formatNumber } from "../utils/formats";

const ProductMealDialog = ({ open, onClose, item }) => {
  // item shape:
  // {
  //   id, title, subtitle, image, price, currency, tags: [],
  //   description, calories, carbs, protein, fat, variants: [{id,name,price}],
  // }

  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQty(1);
      setSelectedVariant(item?.variants?.[0] ?? null);
      // lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => (document.body.style.overflow = "");
  }, [open, item]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
      if (!open) return;
      if (e.key === "ArrowUp") setQty((q) => Math.min(q + 1, 99));
      if (e.key === "ArrowDown") setQty((q) => Math.max(q - 1, 1));
    }
    // window.addEventListener("keydown", onKey);
    // return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!item) return null;

  const priceFor = (variant) =>
    ((variant?.price ?? item.price) * qty).toFixed(2);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-hidden={!open}
        >
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* dialog panel */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${item.name} details`}
            initial={{ y: 30, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-3xl w-full mx-auto rounded-2xl bg-gradient-to-b from-white/80 to-white/60 dark:from-slate-900/80 dark:to-slate-900/60 shadow-2xl border border-white/30 dark:border-slate-700 backdrop-blur-md max-h-screen overflow-auto custom-scrollbar"
          >
            <div className="flex flex-col sm:flex-row w-full gap-6 p-6">
              {/* Image + tags */}
              <div className=" flex items-center justify-center w-full sm:w-[80%]">
                <div className="relative w-full max-w-[360px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 md:h-72 object-cover rounded-xl shadow-lg"
                  />

                  {/* tags */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {(item.tags || []).slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-xs font-semibold px-2 py-1 rounded-full bg-white/80 dark:bg-black/60 shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex w-full flex-col gap-3">
                {/* Title  subtitle price */}
                <div className="flex items-start justify-between gap-4">
                  {/* title */}
                  <div>
                    <h3 className="text-xl sm:text-2xl w-full font-extrabold leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* price */}
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      ₦{formatNumber(priceFor(selectedVariant))}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {selectedVariant?.name ?? "Standard"}
                    </div>
                  </div>
                </div>

                {/* variants //// quantity */}
                <div className="flex gap-3 flex-wrap py-1.5">
                  {/* variants */}
                  {(item.variants || []).length > 0 && (
                    <fieldset className="flex items-center gap-2">
                      <legend className="sr-only">Variants</legend>
                      {(item.variants || []).map((v) => (
                        <label
                          key={v.id}
                          className={`px-3 py-1 rounded-full border cursor-pointer text-sm ${
                            selectedVariant?.id === v.id
                              ? "bg-sky-600 text-white border-sky-600"
                              : "bg-white/60 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-white/20"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`variant-${item.id}`}
                            value={v.id}
                            checked={selectedVariant?.id === v.id}
                            onChange={() => setSelectedVariant(v)}
                            className="hidden"
                          />
                          {v.name}
                        </label>
                      ))}
                    </fieldset>
                  )}

                  {/* Quantity */}
                  {/* <div className="ml-auto flex items-center gap-2">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-lg border flex items-center justify-center text-lg"
                    >
                      −
                    </button>
                    <div className="w-12 text-center font-medium">{qty}</div>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => setQty((q) => Math.min(99, q + 1))}
                      className="w-9 h-9 rounded-lg border flex items-center justify-center text-lg"
                    >
                      +
                    </button>
                  </div> */}
                </div>

                {/* description */}
                <div className="prose max-w-none text-slate-700 dark:text-slate-200">
                  <p>{item.description}</p>
                </div>

                {/* ingredients */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 w-full items-center">
                    {item.ingredients &&
                      item.ingredients.split(",").map((ing, i) => (
                        <div key={i} className="text-sm">
                          • {ing}
                        </div>
                      ))}
                  </div>
                </div>

                {/* prep time */}
                {item.prepTime && (
                  <div className="mt-2 text-xs text-slate-300">
                    Prep time: {item.prepTime || ""}
                  </div>
                )}
              </div>
            </div>

            {/* close button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-1.5 top-1.5 rounded-full p-1 text-slate-700 hover:bg-white/60 dark:text-slate-200 transition"
            >
              <X className="size-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const meal = {
  id: "meal-1",
  name: "Crispy Avocado Bowl",
  subtitle: "Vegan · Gluten-free",
  image: "/products/Juice-Be-Radiant-web.jpg",
  price: 9000,
  tags: ["Healthy", "Chef's pick", "Low-carb"],
  description:
    "A delicious bowl of roasted sweet potato, creamy avocado, quinoa and a tangy tahini drizzle. Perfect for lunch or dinner.",
  ingredients:
    "Chicken meat, Low cab fatty oil, Soy Sauce, Bead & wine, vegetable oil",
  prepTime: "15m",
  variants: [
    { id: "v1", name: "Regular", price: 14000 },
    { id: "v2", name: "Large", price: 23500 },
  ],
};

export default ProductMealDialog;
