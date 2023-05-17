import {useMemo, memo} from "react";
import classNames from "functions/classNames";

const ConfiguratorTabContent = ({currentActiveTab, activeID, children}) => {
  const isActive = useMemo(() => currentActiveTab === activeID, [currentActiveTab, activeID]);

  return (
    <section className={classNames("md:absolute left-0 right-0 transition-transform md:scale-75 duration-200 hidden md:block md:opacity-0 px-4 pb-8 pt-2 md:pt-8", isActive && "md:z-10 md:opacity-100 md:!scale-100 !block")}>
      {children}
    </section>
  );
};

export default memo(ConfiguratorTabContent);
