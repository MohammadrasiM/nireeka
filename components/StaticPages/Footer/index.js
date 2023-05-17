import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import contact from "../../../public/images/contact.png";
import IconWhite from "../../../public/images/icon-white.jpg";

const navigation = {
  BIKES: [
    { name: "Nireeka Prime", to: "/configurator/nireeka-prime-a4" },
    { name: "Nireeka Homie", to: "/configurator/nireeka-homie-v23" },
    { name: "Nireeka Nyx", to: "/configurator/nyx-v1" },
  ],
  ACCESSORIES: [
    { name: "Nireeka Helmet", to: "/accessories/5000110" },
    { name: "Nireeka Backpack", to: "/accessories/5000111" },
    { name: "Nireeka Taillight", to: "/accessories/5000064" },
  ],
  SUPPORT: [
    { name: "Contact Us", to: "/contact" },
    { name: "FAQ", to: "/faq" },
    { name: "User's Manual", to: "/" },
    { name: "Help Center", to: "/help-center" },
    { name: "Warranty", to: "/warranty" },
  ],
  COMPANY: [
    { name: "Find a dealer", to: "/dealers" },
    { name: "About Us", to: "/about-us" },
    { name: "Privacy Policy", to: "/privacypolicy" },
    { name: "Terms & Conditions", to: "/terms" },
    { name: "Refund & Return Policy", to: "/rrpolicy" },
    { name: "Nireeka Game", to: "https://api.nireeka.com/game" },
  ],
  WEBSITE: [
    { name: "Register", to: "/register" },
    { name: "Log In", to: "/login" },
    { name: "Dashboard", to: "/dashboard" },
    { name: "Forums", to: "/forum/1" },
  ],
  social: [
    {
      name: "Facebook",
      to: "https://www.facebook.com/nireeka/",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      to: "https://instagram.com/nireeka.official",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "YouTube",
      to: "https://www.youtube.com/nireeka",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 28 28" {...props}>
          <path d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"></path>
        </svg>
      ),
    },
    {
      name: "Twitter",
      to: "https://twitter.com/nireeka1",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ],
};

