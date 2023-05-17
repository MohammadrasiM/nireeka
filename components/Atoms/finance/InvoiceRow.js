import { commafy } from "functions/numbers";

const InvoiceRow = ({ item, type, bikeUpgrades }) => {
  console.log("item", item);
  //debugger;

  return (
    <>
      <tr className="h-16">
        <td className="pl-4">
          <span className="block font-medium">
            {/* titile model  */}
            {item.title} <span className="font-medium text-gray-600">{item.variation}</span>
            {type === "Bike" && (
              <span className="font-light text-sm">
                {" "}
                ({item.color} / {item.size}&quot;)
              </span>
            )}
            {!!item.refund && <span className="text-sm">{item.refund}</span>}
          </span>
          <span className="block font-light text-sm text-gray-600">{type}</span>
        </td>
        <td className="text-right pr-4">
          <span>${commafy(item.price || item.final_price || 0)}</span>
        </td>
      </tr>
      {type === "Bike" &&
        !!bikeUpgrades &&
        bikeUpgrades.map((upgrade) => (
          <tr className="h-16" key={upgrade.title + "-" + upgrade.order_bike_id}>
            <td className="pl-8">
              <span className="block text-sm">
                {upgrade.title}
                {!!upgrade.refund && <span className="text-xs text-gray-600"> ({upgrade.refund})</span>}
              </span>
              <span className="block font-light text-sm text-gray-600">Upgrade</span>
            </td>
            <td className="text-right pr-4">
              <span>${commafy(upgrade.price || item.final_price)}</span>
            </td>
          </tr>
        ))}
    </>
  );
};

export default InvoiceRow;
