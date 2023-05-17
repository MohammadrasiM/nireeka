import Link from "next/link";
import LogoFooter from "../../public/images/icon-white.jpg";
import Image from "next/image";
import { navigation } from "./data";
import { useEffect, useState } from "react";

const FooterHelpCenter = () => {
  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 800) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };
  return (
    <>
      <footer className="bg-black" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        {showButton && (
          <button
            onClick={scrollToTop}
            className="z-50 bg-gray-400 animate-pulse back-to-top show md:hidden hover:bg-gray-500 hover:opacity-6 opacity-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              fill="none"
              viewBox="0 0 28 28"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        )}

        <>
          {" "}
          <div className="w-11/12 py-12 mx-auto lg:py-16 lg:w-8/12 ">
            <div className="md:grid md:grid-cols-3">
              <div className="grid w-full grid-cols-2 md:col-span-2 md:w-1200w">
                <div className="md:grid md:grid-cols-3 md:gap-5">
                  <div className="mt-0">
                    <h3 className="text-sm font-light tracking-wider text-gray-100 ">
                      BIKES
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {navigation.BIKES.map((bike) => (
                        <li key={bike.name}>
                          <div className="text-sm font-light text-gray-400 hover:text-white">
                            <Link href={`${bike.Href}`} passHref>
                              <a target="_blank" rel="noreferrer">
                                <h6 className="cursor-pointer">{bike.name} </h6>
                              </a>
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-sm font-light tracking-wider text-gray-100 ">
                      ACCESSORIES
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {navigation.ACCESSORIES.map((accessori) => (
                        <li key={accessori.name}>
                          <div className="text-sm font-light text-gray-400 hover:text-white">
                            <Link href={`${accessori.Href}`} passHref>
                              <a target="_blank" rel="noreferrer">
                                <h6 className="cursor-pointer">
                                  {accessori.name}
                                </h6>
                              </a>
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:grid md:grid-cols-1 md:gap-4">
                    <div className="mt-12 md:mt-0">
                      <h3 className="text-sm font-light tracking-wider text-gray-100 ">
                        SUPPORT
                      </h3>
                      <ul role="list" className="mt-4 space-y-4">
                        {navigation.SUPPORT.map((support) => (
                          <li key={support.name}>
                            <div className="text-sm font-light text-gray-400 hover:text-white">
                              <Link href={`${support.Href}`} passHref>
                                <a target="_blank" rel="noreferrer">
                                  <h6 className="cursor-pointer">
                                    {support.name}
                                  </h6>
                                </a>
                              </Link>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="md:grid md:grid-cols-2 "
                  style={{ width: "66%" }}
                >
                  <div className="mt-0">
                    <h3 className="text-sm font-light tracking-wider text-gray-100 ">
                      COMPANY
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {navigation.COMPANY.map((company) => (
                        <li key={company.name}>
                          <div className="text-sm font-light text-gray-400 hover:text-white">
                            <Link href={`${company.Href}`} passHref>
                              <a target="_blank" rel="noreferrer">
                                <h6 className="cursor-pointer">
                                  {company.name}
                                </h6>
                              </a>
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:grid md:grid-cols-1 md:gap-4">
                    <div className="mt-12 md:mt-0 md:pl-1">
                      <h3 className="text-sm font-light tracking-wider text-gray-100 ">
                        WEBSITE
                      </h3>
                      <ul role="list" className="mt-4 space-y-4">
                        {navigation.WEBSITE.map((website) => (
                          <li key={website.name}>
                            <div className="text-sm font-light text-gray-400 hover:text-white">
                              <Link href={`${website.Href}`} passHref>
                                <a target="_blank" rel="noreferrer">
                                  <h6 className="cursor-pointer">
                                    {website.name}
                                  </h6>
                                </a>
                              </Link>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 md:mt-0">
                <h3 className="text-sm font-light tracking-wider text-gray-100 ">
                  Subscribe to our newsletter
                </h3>
                <p className="mt-4 text-sm font-light text-gray-300">
                  The latest news, articles, and resources, sent to your inbox
                  weekly.
                </p>
                <form className="mt-4 sm:flex sm:max-w-md">
                  <label className="sr-only">Email address</label>
                  <input
                    type="email"
                    name="email"
                    id="email-address"
                    required=""
                    className="w-full min-w-0 px-4 py-2 text-base font-light text-gray-900 placeholder-gray-500 bg-white border border-transparent rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                  <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="flex items-center justify-center w-full px-4 py-2 font-light text-white bg-transparent border rounded-md font-extra-light border-customColorNIR focus:outline-none focus:ring-1 hover:focus:ring-indigo-600  focus:ring-indigo-700 "
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* <!-- //end --> */}
            <div className="relative mt-4">
              <div className="absolute flex justify-end w-full">
                {navigation.social.map((item) => (
                  <div
                    key={item.name}
                    className="z-30 text-base text-gray-400 md:mt-0 md:order-1"
                  >
                    <div className=" front-footer-social-box">
                      <Link href={`${item.to}`} passHref>
                        <a target="_blank" >
                          <div className="px-1 text-gray-400 cursor-pointer hover:text-indigo-500 ">
                            <item.icon
                              className="w-6 h-6 text-lg lg:text-2xl md:w-9"
                              aria-hidden="true"
                            />
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="inset-0 flex items-center mt-2 "
                aria-hidden="true"
              >
                <div className="absolute w-full border-t border-gray-300"></div>
                <div className="z-20 flex justify-center w-full">
                  <div className="w-20">
                    <Image src={LogoFooter} alt="nireeka" />
                  </div>
                </div>
              </div>
            </div>
            {`////`}
            <div className="flex flex-col-reverse md:justify-between md:flex md:flex-row">
              <p className="pt-12 text-base font-light text-gray-400 md:mt-0 md:order-1">
                © 2021 Nireeka Technologies Inc. All rights reserved.
              </p>
              <div className="z-40 flex-col pt-1 mt-1 text-base font-light text-gray-400 md:pt-6 md:mt-0 md:order-1">
                <p>We Accept</p>
                <div className="flex mt-5 md:mt-1 ">
                  {navigation.PaymentGateway.map((payment) => {
                    return (
                      <Link
                        key={payment.name}
                        href={`${payment.Href}`}
                        passHref
                      >
                        <a target="_blank" rel="noreferrer">
                          <div className="w-2 h-2 px-3 mx-1">
                            {/* <img src={`${payment.logo}`} alt={payment.name} /> */}
                            <payment.icon />
                          </div>
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      </footer>
    </>
  );
};

export default FooterHelpCenter;
