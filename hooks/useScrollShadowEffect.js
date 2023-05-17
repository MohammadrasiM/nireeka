import { useCallback, useEffect, useState } from "react";

export const useScrollShadowEffect = (contentRef, scrollAxisArg = "x") => {
  const [currentScrollRatio, setCurrentScrollRatio] = useState(0);
  const [shouldShowScrollShadow, setShouldShowScrollShadow] = useState(false);

  let scrollAxis = scrollAxisArg?.toLowerCase() === "y" ? "y" : "x";

  const handleScroll = useCallback(() => {
    if (!contentRef.current) return;

    let maxScroll;
    if (scrollAxis === "y")
      maxScroll = contentRef.current.scrollWidth - contentRef.current.clientWidth;
    else maxScroll = contentRef.current.scrollHeight - contentRef.current.clientHeight;

    if (maxScroll < 1e-9) setShouldShowScrollShadow(false);
    else setShouldShowScrollShadow(true);

    if (shouldShowScrollShadow)
      if (scrollAxis === "y") setCurrentScrollRatio(contentRef.current.scrollLeft / maxScroll);
      else setCurrentScrollRatio(contentRef.current.scrollTop / maxScroll);
  }, [shouldShowScrollShadow, contentRef, scrollAxis]);

  useEffect(() => {
    if (!contentRef.current) return;
    const element = contentRef.current;

    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [contentRef, handleScroll]);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  return [currentScrollRatio, shouldShowScrollShadow];
};
