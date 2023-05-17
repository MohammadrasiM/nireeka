import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getChallengesList } from "../../app/api/challenges";
import Tabs from "@/components/Atoms/buttons/Tabs";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import Table from "@/components/Atoms/tables/Table";
import ChallengeTableRow from "@/components/Dashboard/challenges/ChallengeTableRow";
import DashboardLayout from "@/components/Dashboard/layout/DashboardLayout";
import { getDashboardLayoutProps } from "../../functions/getDashboardLayoutProps";

const table = {
  header: [
    { label: "Challenge" },
    { label: "Point" },
    { label: "Claim" },
    { label: "EXPIRY DATE" },
  ],
};

const initialTabs = [
  { name: "All", href: "#", current: true },
  { name: "Claimed", href: "#", current: false },
];

// const ChallengesPage = (props) => {
//   const [challenges, setChallenges] = useState([]);
//   const [tableRows, setTableRows] = useState([]);
//   const [activeTab, setActiveTab] = useState(0);
//   const [tabs, setTabs] = useState(initialTabs);
//   const [isLoading, setIsLoading] = useState(true);

//   table.rows = tableRows;

//   const getData = async () => {
//     try {
//       setIsLoading(true);
//       const challengesRes = await getChallengesList();
//       setChallenges(challengesRes.data);
//     } catch (error) {
//       toast.error("Couldn't get data from server. Try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   useEffect(() => {
//     let rowsToSet = challenges.map((challenge) => {
//       return {
//         component: ChallengeTableRow,
//         props: { challenge, updateUI: getData },
//       };
//     });

//     if (activeTab === 1) {
//       rowsToSet = rowsToSet.filter((row) => row.props.challenge.is_claim);
//     }
//     setTableRows(rowsToSet);
//   }, [challenges, activeTab]);

//   const handleTabChange = (tabIndex) => {
//     setActiveTab(tabIndex);
//     setTabs((prevState) => {
//       const newState = [...prevState];

//       for (let i = 0; i < newState.length; i++) {
//         newState[i].current = i === tabIndex;
//       }

//       return newState;
//     });
//   };

//   return (
//     <DashboardLayout trending={props.trending} leaderboard={props.leaderboard}>
//       {!isLoading ? (
//         <div>
//           <Tabs noHref tabs={tabs} onTabClick={handleTabChange} />
//           <Table table={table} className="mt-3 max-h-[50rem]" />
//         </div>
//       ) : (
//         <WhiteShadowCard>
//           <div className="flex justify-center">
//             <LoadingNireeka className="w-12 h-12 border-gray-600" />
//           </div>
//         </WhiteShadowCard>
//       )}
//     </DashboardLayout>
//   );
// };

const ChallengesPage = () => <p>Forbidden</p>;

export const getStaticProps = async () => {
  const layoutProps = await getDashboardLayoutProps();

  return {
    props: {
      ...layoutProps,
    },
    revalidate: 10,
  };
};

export default ChallengesPage;
