import {
  DocumentReportIcon,
  DocumentTextIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import SafeLinkifiedHtml from "../../SafeHtml/SafeLinkifiedHtml";
import WhiteShadowCard from "../cards/WhiteShadowCard";
import Image from "next/image";

export default function ModalPartInfo(props) {
  return (
    <WhiteShadowCard className="flex flex-col sm:flex-row h-full overflow-auto">
      <div className="flex-1 flex items-center">
        <Swiper
          slidesPerView={"auto"}
          id="confPartModalInfo-bike-specs-swiper"
          className="w-full select-none swiper-navigation-arrows"
          modules={[Keyboard, Navigation]}
          centeredSlides={true}
          navigation={true}
          keyboard={true}
        >
          {props.part.files.map((pic, index) => (
            <SwiperSlide
              key={index}
              className="w-full h-full flex items-center"
            >
              <div
                style={{ overflow: "hidden", position: "relative" }}
                className="w-full h-full min-h-[412px] max-h-[600px]"
              >
                <Image
                  src={pic.original}
                  alt={props.part.title}
                  className="w-full"
                  loading="eager"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  quality={100}
                />
              </div>
              {/* <img
                src={pic.original}
                alt={props.part.title}
                className="w-full"
              /> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex-1 px-4">
        <h3 className="font-medium text-xl sm:text-3xl">{props.part.title}</h3>
        <span className="font-medium text-lg sm:text-2xl text-gray-600">
          ${props.part.price}
        </span>

        <SafeLinkifiedHtml
          string={props.part.description}
          className="my-4 font-light text-sm"
        />

        {props.part.specs && props.part.specs.length > 0 && (
          <>
            <span className="uppercase font-light text-lg sm:text-2xl">
              Specifications *
            </span>
            <div className="mt-4 space-y-2">
              {props.part.specs.map((spec) => (
                <div key={spec.id} className="border-b pb-2 last:border-b-0">
                  <p className="flex">
                    <span className="capitalize flex-1 text-sm">
                      {spec.title}
                    </span>
                    <span className="text-gray-700 flex-1 text-sm">
                      {spec.value}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <span className="text-sm font-light text-gray-600 mt-3 block">
              * Specifications are subject to change without prior notice.
            </span>
          </>
        )}

        {!!props.part.manual_path && (
          <p>
            <a
              download
              href={props.part.manual_path}
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-blue-600 cursor-pointer hover:underline"
            >
              <PaperClipIcon className="w-5 h-5 icon-stroke-width-1 mr-2" />
              <span>Download Manual</span>
            </a>
          </p>
        )}
        {!!props.part.catalog_path && (
          <p>
            <a
              download
              href={props.part.catalog_path}
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-blue-600 cursor-pointer hover:underline"
            >
              <DocumentTextIcon className="w-5 h-5 icon-stroke-width-1 mr-2" />
              <span>Download Catalog</span>
            </a>
          </p>
        )}
        {props.part.spec_sheet_path && (
          <p>
            <a
              download
              href={props.part.spec_sheet_path}
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-blue-600 cursor-pointer hover:underline"
            >
              <DocumentReportIcon className="w-5 h-5 icon-stroke-width-1 mr-2" />
              <span>Download Specification Sheet</span>
            </a>
          </p>
        )}
      </div>
    </WhiteShadowCard>
  );
}
