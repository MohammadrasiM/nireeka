import PrimaryButton from "@/components/Atoms/buttons/PrimaryButton";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import BikeInstance from "@/components/comparator/BikeInstance";
import ComparisonIcon from "@/components/svg/ComparisonIcon";
import { setBikes } from "app/store/comparisonSlice";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useComparator } from "services/comparator";
import CustomHead from "@/components/seo/CustomHead";

const ComparePage = () => {
  const dispatch = useDispatch();

  const { comparator } = useComparator();

  const [upgradeTableMap, setUpgradeTableMap] = useState(null);
  const comparisonBikes = useSelector(state => state?.comparison.bikes);
  const [isReadQueryLoading, setIsReadQueryLoading] = useState(true);

  const fetchBikes = useCallback(async () => {
    setIsReadQueryLoading(true);
    const bikes = await comparator.getBikes();
    dispatch(setBikes(bikes));
    setIsReadQueryLoading(false);
  }, [dispatch, comparator]);

  useEffect(() => {
    if (!comparator) return;

    fetchBikes();
  }, [comparator, fetchBikes]);

  useEffect(() => {
    if (!comparisonBikes) return;

    let mapToSet = new Map();

    comparisonBikes?.forEach((bike) => {
      bike?.upgrades?.forEach((upgrade) => {
        if(upgrade.category?.title || upgrade?.title) {
          const bikesUpgradeCategory = mapToSet.get(upgrade.category?.category || upgrade?.category);
          if (bikesUpgradeCategory) {
            bikesUpgradeCategory[bike.db_id] = upgrade;
          } else mapToSet.set(upgrade.category?.category || upgrade?.category, { [bike.db_id]: upgrade });
        }
      });
    });

    mapToSet = new Map([...mapToSet].sort((a, b) => a[0] - b[0]));

    setUpgradeTableMap(mapToSet);
  }, [comparisonBikes]);

  return (
    <>
      <CustomHead title="Compare" />
      {isReadQueryLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <LoadingNireeka className="w-10 h-10 border-gray-700" />
        </div>
      ) : !!comparisonBikes && comparisonBikes.length > 0 ? (
        <div className="overflow-auto px-2 my-28">
          <table className="mx-auto">
            <thead>
              <tr>
                <th></th>
                {!!comparisonBikes &&
                  comparisonBikes?.map((bike, index) => (
                    <BikeInstance
                      key={index}
                      bike={bike}
                      fetchBikes={fetchBikes}
                    />
                  ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {!!upgradeTableMap &&
                Array.from(upgradeTableMap.keys()).map((categoryPartId) => {
                  const upgrades = upgradeTableMap.get(categoryPartId);
                  return (
                    <tr key={categoryPartId}>
                      <td className="py-2 md:pr-4">
                        <span className="font-medium text-sm md:text-base">
                          {upgrades[Object.keys(upgrades)[0]].category.category || upgrades[Object.keys(upgrades)[0]].category}
                        </span>
                      </td>
                      {comparisonBikes.map((bike) => (
                        <td key={"bikespec-" + categoryPartId + "-" + bike.db_id} className="py-1 md:py-2 px-2 md:px-4 last:pr-0 min-w-[10rem]">
                          <span className="font-light text-sm md:text-base">
                            {typeof upgrades[bike.db_id] === "undefined"
                              ? "-"
                              : upgrades[bike.db_id].title}
                            {!!upgrades[bike.db_id] && !!upgrades[bike.db_id].price && (
                              <span className="text-gray-600">
                                {" "}
                                (${upgrades[bike.db_id].price})
                              </span>
                            )}
                          </span>
                        </td>
                      ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="my-32 md:-my-16 px-5 md:px-10 md:min-h-screen flex flex-col items-center justify-center">
          <ComparisonIcon className="w-20 h-20 mb-5 md:mb-10" fill="#333333" />
          <span className="md:text-xl text-center">You haven&apos;t selected any bikes for comparison.</span>
          {/* <span className="md:text-xl text-center">
            Try building your custom E-bike and then add it to comparison.
          </span> */}
          <span className="md:text-xl text-center">
            Try building your custom E-bike and then add it to comparison.
          </span>
          <PrimaryButton className="mt-5 md:mt-10" href="/configurator">
            Go to Configurator
          </PrimaryButton>
        </div>
      )}
    </>
  );
};

export default ComparePage;
