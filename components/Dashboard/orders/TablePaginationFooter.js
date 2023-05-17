import { Fragment } from "react";
import classNames from "../../../functions/classNames";
import WhiteButton from "../../Atoms/buttons/WhiteButton";

const TablePaginationFooter = (props) => {
  if (props.pagination.pageCount <= 1) return <Fragment></Fragment>;

  return (
    <tr
      className={classNames(
        "bg-white px-4 py-3 border-t border-gray-200 sm:px-6",
        props.className
      )}
      aria-label="Pagination"
    >
      <td colSpan={10}>
        <div className="flex px-4 py-3">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {props.pagination.currentPage * props.pagination.pageSize + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(
                  props.pagination.currentPage * props.pagination.pageSize +
                    props.pagination.pageSize,
                  props.pagination.itemCount
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium">{props.pagination.itemCount}</span>{" "}
              results
            </p>
          </div>
          <div className="flex-1 flex justify-end space-x-3">
            <WhiteButton onClick={props.onPreviousClick}>Previous</WhiteButton>
            <WhiteButton onClick={props.onNextClick}>Next</WhiteButton>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TablePaginationFooter;
