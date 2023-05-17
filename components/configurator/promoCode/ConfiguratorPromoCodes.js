import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { useSelector } from "react-redux";
import classNames from "../../../functions/classNames";
import PromoCodeCard from "./PromoCodeCard";

export default function ConfiguratorPromoCodes(props) {
  const totalPrice = useSelector((state) => state.configurator.totalPrice);
  return (
    <div className={classNames("flex", props.className)}>
      <Swiper
        slidesPerView={1}
        className="w-full select-none swiper-navigation-arrows"
        spaceBetween={10}
        id="configurator-promo-codes-swiper"
        modules={[Navigation]}
        centeredSlides={true}
        navigation={true}
        centeredSlidesBounds={true}
      >
        {props.codes.map((code, index) => (
          <SwiperSlide key={index}>
            <PromoCodeCard
              discount={code.discount}
              maxPrice={code.max_price}
              promoCode={code.code}
              isEligible={totalPrice > code.max_price}
              className="mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
