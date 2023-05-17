import Link from "next/link";
import classNames from "../../../functions/classNames";

export const TabDetails = ({ href, isSelected, title }) => {
  return (
    <>
      <div className="block md:flex">
        <div className="border-b border-gray-200 w-900">
          <nav className="flex -mb-px" aria-label="Tabs">
            <Link href={href}>
              <a
                className={classNames(
                  isSelected
                    ? "border-white text-white border-b-customColorNIR border-b border-1 font-light"
                    : "border-transparent text-gray-300 hover:text-white hover:border-white",
                  "w-36 py-2 px-1 text-center font-light "
                )}
              >
                {title}
              </a>
            </Link>
          </nav>
          {}
        </div>
      </div>
    </>
  );
};

// const tabs = [
//   { name: "My Account", href: "#", current: false },
//   { name: "Company", href: "#", current: false },
//   { name: "Team Members", href: "#", current: true ,},
//   { name: "Billing", href: "#", current: false },
// ];

// export default function TabsDetails() {
//   return (
//     <div>
//       <div className="sm:hidden">
//         <label htmlFor="tabs" className="sr-only">
//           Select a tab
//         </label>
//         {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
//         <select
//           id="tabs"
//           name="tabs"
//           className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//           defaultValue={tabs.find((tab) => tab.current).name}
//         >
//           {tabs.map((tab) => (
//             <option key={tab.name}>{tab.name}</option>
//           ))}
//         </select>
//       </div>
//       <div className="hidden sm:block">
//         <div className="border-b border-gray-200">
//           <nav className="flex -mb-px" aria-label="Tabs">
//             {tabs.map((tab) => (
//               <a
//                 key={tab.name}
//                 href={tab.href}
//                 className={classNames(
//                   tab.current
//                     ? "border-indigo-500 text-indigo-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
//                   "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
//                 )}
//                 aria-current={tab.current ? "page" : undefined}
//               >
//                 {tab.name}
//               </a>
//             ))}
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }
