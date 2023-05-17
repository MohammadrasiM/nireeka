import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllBikes,
  getAllCountries,
  getShippingCostByCountryAndProduct,
} from "../../../app/api/general";
import WhiteShadowCard from "../cards/WhiteShadowCard";
import NireekaCombobox from "../inputs/NireekaCombobox";
import LoadingNireeka from "../LoadingNireeka";

export default function ShippingCostCalculatorModal(props) {
  // Country list fetched from server
  const [countryList, setCountryList] = useState(null);
  // Bike list fetched from server
  const [bikeList, setBikeList] = useState(null);
  // State indicating if country and bike lists are fetched
  const [isInitialDataLoading, setIsInitialDataLoading] = useState(true);

  // State holding selected country form list
  const [selectedCountry, setSelectedCountry] = useState(null);
  // State holding selected bike form list
  const [selectedBike, setSelectedBike] = useState(null);
  // State controlling the visibility of the loading component when user clicks submit
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  // State holding the result of shipping cost check
  const [shippingCostResult, setShippingCostResult] = useState(null);

  const getInitialData = useCallback(async () => {
    try {
      setIsInitialDataLoading(true);
      const responseAll = await Promise.all([getAllCountries(), getAllBikes()]);

      const countriesResponse = responseAll[0];
      const bikesResponse = responseAll[1];

      // Initializing select inputs
      setSelectedBike(bikesResponse.data[0]);
      setSelectedCountry(countriesResponse.data[0]);

      setCountryList(countriesResponse.data);
      setBikeList(bikesResponse.data);
    } catch (error) {
      // toast.error(
      //   "Sorry we couldn't fetch the data from our servers. Try again later."
      // );
      if (props.onClose) {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        props.onClose();
      }
    } finally {
      setIsInitialDataLoading(false);
    }
  }, []);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const handleSubmitForm = async () => {
    if (!selectedCountry || !selectedBike) return;

    try {
      setIsSubmitLoading(true);
      const response = await getShippingCostByCountryAndProduct(
        selectedCountry.id,
        selectedBike.id
      );
      setShippingCostResult(response.data);
    } catch (error) {
      console.log("Error in message field:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Sorry, we couldn't check. Try again later.");
      }
      setShippingCostResult(null);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  if (isInitialDataLoading)
    return (
      <WhiteShadowCard>
        <div className="flex justify-center">
          <LoadingNireeka className="w-9 h-9 border-gray-700" />
        </div>
      </WhiteShadowCard>
    );

  return (
    <WhiteShadowCard>
      <h3 className="pb-8 text-2xl font-light text-center">
        Shipping Cost Calculator
      </h3>
      <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-x-4 md:space-y-0 font-light">
        <div className="md:w-1/2">
          <label htmlFor="product">Product:</label>
          <NireekaCombobox
            list={bikeList}
            onSelect={(bike) => setSelectedBike(bike)}
            defaultSelected={selectedBike}
          />
        </div>

        <div className="md:w-1/2">
          <label htmlFor="country">Country:</label>
          <NireekaCombobox
            list={countryList}
            onSelect={(country) => setSelectedCountry(country)}
            defaultSelected={selectedCountry}
          />
        </div>
      </div>
      <div className="w-full mx-auto flex mt-4 justify-center text-center">
        <button
          onClick={handleSubmitForm}
          className="bg-customColorNIR text-white w-full py-1.5 border font-light border-gray-300 rounded-md focus:outline-none hover:ring-customColorNIR hover:border-customColorNIR hover:text-customColorNIR hover:bg-white transition-all"
        >
          Check
        </button>
      </div>
      {isSubmitLoading ? (
        <div className="flex justify-center py-8">
          <LoadingNireeka className="w-10 h-10 border-gray-800" />
        </div>
      ) : (
        !!shippingCostResult && (
          <div className="mx-auto flex py-2 px-1.5 justify-center flex-col text-center mt-7">
            <div>
              <h6 className="py-2 text-gray-600">
                Product:{" "}
                <span className="text-gray-600 font-light">
                  {shippingCostResult.product.title}{" "}
                </span>
                <span className="text-green-500 font-light">
                  {shippingCostResult.product.price}
                </span>
              </h6>
            </div>
            {!!shippingCostResult.country && (
              <div>
                <h6 className="py-2 text-gray-600">
                  Country:{" "}
                  <span className="text-gray-600 font-light">
                    {shippingCostResult.country}
                  </span>
                </h6>
              </div>
            )}
            {!!shippingCostResult.courier && (
              <div>
                <h6 className="py-2 text-gray-600">
                  Courier:{" "}
                  <span className="text-gray-600 font-light">
                    {shippingCostResult.courier}
                  </span>
                </h6>
              </div>
            )}
            {!!shippingCostResult.shipping_cost && (
              <div>
                <h6 className="py-2 text-gray-600">
                  Shipping Cost:{" "}
                  <span className="text-gray-600 font-light">
                    {shippingCostResult.shipping_cost}
                  </span>
                </h6>
              </div>
            )}
            {!!shippingCostResult.vat && (
              <div>
                <h6 className="py-2 text-gray-600">
                  VAT/Duties*:{" "}
                  <span className="text-gray-600 font-light">
                    {shippingCostResult.vat}
                  </span>
                </h6>
              </div>
            )}
            <div className="mt-8">
              <p className="text-sm font-light text-gray-600 ">
                {`* If %0, you may be charged by your customs for
                  Tax & duties. Please check with the authorities. The US and
                  EU customers don't need to pay any additional VAT. The fees
                  will be covered by Nireeka.`}
              </p>
            </div>
          </div>
        )
      )}
    </WhiteShadowCard>
  );
}
