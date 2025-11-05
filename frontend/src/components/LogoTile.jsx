
export const LogoTile = ({scale = '100', showLogo = true, size = 20, color='white'}) => {
  const itSize = size - 5;
  return (
    <div className={`scale-${scale} size-[${size}px] flex items-center justify-center border rounded-[4px] border-${color}/80`}>
      <div className={`size-[${itSize}px] flex items-center justify-center border rounded-[3px] text-${color}/80 border-${color}/80 text-[8.5px]`}>
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
