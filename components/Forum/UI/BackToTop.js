import { ChevronUpIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

const BackToTop = () => {
  useEffect(() => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
    let animationFrameID = window.requestAnimationFrame(shouldShowBackToTop);
    let scrollFrameID = window.requestAnimationFrame(backToTopClickHandler);
    window.addEventListener("scroll", shouldShowBackToTop);
    return () => {
      window.removeEventListener("scroll", shouldShowBackToTop);
      window.cancelAnimationFrame(animationFrameID);
      window.cancelAnimationFrame(scrollFrameID);
    };
  }, []);

  // State to controll component visibility
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  // State to controll component animation
  // "in" for component mount and "out" for component unmount
  // the component will be unmounted in a useEffect after 400ms (=== animation duration)
  const [backToTopAnimation, setBackToTopAnimation] = useState("");

  // Will unmount the component after "out" animation
  useEffect(() => {
    let timeoutID = setTimeout(() => {
      if (backToTopAnimation === "out") {
        setIsBackToTopVisible(false);
      }
    }, 400);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [backToTopAnimation]);

  //
  const shouldShowBackToTop = () => {
    const yScrollOffset = window.pageYOffset;
    if (yScrollOffset > 100) {
      setIsBackToTopVisible(true);
      setBackToTopAnimation("in");
    } else {
      setBackToTopAnimation("out");
    }
  };

  const backToTopClickHandler = () => {
    let position =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (position) {
      window.scrollBy(0, -position);
    }
  };

  return (
    <>
      {!!isBackToTopVisible && (
        <div
          onClick={backToTopClickHandler}
          className={`${
            backToTopAnimation === "in"
              ? "animate-slide-up-fade-in"
              : "animate-fade-out -translate-y-full"
          } fixed bottom-0 right-8 block md:hidden p-1 rounded-full bg-gray-300/50`}
        >
          <ChevronUpIcon className="w-8 h-8 icon-stroke-width-1 text-gray-700" />
        </div>
      )}
    </>
  );
};

export default BackToTop;
