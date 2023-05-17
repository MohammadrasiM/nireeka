import { SanitizeSpareHTML } from "@/components/SafeHtml/WithoutTag";
import { commafy } from "functions/numbers";
import React from "react";
import { useSelector } from "react-redux";
import SkeletonCardSpare from "../skeletonLoading/SkeletonCardSpare";

function ResultSearch() {
  const resultReqSuccess = useSelector((state) => state.spares.resultReqSuccess);
  const resultData = useSelector((state) => state.spares.resultData);

  return (
    <div>
      {resultReqSuccess ? (
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {resultData?.spares?.map((product) => (
            <div onClick={(e) => handleModal(product.id, product)} key={product.id}>
              <div
                key={product.id}
                className="relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg cursor-pointer group"
              >
                <div
                  key={product.id}
                  className="bg-gray-200 aspect-w-3 aspect-h-4 group-hover:opacity-75 sm:aspect-none sm:h-96"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="flex flex-col flex-1 p-4 space-y-2">
                  <h3 className="font-light text-gray-900 text-1remi">
                    <a
                      // href={product.href}
                      className="text-1remi"
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {/* {product.title} */}
                      {product.title && product.title.length > 30
                        ? `${product.title.substring(0, 30)}...`
                        : product.title}
                    </a>
                  </h3>
                  {product.description && product.description.length > 4 ? (
                    <p className="flex text-sm font-light text-gray-500">
                      <SanitizeSpareHTML html={product.description} />
                      {product.description.length > 20 && (
                        <span className="font-light text-gray-500">{`...`}</span>
                      )}
                    </p>
                  ) : (
                    <h3 className="text-sm font-light text-gray-500">No Description</h3>
                  )}
                  {product.extra && product.extra.length > 6 ? (
                    <div className="flex flex-col justify-end flex-1">
                      <p className="text-sm font-light text-gray-500">
                        <SanitizeSpareHTML html={product.extra} />
                      </p>
                      <p className="font-light text-gray-900 text-1remi mt-0.5 ">
                        {`$`}
                        {commafy(product.price) }

                      </p>
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <h4 className="text-sm font-light text-gray-500">No Description</h4>
                      <p className="font-light text-gray-900 text-1remi mt-0.5 ">
                        {`$`}
                        {commafy(product.price) }

                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <SkeletonCardSpare />
      )}
    </div>
  );
}

export default ResultSearch;
