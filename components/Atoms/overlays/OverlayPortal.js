import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const OverlayPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("#overlay-portal"))
    : null;
};

export default OverlayPortal;
