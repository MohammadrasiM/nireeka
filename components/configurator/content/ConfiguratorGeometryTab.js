import {useSelector} from "react-redux";
import ConfiguratorHeader from "@/components/configurator/header/ConfiguratorHeader";
import React from "react";

const ConfiguratoyGeometryTab = () => {
    const configuratorData = useSelector((state) => state?.configurator.configuratorData);

    if(!configuratorData?.geometry?.sizing_table?.length) return null

  return (
      <section id="geometry" className="mt-[100px]">
          <ConfiguratorHeader>
              geometry
          </ConfiguratorHeader>
          <div className="px-6 lg:px-8">
              {!!configuratorData?.geometry?.photo && <img alt="geometryBike" className="select-none object-contain w-auto mx-auto" src={configuratorData?.geometry?.photo} />}
              {!!configuratorData?.geometry?.sizing_table?.length && (
                  <div className="flow-root">
                      <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                              <table className="min-w-full divide-y divide-gray-300 mt-8">
                                  <tbody className="divide-y divide-gray-200 bg-white">
                                  {configuratorData?.geometry?.sizing_table?.map((geometry, index) => (
                                      <tr key={geometry.title} className={index === 0 ? 'bg-gray-200' : undefined}>
                                          <td className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                              {geometry?.title}
                                          </td>
                                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{geometry?.column1}</td>
                                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{geometry?.column2}</td>
                                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{geometry?.column3}</td>
                                      </tr>
                                  ))}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      </section>
  );
};

export default ConfiguratoyGeometryTab;
