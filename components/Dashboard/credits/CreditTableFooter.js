const CreditPageFooter = (props) => {
  return (
    <tr className="bg-white border-t border-gray-200">
      <td colSpan={props.colSpan} className="px-4 py-3 sm:px-6">
        <span className="font-light right-0 block text-right">
          Total: ${props.totalAmount}
        </span>
      </td>
    </tr>
  );
};

export default CreditPageFooter;
