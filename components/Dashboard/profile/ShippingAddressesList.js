import AddressListSkeleton from "@/components/Atoms/skeletonLoading/dashboard/AddressListSkeleton";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getShippingAddresses } from "../../../app/api/user/profile";
import classNames from "../../../functions/classNames";
import LoadingNireeka from "../../Atoms/LoadingNireeka";
import AddressEntryMenu from "./AddressEntryMenu";

const ShippingAddressesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState(null);

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const addressesRes = await getShippingAddresses();
      setAddresses(addressesRes.data);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  const tableHeader = ["Consignee", "Portal Address", "Order Stage"];

  if (isLoading) {
    return <AddressListSkeleton />;
  }

  return (
    <div className="mt-8 overflow-auto w-full">
      {!addresses || addresses.length === 0 ? (
        <div className="px-6 pb-8">
          <span>No addresses found.</span>
        </div>
      ) : (
        <table className="w-full overflow-auto divide-y divide-gray-300 table">
          <thead>
            <tr>
              {tableHeader.map((item, index) => (
                <th
                  key={index}
                  scope="col"
                  className={classNames(
                    "px-6 py-3 text-left text-xs font-normal text-gray-500 uppercase tracking-wider"
                  )}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {addresses.map((item) => (
              <tr
                key={item.id}
                className={classNames("font-light text-sm", item.is_default && "bg-blue-100")}
              >
                {!!item.full_name && <td className="py-3 px-6">{item.full_name}</td>}
                <td className="py-3 px-6 space-y-4">
                  <div>
                    {(!!item.address || !!item.unit) && (
                      <p>
                        {!!item.address && item.address}
                        {!!item.unit && ", # " + item.unit}
                      </p>
                    )}
                    {!!item.address2 && <p>{item.address2}</p>}
                    <p>
                      {!!item.city && item.city + ", "}
                      {!!item.state && item.state + ", "}
                      {!!item.zipcode && item.zipcode}
                    </p>
                    {!!item.country && <p>{item.country}</p>}
                  </div>
                  {item.is_default && (
                    <div>
                      <span className="bg-blue-600 text-white px-3 py-1 text-sm rounded-full whitespace-nowrap">
                        Default
                      </span>
                    </div>
                  )}
                </td>
                <td className="flex flex-col items-start py-3 px-6 text-center space-y-2">
                  {item.active ? (
                    <span className="bg-green-600 text-white px-3 py-1 text-sm rounded-full whitespace-nowrap">
                      #{item.order} / {item.stage}
                    </span>
                  ) : (
                    <span className="bg-red-200 text-red-800 px-3 py-1 text-sm rounded-full whitespace-nowrap">
                      Has No Order
                    </span>
                  )}
                </td>
                <td className="py-3 px-6">
                  <AddressEntryMenu
                    isItemActive={item.active}
                    addressId={item.id}
                    onSuccess={getTableData}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShippingAddressesList;
