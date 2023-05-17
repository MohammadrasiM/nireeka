import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addToCartPending } from "app/store/cartServer";
import { addToCart, setModalCart } from "app/store/cartSlice";
import { toast } from "react-toastify";
import Image from "next/image";

function Accessories({ accessories }) {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state?.auth.isUserLoggedIn);
  const cartData = useSelector((state) => state?.cartServer.cartData);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const handleAddToCartServer = (e, product) => {
    e.preventDefault();

    const items = [{ product_id: product.id, count: 1 }];

    dispatch(addToCartPending(items));

    const result =
      cartData &&
      cartData?.items?.find(({ product_id }) => product_id === product.id);

    if (result) {
      toast.info(`An additional ${product.title} has been added to the cart`);
    } else {
      toast.success(`${product.title} added to cart`);
    }

    dispatch(setModalCart({ open: true }));
  };

  return (
    <>
      <div className="mt-1 bg-white">
        <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {accessories?.data.map((product) => (
              <div
                key={product.id}
                className="relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg group"
              >
                {/* label new product */}
                {product.label && (
                  <p className="pointer-events-none absolute top-3 left-3 z-10 rounded-full bg-sky-500 bg-opacity-90 py-0.5 px-1.5 text-[0.625rem] font-semibold uppercase leading-4 tracking-wide text-white">
                    {product.label}
                  </p>
                )}
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    height: "24rem",
                  }}
                >
                  <div className="bg-gray-200 aspect-w-3 aspect-h-4 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      className="w-full h-full sm:w-full sm:h-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-4 space-y-2 font-light">
                  <h3 className="text-gray-900 ">
                    <Link
                      href={`/accessories/${product?.id}/${product.slug}`}
                      passHref
                    >
                      <a>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </Link>
                  </h3>
                  {product.summary && (
                    <p className="text-sm font-light text-gray-500">
                      {product.summary}
                    </p>
                  )}

                  <p className="text-sm font-light text-gray-500">
                    {product.sizes_count > 1 ? sizes_count : product.size_title}
                  </p>
                  <div className="flex flex-col justify-end flex-1">
                    <p className="text-sm font-light text-gray-500">
                      {product?.colors_count > 1
                        ? product.colors_count
                        : product.color_title}
                    </p>
                    <p className="font-light text-gray-900">${product.price}</p>
                  </div>
                  {isUserLoggedIn ? (
                    <button
                      onClick={(e) => handleAddToCartServer(e, product)}
                      className="py-2 z-[5] mt-2 font-light text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                      Add to cart
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="py-2 z-[5] mt-2 font-light text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Accessories;
