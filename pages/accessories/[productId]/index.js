import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Thumbnail from "@/components/Atoms/thumbnail/Thumbnail";
import CustomHead from "@/components/seo/CustomHead";
import classNames from "functions/classNames";
import { getAccessories, getAccessoriesId } from "app/api/accessories";
import { addToCart } from "app/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCartPending, getCartSuccess } from "app/store/cartServer";
import { toast } from "react-toastify";

const product = {
  name: "Zip Tote Basket",
  price: "$140",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    // More images...
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    // More sections...
  ],
};
// styleThumbnail
const stylesProps = {
  tabGroupClass: "flex flex-col-reverse",
  wrapperTabListClass:
    "hidden  w-full max-w-2xl mx-auto py-8 sm:block lg:max-w-none overflow-x-auto scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 overflow-x-scroll ",
  tabListClass: "grid gap-1 grid-rows-1 grid-flow-col",
  TabCalss:
    "relative w-20 m-3 flex items-center justify-center h-24 text-sm font-medium text-gray-900 uppercase bg-white rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50",
  wrapperImageClass: "absolute inset-0 overflow-hidden rounded-md",
  imageClass: "object-cover object-center h-full w-20",
  defaultSelectImageClass:
    "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none",
  selectImageClass: "ring-indigo-500",
  thumbnailWrapperClass: "w-full aspect-w-1 aspect-h-1",
  thumbnailImageClass: "object-cover object-center w-full h-full sm:rounded-lg",
};

// styleThumbnail
export default function Index({ products }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state?.auth?.isUserLoggedIn);
  const cartData = useSelector((state) => state?.cartServer?.cartData);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const handleAddToCartServer = (e, product) => {
    e.preventDefault();
    let items = [{ product_id: product.id, count: 1 }];
    dispatch(addToCartPending(items));
    const result =
      cartData &&
      cartData.items?.find(({ product_id }) => product_id === product.id);

    if (getCartSuccess && result) {
      toast.info(` An additional ${product.title} has been added to the cart`, {
        position: "top-right",
      });
    } else {
      toast.success(`${product.title} added to cart`, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <CustomHead
        selfTitle
        title={`${products.data.title} - Nireeka Bikes`}
        name={`${products.data.title}`}
        description={products.data.description}
        images={Object.values(products.data.files)?.map(
          (bike) => bike.original
        )}
        keywords={["Nireeka", "bike accessories", "helmets", "lights", "bags"]}
        available
      />
      <div className="mt-1 bg-white">
        <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            <Thumbnail
              data={products.data.files}
              stylesProps={stylesProps}
              styleAccessory={true}
            />
            <div className="px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-light tracking-tight text-gray-900">
                {products.data.title}
              </h1>
              <div className="flex mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="pr-5 text-3xl font-light text-gray-700 ">
                  {`$`}
                  {products.data.price}
                </p>
                {products?.data?.retail_price && (
                  <>
                    {" "}
                    <div className="relative">
                      <p className="text-3xl text-gray-500 font-extralight ">
                        {`$`}
                        {products.data.retail_price}
                      </p>
                      <p
                        className="absolute text-6xl text-gray-500 -top-3 left-7 z-2 font-extralight"
                        style={{ transform: "rotateZ(90deg)" }}
                      >
                        {`|`}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="px-1 mt-6">
                <h3 className="sr-only">Description</h3>
                <div
                  className={`space-y-6 font-light text-gray-700 min-h-min customStyle dangeriousStyleAccsessories `}
                  dangerouslySetInnerHTML={{
                    __html: products.data.description,
                  }}
                />
              </div>

              <form className="mx-1 mt-6">
                <div>
                  <h3 className="text-sm font-light text-gray-600 text-1remi">
                    Color
                  </h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {products.data.colors.map((color, index) => (
                        <RadioGroup.Option
                          key={index}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                            )
                          }
                          style={{ backgroundColor: color.code }}
                        >
                          <RadioGroup.Label as="p" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className="w-8 h-8 border border-black rounded-full border-opacity-10"
                            style={{ backgroundColor: color.code }}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex mt-10 sm:flex-col1">
                  {isUserLoggedIn ? (
                    <>
                      {" "}
                      <button
                        type="submit"
                        className="flex items-center justify-center flex-1 max-w-xs px-8 py-3 text-base font-light text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                        onClick={(e) => handleAddToCartServer(e, products.data)}
                      >
                        Add to cart
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="flex items-center justify-center flex-1 max-w-xs px-8 py-3 text-base font-light text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                        onClick={(e) => handleAddToCart(e, products.data)}
                      >
                        Add to cart
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="px-4 mt-16 md:mt-20 sm:px-0">
            {products.data.specifications &&
              products.data.specifications.length > 0 && (
                <>
                  <span className="text-2xl font-light uppercase">
                    Specifications *
                  </span>
                  <div className="my-8 space-y-4">
                    {products.data.specifications.map((spec) => (
                      <div
                        key={spec.id}
                        className="pb-2 border-b last:border-b-0"
                      >
                        <p className="flex">
                          <span className="flex-1 text-sm capitalize">
                            {spec.title}
                          </span>
                          <span className="flex-1 text-sm text-gray-700">
                            {spec.value}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                  <span className="block mt-3 text-sm font-light text-gray-600">
                    * Specifications are subject to change without prior notice.
                  </span>
                </>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const dataAccessories = await getAccessories();
  const paths = dataAccessories?.data?.map((accessory) => ({
    params: { productId: `${accessory?.id}` },
  }));

  return {
    paths: paths || [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const data = await getAccessoriesId(context?.params?.productId);
  return {
    props: { products: data },
    notFound: !data,
    revalidate: 6 * 60 * 60,
  };
}
