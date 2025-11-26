import { useState, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, X, Store, FileText, Package, TextSelect } from "lucide-react";
import { formatNumber } from "../../../utils/formats";
import { useEffect } from "react";

export default function AddonsDialog({
  open,
  onClose,
  billing,
  addons,
  onSave,
  currentAddons,
}) {
  const [selected, setSelected] = useState(
    currentAddons || {
      stores: 0,
      pages: 0,
      products: 0,
    }
  );

  const icons = {
    stores: Store,
    pages: FileText,
    products: Package,
  };

  const getMax = (id) => {
    switch (id) {
      case "stores":
        return 15;
      case "pages":
        return 25;
      case "products":
        return 25;

      default:
        return 0;
    }
  };

  const increment = (id) => {
    setSelected((prev) => ({
      ...prev,
      [id]: prev[id] >= getMax(id) ? prev[id] : prev[id] + 1,
    }));
  };

  const decrement = (id) => {
    setSelected((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  const clearSelection = () => {
    setSelected({
      stores: 0,
      pages: 0,
      products: 0,
    });
  };

  const getPrice = (addon) =>
    billing === "yearly" ? addon.yearlyPrice : addon.price;

  const totalPrice = useMemo(() => {
    return addons.reduce((sum, addon) => {
      const count = selected[addon.id];
      return sum + getPrice(addon) * count;
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, addons, billing]);

  useEffect(() => {
    if (currentAddons) setSelected(currentAddons);
  }, [currentAddons, open]);

  const formattedProducts = selected.products * 200;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dialog Box */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="bg-white/90 shadow-xl rounded-2xl w-[95%] max-w-sm p-5 pb-[125px] border border-white/40 
            backdrop-blur-xl relative"
          >
            {/* Close btn */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-white/80 border border-slate-200 
              rounded-full p-1 hover:bg-white"
            >
              <X className="size-4 text-slate-700" />
            </button>

            <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center">
              Add Extra Addons
            </h2>

            <div className="flex flex-col gap-3">
              {addons.map((addon) => {
                const Icon = icons[addon.id];
                const isProducts = addon.id === "products";
                return (
                  <div
                    key={addon.id}
                    className="flex items-center justify-between bg-white/70 border 
                    border-slate-200 rounded-xl p-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-600/10 rounded-xl p-2">
                        <Icon className="size-5 text-indigo-600" />
                      </div>

                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800">
                          {addon.label}
                        </span>
                        <span className="text-indigo-600 text-sm font-semibold">
                          {formatNumber(getPrice(addon), true)}/
                          {billing === "yearly" ? "yr" : "mo"}
                        </span>
                        {isProducts && selected.products > 0 && (
                          <span className="text-xs text-slate-500">
                            {formattedProducts} products selected
                          </span>
                        ) || isProducts && <span className="h-4"> </span>}
                      </div>
                    </div>

                    {/* Counter */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrement(addon.id)}
                        className="p-1.5 rounded-lg border bg-white text-slate-600 hover:bg-slate-100"
                      >
                        <Minus className="size-4" />
                      </button>

                      <span className="w-6 text-center font-semibold text-slate-700">
                        {selected[addon.id]}
                      </span>

                      <button
                        onClick={() => increment(addon.id)}
                        className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div onClick={clearSelection} className="flex justify-end mt-2 items-center gap-1 text-red-500 cursor-pointer hover:text-red-700 transition">
                <TextSelect className="size-5" />
                Clear Selection
            </div>

            {/* Bottom Price Container */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t 
            border-slate-200 p-4 rounded-b-2xl shadow-xl"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-slate-700 text-sm">Total</span>
                <span className="text-lg font-semibold text-indigo-600">
                  {formatNumber(totalPrice, true)}
                </span>
              </div>

              <button
                onClick={() =>
                  onSave({
                    ...selected,
                    products: formattedProducts, // return 200 * qty
                  })
                }
                className="w-full bg-indigo-600 text-white p-3 rounded-xl text-sm font-semibold 
                hover:bg-indigo-700"
              >
                Save Selection
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
