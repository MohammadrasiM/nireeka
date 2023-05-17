import { useContext } from "react";
import ConfirmationModalContext from "../app/store/ConfirmationModalContext";

export const useConfirmationModal = () => {
  const ctx = useContext(ConfirmationModalContext);

  const getConfirmation = ({ ...options }) => {
    return new Promise((resolve) => {
      ctx.pushModal({ actionCallback: resolve, ...options });
    });
  };

  return { getConfirmation };
};