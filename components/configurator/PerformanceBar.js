export default function PerformanceBar({ title, value, addedValue, maxValue }) {
  return (
    <div className="my-2 transition-all-children">
      <div className="-my-2">
        <span className="text-xs sm:text-sm font-light">{title}</span>
      </div>
      <div className="flex items-center w-full">
        <div className="relative flex flex-1 my-2 w-60 h-375 bg-gray-300 rounded-l-md rounded-r-md">
          <div className="absolute left-0 w-full h-full flex items-center">
            <div
              style={{ width: `${(value * 100) / maxValue}%` }}
              className={
                value === 10
                  ? "h-full bg-blue-400 rounded-l-md rounded-r-md"
                  : "h-full bg-blue-400 rounded-l-md"
              }
            ></div>
            {addedValue > 0 && <div className="w-125 h-3 bg-gray-400"></div>}
            <div
              style={{ width: `${(addedValue * 100) / maxValue}%` }}
              className="w-10 h-full bg-green-400 rounded-r-md"
            ></div>
          </div>
        </div>
        <div className="mx-2 w-5">
          <span className="text-lg sm:text-xl font-light">
            {value + addedValue}
          </span>
        </div>
      </div>
    </div>
  );
}
