import {useEffect, useMemo, useRef, useState} from "react";
import {useSelector} from "react-redux";
import Scrollspy from 'react-scrollspy';
import classNames from 'functions/classNames'
import useEventListener from "hooks/useEventListener";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const mobileTabs = [
    {
      id: 'configuring',
      label: 'Configuring Bike'
  },
  {
      id: 'specifications',
      label: 'Specifications'
  }
]

const fullConfig = resolveConfig(tailwindConfig);
const mdScreenBreakPointInPixels = parseInt(fullConfig.theme.screens.md);

const ConfiguratorTab = ({activeID, onChange}) => {
  const container = useRef();
  const [containerPosition, setContainerPosition] = useState(null);
  const configuratorData = useSelector((state) => state?.configurator.configuratorData);

  const tabs = useMemo(() => [
    {
      id: 'overview',
      label: 'Overview'
    },
    {
      id: 'feature',
      label: 'Features',
      disabled: !configuratorData?.features?.items?.length
    },
    {
      id: 'gallery',
      label: 'Gallery',
      disabled: !configuratorData?.gallery?.length
    },
    {
      id: 'geometry',
      label: 'Geometry',
      disabled: !configuratorData?.geometry?.sizing_table?.length
    },
    {
      id: 'service',
      label: 'Service',
      disabled: !configuratorData?.topics?.items?.length
    },
    {
      id: 'review',
      label: 'Reviews',
      count: configuratorData?.count_reviews
    }
  ]?.filter((tab) => !tab?.disabled), [configuratorData])

  useEffect(() => {
    if(window.innerWidth < mdScreenBreakPointInPixels && container.current) {
      const containerRect = container?.current?.getBoundingClientRect();
      setTimeout(() => {
        const position = container.current?.offsetTop + containerRect.height;
        if( position !== containerPosition) setContainerPosition(position)
      }, 200)
    }
  }, [container.current])

  useEventListener(
      'scroll',
      (e) => {
        if ((window.pageYOffset) > containerPosition + 100) {
          container.current?.classList.add("sticky-performance");
        } else {
          container.current?.classList.remove("sticky-performance");
        }
      },
      undefined,
      !!containerPosition
  );

  return (
    <>
      {window.innerWidth >= mdScreenBreakPointInPixels ?
          (
              <Scrollspy
                  items={tabs?.map((tab) => tab?.id)}
                  offset={-100}
                  style={{gridTemplateColumns: `repeat(${tabs?.length}, minmax(0, 1fr))`}}
                  currentClassName="!text-gray-900 !font-semibold after:w-full"
                  className="xl:flex flex-col items-start xl:space-y-8 xl:pr-4 mt-8 hidden md:grid">
                {tabs?.map((tab) => (
                    <li
                        key={tab.id}
                        className="relative text-[.7rem] xs:text-xs sm:text-base font-light text-gray-400 text-center xl:text-left hover:text-gray-600 border-gray-900 cursor-pointer w-full after:content-[''] after:left-0 after:w-0 after:absolute after:-bottom-1 transition-all after:duration-300 after:border-b after:border-gray-900">
                      <a href={`#${tab?.id}`}>
                        {`${tab?.label} ${tab?.count ? `(${tab?.count})` : ''}`}
                      </a>
                    </li>
                ))}
              </Scrollspy>
          )
          : (
          <div className="block md:hidden left-0 right-0 top-0 w-full h-[50px]" ref={container}>
            <ul className="isolate flex divide-x divide-gray-200 rounded-lg shadow">
              {mobileTabs.map((tab, tabIdx) => (
                  <li
                      key={tab?.id}
                      onClick={() => onChange(tab?.id)}
                      className={classNames(tab?.id === activeID ? '!text-gray-900 after:!bg-indigo-500' : '',tabIdx === 0 ? 'rounded-l-lg' : '', tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '', 'py-4 px-4 text-center group relative min-w-0 flex-1 flex justify-center items-center overflow-hidden bg-white text-sm font-medium hover:bg-gray-50 focus:z-10 text-gray-500 hover:text-gray-700 cursor-pointer after:content-[""] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent')}>
                    {tab?.label}
                  </li>
              ))}
            </ul>
          </div>
      )}

    </>
  );
};

export default ConfiguratorTab;
