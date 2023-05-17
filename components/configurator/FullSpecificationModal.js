import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import WhiteShadowCard from "../Atoms/cards/WhiteShadowCard";
import ModalPartInfo from "../Atoms/modals/ModalPartInfo";
import BlurBackdrop from "../Atoms/overlays/BlurBackdrop";

export default function FullSpecificationModal(props) {
  const [visibleInfoModalProductId, setVisibleInfoModalProductId] = useState(null);
  const selectedParts = useSelector((state) => state.configurator.selectedParts);

  const selectedMultipleParts = useSelector((state) => state.configurator.selectedMultipleParts);

  const configuratorData = useSelector((state) => state.configurator.configuratorData);

  return (
    <WhiteShadowCard className="space-y-12">
      <div>
        <p className="text-2xl mb-3">Specifications</p>
        <div className="mt-4">
          {Object.keys(selectedParts).map((categoryPartId) => {
            let categoryTitle = "";
            for (let i = 0; i < configuratorData.parts.length; i++) {
              //debugger;
              if (+configuratorData.parts[i].category_part_id === +categoryPartId) {
                categoryTitle = configuratorData.parts[i].category.category;
                //debugger;
                break;
              }
            }

            return (
              <Fragment key={`${categoryPartId}-${selectedParts[categoryPartId].title}`}>
                <div
                  className="border-b py-2 last:border-b-0 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setVisibleInfoModalProductId(selectedParts[categoryPartId].id)}
                >
                  <p className="flex">
                    <span className="capitalize flex-1 text-sm">{categoryTitle}</span>

                    <span className="text-gray-700 flex-1 text-sm">{selectedParts[categoryPartId].title}</span>

                    <span className="text-gray-700 flex-1 text-sm">
                      {!!selectedParts[categoryPartId].price && "+$" + selectedParts[categoryPartId].price}
                    </span>
                  </p>
                </div>
                <BlurBackdrop
                  onClick={(e) => e.stopPropagation()}
                  isVisible={selectedParts[categoryPartId].id === visibleInfoModalProductId}
                  onClose={() => setVisibleInfoModalProductId(null)}
                  backdropColorClass="bg-black/40"
                  className="w-full md:w-[55rem] min-w-[70%]"
                >
                  <ModalPartInfo part={selectedParts[categoryPartId]} />
                </BlurBackdrop>
              </Fragment>
            );
          })}
        </div>
        {/* configuratorData.product.specs.map */}
        {configuratorData.product.specs.map((item) => (
          // item .key
          <div key={item.title} className="border-b border-t border-gray-400 py-2 last:border-b-0">
            <p className="flex">
              <span className="capitalize flex-1 text-sm">{item.title}</span>

              <span className="text-gray-700 flex-1 text-sm">{`${item.value} ${item.title_upper}`}</span>
              <span className="text-gray-700 flex-1 text-sm"></span>
            </p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-2xl mb-3">Certificates</p>
        <div className="mt-4 space-y-2">
          <p className="text-gray-700 flex-1 text-sm">
            Standard: EN ISO 12100:2010, EN 15194:2017, EN 60204-1:2006+A1:2009+AC:2010
          </p>
          <p className="text-gray-700 flex-1 text-sm">
            {
              "Related to CE Directive(s): 2006/42/EC (Machinery) 2014/35/EU (Low Voltage) 2014/30/EU (Electromagnetic Compatibility)"
            }
          </p>
        </div>
      </div>
    </WhiteShadowCard>
  );
}
