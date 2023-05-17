import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import classNames from "../../../functions/classNames";
import { useRouter } from "next/router";
import { useState } from "react";

export default function DashboardDesktopNavigation(props) {
  const router = useRouter();
  const [sliderProgress, setSliderProgress] = useState(0);
  const [shouldShowShadow, setShouldShowShadow] = useState(false);

  return (
    <nav className="relative flex flex-wrap">
      {shouldShowShadow && (
        <>
          <div className="shadow--r" style={{ opacity: 0.5 - sliderProgress }}></div>
          <div className="shadow--l" style={{ opacity: sliderProgress - 0.5 }}></div>
        </>
      )}
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        id="dashboard-desktop-navigation-swiper"
        className="select-none"
        modules={[FreeMode]}
        freeMode={true}
        onAfterInit={(swiper) => {
          if (swiper.isBeginning && swiper.isEnd) setShouldShowShadow(false);
          else setShouldShowShadow(true);
        }}
        onResize={(swiper) => {
          if (swiper.isBeginning && swiper.isEnd) setShouldShowShadow(false);
          else setShouldShowShadow(true);
        }}
        onSliderMove={(swiper) => {
          if (swiper.progress >= 0 && swiper.progress <= 1) setSliderProgress(swiper.progress);
          else if (swiper.progress < 0) setSliderProgress(0);
          else if (swiper.progress > 1) setSliderProgress(1);
        }}
      >
        {props.navigation.map((item) => (
          <SwiperSlide
            key={item.name}
            className={classNames(
              item.current ? "bg-white shadow-sm" : "hover:bg-white hover:bg-opacity-30",
              "text-sm font-exo rounded-md text-gray-600 uppercase"
            )}
          >
            <Link
              href={item.href}
              aria-current={router.pathname === item.href ? "page" : undefined}
              passHref
            >
              <a className="block px-3 py-2">{item.name} {item?.count ? `(${item?.count})` : undefined}</a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </nav>
  );
}
