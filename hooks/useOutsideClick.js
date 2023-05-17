import { useEffect } from "react";

/**
 * Hook that runs a callback function on outside clicks of the passed ref
 */
export const useOutsideClick = (ref, parentRef, callback) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        parentRef.current.contains(event.target)
      ) {
        if (typeof callback === "function") callback(event);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, parentRef]);
};
