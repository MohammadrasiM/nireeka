import classNames from "../../../functions/classNames";
import { commafy } from "../../../functions/numbers";

const CreditTableRow = (props) => {
  return (
    <tr
      className={classNames(
        props.credit.type === 1 ? "bg-green-100" : "bg-red-100",
        "font-light"
      )}
    >
      <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex">
          <p className="text-gray-900 group-hover:text-gray-900 font-bold">
            {props.credit.id}
          </p>
        </div>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        <span className="text-gray-900 font-bold">
          {props.credit.type === 1 ? "+" : "-"} $
          {commafy(props.credit.value)}
        </span>{" "}
        USD
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {props.credit.description}
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        <time dateTime={props.credit.created_at}>{props.credit.created_at}</time>
      </td>
    </tr>
  );
};

export default CreditTableRow;
