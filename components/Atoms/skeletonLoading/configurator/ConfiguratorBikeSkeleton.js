import range from 'lodash/range'

const ConfiguratorBikeSkeleton = ({className}) => {
  return (
    <div className="w-full my-5 flex flex-wrap justify-center">
      {range(6)?.map((index) => (
          <div key={index} className={className}>
            <div className="animate-pulse flex flex-col">
              <div className="rounded w-full  h-64 bg-gray-200"></div>
              <div className="my-2 w-5/12 mx-auto h-4 bg-gray-200 rounded"></div>
              <div className="my-2 w-full w-3/6 mx-auto h-3 bg-gray-200 rounded"></div>
              <div className="my-2 w-4/6 mx-auto h-5 bg-gray-200 rounded"></div>
            </div>
          </div>
      ))}
    </div>
  );
};

export default ConfiguratorBikeSkeleton;
