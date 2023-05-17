import {useSelector} from "react-redux";
import ConfiguratorCosts from "@/components/configurator/ConfiguratorCosts";
import ConfiguratorWarranty from "@/components/configurator/ConfiguratorWarranty";
import ConfiguratorFullSpecifications from "@/components/configurator/ConfiguratorFullSpecifications";
import ConfiguratorAddCompareButton from "@/components/configurator/ConfiguratorAddCompareButton";
import ConfiguratorPromoCodesOldSite from "@/components/configurator/promoCode/ConfiguratorPromoCodesOldSite";
import ConfiguratorParts from "@/components/configurator/customization/ConfiguratorParts";
import ConfiguratorStar from "@/components/configurator/ConfiguratorStar";

export default function ConfiguratorSidebar({className, onReview}) {
    const configuratorData = useSelector((state) => state?.configurator.configuratorData);
    const selectedSize = useSelector((state) => state?.configurator.selectedSize);
    const selectedUpgrades = useSelector((state) => state?.configurator.upgrades);
    const selectedColor = useSelector((state) => state?.configurator.selectedColor);


  return (
      <div className={className}>
          <div
              id="configuratorPanel"
              className="relative w-full px-2 sm:pr-6 lg:pr-6 pb-0 sm:pb-48 mt-[2px] shadow-y-scroll no-scrollbar sm:overflow-auto xl:overflow-visible">
              <div className="flex flex-col my-4">
                  {configuratorData.product.tag && (
                      <span className="text-[#bf4800]">
                        {configuratorData.product.tag}
                      </span>
                  )}
                  <div>
                      <span className="block text-3xl font-medium">Customize your</span>
                      <h2 className="inline text-3xl font-semibold capitalize">
                          {configuratorData.product.title.toLowerCase()}
                      </h2>
                      <span className="text-gray-700 pl-1">
                        {configuratorData.variation.name}
                      </span>
                  </div>
              </div>
              <ConfiguratorStar onReview={onReview}  />
              <ConfiguratorCosts />
              <div className="flex flex-col items-start bg-zinc-50 rounded-md rounded-t-none border border-t-0 border-gray-200 pt-12 px-6">
                  <span className="text-sm text-left text-gray-900 font-semibold border-t border-gray-200 w-full pt-6">Overview:</span>
                  <span className="flex flex-col space-y-1 font-light text-sm leading-loose" dangerouslySetInnerHTML={{
                      __html: configuratorData.product.description,
                  }}/>
                  <div className="space-y-4 pt-4 pb-8 w-full">
                      <ConfiguratorWarranty />
                      <ConfiguratorFullSpecifications />
                      <ConfiguratorAddCompareButton
                          configuratorData={configuratorData}
                          selectedColor={selectedColor}
                          selectedSize={selectedSize}
                          selectedUpgrades={selectedUpgrades}
                      />
                  </div>
              </div>
              {!!configuratorData.dynamic_codes &&
                  configuratorData.dynamic_codes.length > 0 && (
                      <ConfiguratorPromoCodesOldSite
                          codes={configuratorData.dynamic_codes}
                      />
                  )}
              <ConfiguratorParts steps={configuratorData.parts} />
          </div>
      </div>
  );
}
