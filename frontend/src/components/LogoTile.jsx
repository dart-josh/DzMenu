
export const LogoTile = ({scale = '100', showLogo = true}) => {
  return (
    <div className={`scale-${scale} size-5 flex items-center justify-center border rounded-[4px] border-white/80`}>
      <div className="size-[15px] flex items-center justify-center border rounded-[3px] border-white/80 text-[8.5px]">
        {showLogo && 'Dz'}
      </div>
    </div>
  );
};
