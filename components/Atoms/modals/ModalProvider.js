import { useState } from "react";
import { MODAL_TYPES } from "../../../app/constants/modals";
import Modal2WideBtn from "./Modal2WideBtn";
import Modal2BtnAlert from "./Modal2BtnAlert";
import ConfirmationModalContext from "../../../app/store/ConfirmationModalContext";

const ModalProvider = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  const pushModal = ({
    title,
    message,
    icon,
    type,
    primaryButtonType,
    primaryButton,
    secondaryButton,
    actionCallback,
  }) => {
    setIsModalOpen(true);
    setModalConfig({
      title,
      message,
      icon,
      type,
      primaryButtonType,
      primaryButton,
      secondaryButton,
      actionCallback,
    });
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setModalConfig({});
  };

  const onConfirm = () => {
    modalConfig.actionCallback(true);
    resetModal();
  };

  const onDismiss = () => {
    modalConfig.actionCallback(false);
    resetModal();
  };

  let modalComponent;
  switch (modalConfig.type) {
    case MODAL_TYPES.WIDE2BTN:
      modalComponent = (
        <Modal2WideBtn
          isVisible={isModalOpen}
          title={modalConfig.title}
          message={modalConfig.message}
          icon={modalConfig.icon}
          primaryButton={modalConfig.primaryButton}
          secondaryButton={modalConfig.secondaryButton}
          onPrimaryClick={onConfirm}
          onSecondaryClick={onDismiss}
          onDismiss={onDismiss}
        />
      );
      break;
    case MODAL_TYPES.ALERT:
      modalComponent = (
        <Modal2BtnAlert
          isVisible={isModalOpen}
          title={modalConfig.title}
          message={modalConfig.message}
          icon={modalConfig.icon}
          primaryButtonType={modalConfig.primaryButtonType}
          primaryButton={modalConfig.primaryButton}
          secondaryButton={modalConfig.secondaryButton}
          onPrimaryClick={onConfirm}
          onSecondaryClick={onDismiss}
          onDismiss={onDismiss}
        />
      );
      break;
  }

  return (
    <ConfirmationModalContext.Provider value={{ pushModal }}>
      {modalComponent}
      {props.children}
    </ConfirmationModalContext.Provider>
  );
};

export default ModalProvider;
