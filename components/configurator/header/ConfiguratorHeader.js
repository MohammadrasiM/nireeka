
const ConfiguratorHeader = ({children}) => {

  return (
      <div className="w-full relative after:content-[''] after:w-full after:absolute after:h-1/2 after:bg-gradient-to-b after:from-transparent after:to-white after:bottom-[22%]">
        <h2 className="font-Impact text-[19vw] md:text-[12vw] lg:text-[10vw] text-grayLight text-center uppercase">
            {children}
        </h2>
      </div>
  );
};

export default ConfiguratorHeader;