function Footer() {
  const { pathname } = useRouter();

  const [valEmail, setValEmail] = useState("");
  const submitSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await subscribeEmail({ email: valEmail });

    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Sorry, we couldn't check. Try again later.");
      }
    }
  };

  const condition = pathname.includes("user-panel");
  if (condition) return <Fragment />;

  return (
    <footer className="bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="px-4 pb-6 mx-auto max-w-7xl sm:px-6 lg:pb-8 lg:px-8">
        <div className="flex flex-wrap-reverse mx-auto">
          <div className="justify-end hidden w-1/2 md:flex imgMin-w">
            <Image src={contact} alt="contact" className="w-8/12" />
          </div>
          <div className="items-center w-full px-4 m-auto text-gray-200 md:w-1/2 ">
            <h3 className="p-5 text-2xl font-light leading-8 text-center align-middle ">
              Customer support
              <span className="flex pt-6 mx-auto border-b-2 border-red-600 border-double w-36"></span>
            </h3>
            <p className="pt-5 text-base font-light text-center text-gray-400 normal-case ">
              Get 24/7 After-sales services from the Nireeka authorized team.
            </p>
            <div className="pt-10 mx-auto font-light text-center text-gray-400 uppercase cursor-pointer text-1remi hover:text-indigo-500">
              <Link href="dashboard/support " passHref>
                <a>&gt; Find Out More</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative mt-1">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-nireekaBorderColor" />
          </div>
          <div className="relative flex justify-center">
            <Image
              src={IconWhite}
              alt="nireeka"
              className="w-20 h-20"
              height={80}
              width={80}
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:py-8 lg:px-8">
        <div className="md:grid md:grid-cols-3">
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="md:grid md:grid-cols-3 md:gap-4">
              <div className="mt-0">
                <h3 className="text-sm font-light tracking-wider text-gray-100 uppercase">
                  BIKES
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.BIKES.map((item) => (
                    <li key={item.name}>
                      <div className="text-sm text-gray-400 hover:text-white">
                        <Link href={item.to}>
                          <a
                            className="font-light cursor-pointer"
                            // target="_blank"
                          >
                            {item.name}
                          </a>
                        </Link>{" "}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-light tracking-wider text-gray-100 uppercase">
                  ACCESSORIES
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.ACCESSORIES.map((item) => (
                    <li key={item.name}>
                      <div className="text-sm text-gray-400 hover:text-white">
                        <Link href={item.to}>
                          <a
                            className="font-light cursor-pointer"
                            // target="_blank"
                          >
                            {item.name}
                          </a>
                        </Link>{" "}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:grid md:grid-cols-1 md:gap-4">
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-light tracking-wider text-gray-100 uppercase">
                    SUPPORT
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.SUPPORT.map((item) => (
                      <li key={item.name}>
                        <div className="text-sm text-gray-400 hover:text-white">
                          <Link href={item.to}>
                            <a
                              className="font-light cursor-pointer"
                              // target="_blank"
                            >
                              {item.name}
                            </a>
                          </Link>{" "}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-4">
              <div className="mt-0">
                <h3 className="text-sm font-light tracking-wider text-gray-100 uppercase">
                  COMPANY
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.COMPANY.map((item) => (
                    <li key={item.name}>
                      <div className="text-sm text-gray-400 hover:text-white">
                        <Link href={item.to}>
                          <a
                            className="font-light cursor-pointer"
                            // target="_blank"
                          >
                            {item.name}
                          </a>
                        </Link>{" "}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:grid md:grid-cols-1 md:gap-4">
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-light tracking-wider text-gray-100 uppercase">
                    WEBSITE
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.WEBSITE.map((item) => (
                      <li key={item.name}>
                        <div className="text-sm text-gray-400 hover:text-white">
                          <Link href={item.to}>
                            <a
                              className="font-light cursor-pointer"
                              // target="_blank"
                            >
                              {item.name}
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
            <h3 className="text-sm font-light tracking-wider text-gray-100 uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-sm font-light text-gray-300">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <form
              className="mt-4 sm:flex sm:max-w-md"
              onSubmit={submitSubscribe}
            >
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                onChange={(e) => setValEmail(e.target.value)}
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                value={valEmail}
                className="w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-4 py-2 text-base font-light text-white border rounded-md border-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-400 hover:text-indigo-500 focus:ring-indigo-400"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="relative hidden lg:flex lg:top-7">
              {/* badge */}
              <div
                id="surly-badge"
                className="surly__id_124143181 surly-badge_black-gradient"
              >
                <div className="surly-badge__header">
                  <h3 className="surly-badge__header-title">Brilliantly</h3>
                  <p className="surly-badge__header-text">SAFE!</p>
                </div>
                <div className="surly-badge__tag">
                  <Link href="https://sur.ly/i/nireeka.com/">
                    <a
                      className="surly-badge__tag-text"
                      //  target="_blank"
                    >
                      nireeka.com
                    </a>
                  </Link>
                </div>
                <div className="surly-badge__footer">
                  <h3 className="surly-badge__footer-title">Content & Links</h3>
                  <p className="surly-badge__footer-text">
                    Verified by
                    <Link href="https://sur.ly">
                      <a
                        // target="_blank"
                        className="px-1 surly-badge__footer-link"
                      >
                        Sur.ly
                      </a>
                    </Link>
                  </p>
                </div>
                <div className="surly-badge__date">2022</div>
              </div>
              {/* badge */}
            </div>
          </div>
        </div>

        <div className="mt-4 md:flex md:items-center md:justify-between">
          <div className="flex space-x-2 md:order-2">
            {navigation.social.map((item) => (
              <div
                key={item.name}
                className="z-30 text-base text-gray-400 md:mt-0 md:order-1"
              >
                <div className=" front-footer-social-box">
                  <Link href={`${item.to}`} passHref>
                    <a target="_blank">
                      <div className="px-1 text-gray-400 cursor-pointer hover:text-indigo-500">
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
          <p className="mt-8 text-base font-light text-gray-400 md:mt-0 md:order-1">
            &copy; 2021 Nireeka Technologies Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
