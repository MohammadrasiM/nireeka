import { commafy } from "functions/numbers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect, useRef } from "react";
const { SanitizeSpareHTML } = require("../SafeHtml/WithoutTag");
const productStyles = {
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  maxHeight: "450px",
  minHeight: "300px",
};
const SpareProductCard = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const handleCardClick = () => {
    props.setProductModalData(props.product);
    props.setIsProductModalVisible(true);
    props.setProductId(props.product.id);
  };
  useEffect(() => {
    if (props.product.id == id) {
      props.setProductId(props.product.id);
      props.setProductModalData(props.product);
      props.setIsProductModalVisible(true);
    }
  }, [id]);

  return (
    <div className="relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg cursor-pointer group">
      <div onClick={handleCardClick}>
        {props.product.label && (
          <p className="pointer-events-none absolute top-3 left-3 z-10 rounded-full bg-sky-500 bg-opacity-90 py-0.5 px-1.5 text-[0.625rem] font-semibold uppercase leading-4 tracking-wide text-white">
            {props.product.label}
          </p>
        )}
        <div className="bg-gray-200 aspect-w-3 aspect-h-4 group-hover:opacity-75 sm:aspect-none sm:h-96">
          <div style={productStyles} className="w-full h-full">
            <Image
              src={props.product.thumbnail}
              alt={props.product.title}
              className="object-cover object-center w-full h-full sm:w-full sm:h-full"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              // loading="eager"
              priority={true}
            />
          </div>
          {/* <img
            src={props.product.thumbnail}
            alt={props.product.title}
            className="object-cover object-center w-full h-full sm:w-full sm:h-full"
          /> */}
        </div>
        <div className="flex flex-col flex-1 p-4 space-y-2">
          <h3 className="font-light text-gray-900 text-1remi">
            <span className="text-1remi">
              <span aria-hidden="true" className="absolute inset-0" />
              {props.product.title && props.product.title.length > 30
                ? `${props.product.title.substring(0, 30)}...`
                : props.product.title}
            </span>
          </h3>
          {props.product.description && props.product.description.length > 4 ? (
            <p className="flex text-sm font-light text-gray-500">
              <SanitizeSpareHTML html={props.product.description} />
              {props.product.description.length > 20 && (
                <span className="font-light text-gray-500">{`...`}</span>
              )}
            </p>
          ) : (
            <h3 className="text-sm font-light text-gray-500">No Description</h3>
          )}
          {props.product.extra && props.product.extra.length > 6 ? (
            <div className="flex flex-col justify-end flex-1">
              <p className="text-sm font-light text-gray-500">
                <SanitizeSpareHTML html={props.product.extra} />
              </p>
              <p className="font-light text-gray-900 text-1remi mt-0.5 ">
                {`$`}
                {commafy(props.product.price)}
              </p>
            </div>
          ) : (
            <div>
              {" "}
              <h4 className="text-sm font-light text-gray-500">
                No Description
              </h4>
              <p className="font-light text-gray-900 text-1remi mt-0.5 ">
                {`$`}
                {commafy(props.product.price)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpareProductCard;
