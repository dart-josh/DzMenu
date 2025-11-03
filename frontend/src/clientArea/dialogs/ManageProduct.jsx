import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash, X } from "lucide-react";
import { formatNumber } from "../../utils/formats";

const ManageProduct = ({ open, onClose, item }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) {
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
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!item) return null;

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
            className=""
          >
            <ProductDetail item={item} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProductDetail = ({item, onClose}) => {
  return (
    <div className="relative max-w-3xl w-full mx-auto rounded-2xl bg-gradient-to-b from-white/80 to-white/60 dark:from-slate-900/80 dark:to-slate-900/60 shadow-2xl border border-white/30 dark:border-slate-700 backdrop-blur-md max-h-screen overflow-auto custom-scrollbar">
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
          {/* Title subtitle price */}
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
                ₦{formatNumber(item.price)}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {item.variant ?? "Standard"}
              </div>
            </div>
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

      <div className="absolute right-1.5 top-1.5">
        <ActionButtons onClose={onClose} />
      </div>

      {/* close button */}
      {/* <button
        onClick={onClose}
        aria-label="Close dialog"
        className="absolute right-1.5 top-1.5 rounded-full p-1 text-slate-700 hover:bg-white/60 dark:text-slate-200 transition"
      >
        <X className="size-5" />
      </button> */}
    </div>
  );
};

const ActionButtons = ({onClose}) => {
    return <div className="flex items-center justify-end">
        {/* actions */}
        <div className="flex items-center justify-end">
            <Edit className="size-4.5"/>
            <Trash className="size-4.5"/>
        </div>

        <div>
            <X className="size-4.5"/>
        </div>
    </div>
}

export default ManageProduct;
