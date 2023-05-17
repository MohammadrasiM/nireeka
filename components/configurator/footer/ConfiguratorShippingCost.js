import EditAddressModal from "@/components/Dashboard/profile/EditAddressModal";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getShippingCostByCountryAndProduct } from "../../../app/api/general";
import classNames from "../../../functions/classNames";
import { commafy } from "../../../functions/numbers";
import LoadingNireeka from "../../Atoms/LoadingNireeka";
import ShippingCostCalculatorModal from "../../Atoms/modals/ShippingCostCalculatorModal";
import BlurBackdrop from "../../Atoms/overlays/BlurBackdrop";
import ShoppingBagIcon from "../../svg/ShoppingBagIcon";

function ConfiguratorShippingCost(props, ref) {
  const [isShippingCalculatorModalVisible, setShippingCalculatorModalVisible] = useState(false);
  const [isAddressEditModalVisible, setIsAddressEditModalVisible] = useState(false);
  const [isShippingCostLoading, setIsShippingCostLoading] = useState(false);
  const [shippingCost, setShippingCost] = useState(null);

  const initialUserAddress = useSelector((state) => state.configurator.configuratorData.address);
  const productId = useSelector((state) => state.configurator.configuratorData.product.id);

  const [userAddress, setUserAddress] = useState(initialUserAddress);

  const calculateLoggedInUserShippingCost = useCallback(async () => {
    if (!userAddress || !productId) return;
    try {
      setIsShippingCostLoading(true);
      const response = await getShippingCostByCountryAndProduct(+userAddress.country.id, productId);
      setShippingCost(response.data.shipping_cost);
    } catch (error) {
      setShippingCost(null);
    } finally {
      setIsShippingCostLoading(false);
    }
  }, [userAddress, productId]);

  const handleAddressEdit = (editedAddress) => {
    setUserAddress((prevAddress) => {
      return { id: prevAddress.id, ...editedAddress };
    });
  };

  useEffect(() => {
    calculateLoggedInUserShippingCost();
  }, [calculateLoggedInUserShippingCost]);

  return (
    <div ref={ref} className={classNames(props.className)}>
      <div className="pr-3">
        <ShoppingBagIcon className="w-6 h-6" fill="#444444" />
      </div>
      <div className="flex flex-col text-sm">
        <span className="flex items-center">
          <span>Shipping Cost: </span>
          {isShippingCostLoading && <LoadingNireeka className="w-4 h-4 border-gray-800 ml-2" />}
          {!!shippingCost && !isShippingCostLoading && (
            <span className="font-medium">&nbsp;{commafy(shippingCost)}</span>
          )}
        </span>
        {userAddress && (
          <span className="flex flex-col text-sm">
            <span>
              {!!userAddress.address ? userAddress.address : ""}
              {!!userAddress.city ? ", " + userAddress.city : ""}
              {!!userAddress.state ? ", " + userAddress.state : ""}
              {!!userAddress.unit ? ", # " + userAddress.unit : ""}
            </span>
            <span>
              {!!userAddress.zipcode ? userAddress.zipcode : ""}
              {!!userAddress.country && !!userAddress.country.title
                ? ", " + userAddress.country.title
                : ""}
            </span>
          </span>
        )}
        {!!userAddress ? (
          <span
            className="text-blue-600 text-xs hover:underline cursor-pointer"
            onClick={() => setIsAddressEditModalVisible(true)}
          >
            Edit
          </span>
        ) : (
          <span
            className="text-blue-600 text-sm hover:underline cursor-pointer"
            onClick={() => setShippingCalculatorModalVisible(true)}
          >
            Shipping cost calculator
          </span>
        )}
      </div>

      <BlurBackdrop
        isVisible={isShippingCalculatorModalVisible}
        onClose={() => setShippingCalculatorModalVisible(false)}
        backdropMode="dark"
        className="w-full md:w-[50rem]"
      >
        <ShippingCostCalculatorModal onClose={() => setShippingCalculatorModalVisible(false)} />
      </BlurBackdrop>

      {!!userAddress && (
        <BlurBackdrop
          isVisible={isAddressEditModalVisible}
          onClose={() => setIsAddressEditModalVisible(false)}
          backdropMode="dark"
          className="w-full md:w-[60%]"
        >
          <EditAddressModal
            addressId={userAddress.id}
            onClose={() => setIsAddressEditModalVisible(false)}
            onSuccess={handleAddressEdit}
          />
        </BlurBackdrop>
      )}
    </div>
  );
}

export default forwardRef(ConfiguratorShippingCost);
