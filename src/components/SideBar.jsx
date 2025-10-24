import { Link } from "react-router-dom";
import { LogoTile } from "./LogoTile";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ open, setOpen, pages = [] }) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const randKey = Math.random().toString(36).substring(2, 10);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 transform transition-transform duration-500 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={() => setOpen(false)}
      >
        {/* close button */}
        <button
          onClick={() => setOpen(false)}
          className="text-white/70 transition absolute top-4 left-4 cursor-pointer hover:text-white"
        >
          {/* <X className="w-5 h-5" /> */}
          <LogoTile />
        </button>

        {/* Menu Items */}
        {/* <AnimatePresence mode="wait"> */}
        <motion.div
          key={`${randKey}-id`}
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col bg-transparent items-center justify-center h-full pl4 space-y-3"
        >
          {pages.map((item, i) => (
            <SidebarTile key={i} item={item} setOpen={setOpen} />
          ))}
        </motion.div>
        {/* </AnimatePresence> */}
      </div>
    </>
  );
};

const SidebarTile = ({ item, setOpen }) => {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.6, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.7, y: -10, transition: { duration: 0.25 } },
  };

  return (
    <motion.div
      variants={itemVariants}
      className="w-full flex items-center group"
    >
      <div className="ml-3 min-w-3.5 size-3.5 border border-white/40 rounded group-hover:border-white/80 transition"></div>
      <div className="w-5 h-[0.5px] bg-white/40 group-hover:bg-white/80 transition"></div>
      <Link
        to={item.link}
        key={item.link}
        className="text-white text-base px-3 w-full py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg hover:bg-white/10 transition cursor-pointer flex items-center justify-center border border-white/40 shadow-2x group-hover:border-white/50"
        onClick={() => setOpen(false)}
      >
        {item.label}
      </Link>
    </motion.div>
  );
};

export default Sidebar;
