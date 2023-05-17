import Router from "next/router";
import { TrashIcon, EyeOffIcon, EyeIcon, XIcon, XCircleIcon } from "@heroicons/react/outline";

// Modal name mapping
export const LOGIN_TO_LIKE_POST = "LOGIN_TO_LIKE_POST";
export const LOGIN_TO_LIKE_COMMENT = "LOGIN_TO_LIKE_COMMENT";
export const LOGIN_TO_REPLY_POST = "LOGIN_TO_REPLY_POST";
export const LOGIN_TO_REPLY_COMMENT = "LOGIN_TO_REPLY_COMMENT";
export const CONFIRM_COMMENT_DELETION = "CONFIRM_COMMENT_DELETION";
export const CONFIRM_THREAD_DELETION = "CONFIRM_THREAD_DELETION";
export const CONFIRM_THREAD_HIDE = "CONFIRM_THREAD_HIDE";
export const CONFIRM_THREAD_SHOW = "CONFIRM_THREAD_SHOW";

export const CONFIRM_TICKET_CLOSE = "CONFIRM_TICKET_CLOSE";

// Modal types
export const MODAL_TYPES = {
  ALERT: "ALERT",
  WIDE2BTN: "WIDE2BTN",
};

// Modals content
const LOGIN_TO_LIKE_POST_MODAL = {
  type: MODAL_TYPES.WIDE2BTN,
  title: "Join us to share the love",
  message: "Only logged in users can like a post",
  icon: <i className="font-fontello icon-heart text-red-600 text-4xl" />,
  primaryButton: "Register",
  secondaryButton: "Login",
  onPrimaryButtonClick: () => {
    Router.push("/register");
  },
  onSecondaryButtonClick: () => {
    Router.push("/login");
  },
};
const LOGIN_TO_LIKE_COMMENT_MODAL = {
  type: MODAL_TYPES.WIDE2BTN,
  title: "Join us to share the love",
  message: "Only logged in users can like a comment",
  icon: <i className="font-fontello icon-heart text-red-600 text-4xl" />,
  primaryButton: "Register",
  secondaryButton: "Login",
  onPrimaryButtonClick: () => {
    Router.push("/register");
  },
  onSecondaryButtonClick: () => {
    Router.push("/login");
  },
};
const LOGIN_TO_REPLY_POST_MODAL = {
  type: MODAL_TYPES.WIDE2BTN,
  title: "Join us to speak",
  message: "Only logged in users can reply to a post",
  icon: (
    <i className="font-fontello icon-comment-empty text-blue-600 text-4xl" />
  ),
  primaryButton: "Register",
  secondaryButton: "Login",
  onPrimaryButtonClick: () => {
    Router.push("/register");
  },
  onSecondaryButtonClick: () => {
    Router.push("/login");
  },
};
const LOGIN_TO_REPLY_COMMENT_MODAL = {
  type: MODAL_TYPES.WIDE2BTN,
  title: "Join us to speak",
  message: "Only logged in users can reply to a comment",
  icon: (
    <i className="font-fontello icon-comment-empty text-blue-600 text-4xl" />
  ),
  primaryButton: "Register",
  secondaryButton: "Login",
  onPrimaryButtonClick: () => {
    Router.push("/register");
  },
  onSecondaryButtonClick: () => {
    Router.push("/login");
  },
};
export const CONFIRM_COMMENT_DELETION_MODAL = {
  type: MODAL_TYPES.ALERT,
  title: "Are you sure?",
  message: "This comment will be deleted permanently.",
  icon: <TrashIcon className="icon-stroke-width-1 text-red-600 text-4xl" />,
  primaryButtonType: "danger",
  primaryButton: "Delete",
  secondaryButton: "Cancel",
};
export const CONFIRM_THREAD_DELETION_MODAL = {
  type: MODAL_TYPES.ALERT,
  title: "Are you sure?",
  message: "This thread will be deleted permanently.",
  icon: <TrashIcon className="icon-stroke-width-1 text-red-600 text-4xl" />,
  primaryButtonType: "danger",
  primaryButton: "Delete",
  secondaryButton: "Cancel",
};
export const CONFIRM_THREAD_HIDE_MODAL = {
  type: MODAL_TYPES.ALERT,
  title: "Are you sure you want to hide this thread?",
  message:
    "This thread will be hidden. Only admins and the author will be able to see this thread. You can make it visible any time.",
  icon: <EyeOffIcon className="icon-stroke-width-1 text-red-600 text-4xl" />,
  primaryButtonType: "danger",
  primaryButton: "Hide",
  secondaryButton: "Cancel",
};
export const CONFIRM_THREAD_SHOW_MODAL = {
  type: MODAL_TYPES.ALERT,
  title: "Are you sure you want to make this thread visible?",
  message:
    "This thread will be visible for everyone. You can still hide it in the future.",
  icon: <EyeIcon className="icon-stroke-width-1 text-blue-600 text-4xl" />,
  primaryButtonType: "primary",
  primaryButton: "Show",
  secondaryButton: "Cancel",
};

