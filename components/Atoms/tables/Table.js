import { useRef } from "react";
import classNames from "../../../functions/classNames";
import { useScrollShadowEffect } from "../../../hooks/useScrollShadowEffect";

/**
 * Table object format:  
 * {
 *   header: [
 *     {  
 *       label: "header 1",  
 *     },
 *   ],  
 *   rows: [  
 *     {
 *       component: SomeComponent,  
 *       props: {  
 *         anyPropsYouWantToPass,  
 *       },
 *     }
 *   ],
  };
*/
const Table = (props) => {
  const contentRef = useRef();
  const [currentScrollRatio, shouldShowScrollShadow] = useScrollShadowEffect(contentRef, "y");

  return (
    <div className={classNames("flex flex-col my-2 relative", props.className)}>
      <div className="overflow-x-auto" ref={contentRef}>
        {shouldShowScrollShadow && (
          <>
            <div className="shadow--r" style={{ opacity: 1 - currentScrollRatio }}></div>
            <div className="shadow--l" style={{ opacity: currentScrollRatio }}></div>
          </>
        )}
        <div className="inline-block min-w-full align-middle pb-10">
          <div className="shadow ring-1 ring-black ring-opacity-5">
            <table className="min-w-full divide-y divide-gray-300 sm:rounded-lg">
              <thead className="bg-gray-50 md:rounded-t-lg">
                <tr>
                  {props.table.header.map((head, index) => (
                    <th
                      key={index}
                      scope="col"
                      className={classNames(
                        "px-6 py-3 text-left last:text-right text-xs font-normal text-gray-500 uppercase tracking-wider"
                      )}
                    >
                      {head.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {props.table.rows.map((row, index) => (
                  <row.component key={index} {...row.props} />
                ))}
              </tbody>
              {!!props.table.footer && (
                <tfoot>{<props.table.footer.component {...props.table.footer.props} />}</tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
