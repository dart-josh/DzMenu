import { LogoTile } from "./LogoTile";

const Footer = () => {
  return (
    <div className="bottom-0 mt-10 mb-5 flex gap-1 items-center justify-center">
      <LogoTile />
      <div className="text-sm">
        Powered by <span className="font-bold">Dz Menu</span>
      </div>
    </div>
  );
};

export default Footer;