export const CONFIRM_TICKET_CLOSE_MODAL = {
  type: MODAL_TYPES.ALERT,
  title: "Are you sure you want to close this ticket?",
  message: "Tickets can be opened again by admins.",
  icon: <XCircleIcon className="icon-stroke-width-1 text-red-600 text-4xl" />,
  primaryButtonType: "danger",
  primaryButton: "Close",
  secondaryButton: "Cancel",
};

export const CONFIRM_ADDRESS_DELETE_MODAL = {
  type: MODAL_TYPES.ALERT,
  title: "Are you sure you want to delete this address?",
  message: "All your data for this address will be deleted from our servers permanently. This action is not reversible.",
  icon: <XCircleIcon className="icon-stroke-width-1 text-red-600 text-4xl" />,
  primaryButtonType: "danger",
  primaryButton: "Delete",
  secondaryButton: "Cancel",
};

export const CONFIRM_ORDER_DELETE_MODAL = {
  type: MODAL_TYPES.ALERT,
  title: "Are you sure you want to delete this payment record?",
  message: "All your data for this payment will be deleted from our servers permanently. This action is not reversible.",
  icon: <XCircleIcon className="icon-stroke-width-1 text-red-600 text-4xl" />,
  primaryButtonType: "danger",
  primaryButton: "Delete",
  secondaryButton: "Cancel",
};


// TODO: Delete this useless function :)
export const chooseCorrectModal = (MODAL_NAME) => {
  switch (MODAL_NAME) {
    case LOGIN_TO_LIKE_POST:
      return LOGIN_TO_LIKE_POST_MODAL;

    case LOGIN_TO_LIKE_COMMENT:
      return LOGIN_TO_LIKE_COMMENT_MODAL;

    case LOGIN_TO_REPLY_POST:
      return LOGIN_TO_REPLY_POST_MODAL;

    case LOGIN_TO_REPLY_COMMENT:
      return LOGIN_TO_REPLY_COMMENT_MODAL;

    case CONFIRM_COMMENT_DELETION:
      return CONFIRM_COMMENT_DELETION_MODAL;

    case CONFIRM_THREAD_DELETION:
      return CONFIRM_COMMENT_DELETION_MODAL;

    case CONFIRM_THREAD_HIDE:
      return CONFIRM_THREAD_HIDE_MODAL;

    case CONFIRM_THREAD_SHOW:
      return CONFIRM_THREAD_SHOW_MODAL;

    case CONFIRM_TICKET_CLOSE:
      return CONFIRM_TICKET_CLOSE_MODAL;

    case CONFIRM_ADDRESS_DELETE:
      return CONFIRM_ADDRESS_DELETE_MODAL;

    default:
      console.log("Error: Invalid modal type in chooseCorrectModal()");
  }
};
