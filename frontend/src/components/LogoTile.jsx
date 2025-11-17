
export const LogoTile = ({scale = '100', showLogo = true, color = 'light'}) => {
  return (
    <div className={`scale-${scale} size-5 flex items-center justify-center border rounded-[4px] ${color == 'light' ? 'border-white/80' : 'border-black/80'}`}>
      <div className={`size-3.5 flex items-center justify-center border rounded-[3px] ${color == 'light' ? 'text-white/80 border-white/80' : 'text-black/80 border-black/80'}  text-[8.5px]`}>
        {showLogo && 'Dz'}
      </div>
    </div>
  );
};

export const LogoTileLarge = ({showLogo = true}) => {
  
  return (
    <div className={`shadow-lg size-7 flex items-center justify-center border rounded-[6px] border-black/80`}>
      <div className={`shadow size-5.5 flex items-center justify-center border rounded-[5px] text-black/80 border-black/80 font-semibold text-[11px]`}>
        {showLogo && 'Dz'}
      </div>
    </div>
  );
};
