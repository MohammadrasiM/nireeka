import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import Modal2WideBtn from "../../Atoms/modals/Modal2WideBtn";
import { chooseCorrectModal } from "../../../app/constants/modals";

const BackToTop = dynamic(() => import("../UI/BackToTop"), { ssr: false });
const ForumHeader = dynamic(() => import("./ForumHeader"));

const ForumLayout = (props) => {
  const modalName = useSelector((state) => state.modal.currentModal);
  let modalData = {};
  if (modalName) modalData = chooseCorrectModal(modalName);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <ForumHeader />

      {/* Modals in redux created with pushModal() */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
      >
        <Modal2WideBtn {...modalData} />
      </div>
      {/* Body */}
      <div className="pb-10 pt-5 lg:py-5">
        <div className="max-w-[1240px] mx-auto sm:px-6 lg:max-w-7xl lg:px-8 grid grid-cols-12 gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">{props.leftColumn}</div>
          <main className="col-span-12 lg:col-span-9 xl:col-span-6 space-y-4">
            {props.children}
          </main>
          <aside className="col-span-12 xl:col-span-4">{props.rightColumn}</aside>
        </div>
      </div>

      {/* Back to top on mobile */}
      <BackToTop />
    </div>
  );
};

export default ForumLayout;
