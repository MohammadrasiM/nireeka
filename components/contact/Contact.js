import Link from "next/link";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { getFormContactUs } from "../../app/api/contact";
import LoadingNireeka from "../Atoms/LoadingNireeka";

const Social = {
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

export default function Contact() {
  const [stateCaptcha, setStateCaptcha] = useState(false);
  const [data, setData] = useState(null);

  const captchaRef = useRef(null);
  // console.log(captchaRef?.current.getValue());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    // "g-recaptcha-response": "",
  });
  function onChange(value) {
    if (value) {
      // setStateValCaptcha(value);
      setStateCaptcha(true);
    }
  }

  const changeHandler = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleContactClick = async (e) => {
    e.preventDefault();
    // console.log("formData", {...formData,"g-recaptcha-response": captchaRef?.current.getValue()});
    try {
      setIsLoading(true);
      const response = await getFormContactUs({
        ...formData,
        "g-recaptcha-response": captchaRef?.current.getValue(),
      });

      if (response.status) {
        toast.success("Your message has been successfully sent");
        setFormData({
          name: "",
          email: "",
          message: "",
          // "g-recaptcha-response": "",
        });
      } else {
        toast.error("Sorry, our servers are unavailable.");
      }
    } catch (error) {
      console.log("Error in message field:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Sorry, we couldn't check. Try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <LoadingNireeka className="w-16 h-16 absolute top-[50%] left-[50%] z-10 border-gray-700" />
      )}
      <div className="mx-auto md:pt-28 md:pb-24 lg:w-800">
        <div className="relative mx-auto bg-white ">
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-bg-white"></div>
          </div>
          <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
            <div className="px-4 py-16 bg-gray-900 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12 md:rounded-3xl">
              <div className="max-w-lg mx-auto">
                <h2 className="text-2xl font-extralight tracking-tight text-gray-100 sm:text-3xl">
                  {`Get in touch`}
                </h2>
                <p className="mt-3 text-sm font-extralight leading-6 text-gray-200">
                  {`Get after-sales services from the Nireeka authorized team.`}
                  <br />
                  {`Monday - Friday - 9 A.M to 5 P.M. EST`}
                  <br />
                  {`Saturday - 9 A.M to 1 P.M. EST`}
                </p>
                <div className="mt-8 text-base text-gray-200">
                  <div>
                    <div className="sr-only">Nireeka address</div>
                    <div>
                      <p className="text-sm font-extralight">
                        Nireeka Technologies Inc
                      </p>
                      <p className="pt-2 text-sm font-medium">Canada</p>
                      {/* {`790 Redwood Square, Oakville, ON L6L 6N3`} */}

                      <p className="text-sm font-extralight">
                        {`790 Redwood Square, Oakville, ON L6L 6N3`}
                      </p>

                      <p className="pt-5 text-sm font-medium">United States</p>
                      <p className="text-sm font-extralight">
                        {`651 N Broad St, Suite 206, Middletown, DE 19709`}
                      </p>
                      <p className="pt-5 text-sm font-medium">Lithuania</p>
                      <p className="text-sm font-extralight">
                        {`Partizanų g. 61, Kaunas 49282 Kauno`}
                      </p>
                    </div>
                  </div>
                  <div className="mt-11">
                    <p className="py-1.5 text-sm font-medium">Email Address:</p>
                    <div className="sr-only">Email</div>
                    <div className="flex">
                      <svg
                        className="flex-shrink-0 w-6 h-6 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <Link href="mailto:sales@nireeka.com">
                        <a className="ml-3 text-sm font-extralight hover:text-indigo-500">
                          sales@nireeka.com
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-3">
                    <dt className="sr-only">Email</dt>
                    <dd className="flex">
                      <svg
                        className="flex-shrink-0 w-6 h-6 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <Link href="mailto:info@nireeka.com">
                        <a className="ml-3 text-sm font-extralight hover:text-indigo-500">
                          info@nireeka.com
                        </a>
                      </Link>
                    </dd>
                  </div>
                </div>
                <p className="mt-6 text-sm font-extralight text-[#8c8c8c]">
                  {`Looking for after-sales inquiries? `}
                  <Link href="/dashboard/support" passHref>
                    <a className="font-extralight text-gray-200 underline hover:text-indigo-500">
                      Open a new ticket here
                    </a>
                  </Link>
                  {`.`}
                </p>
                <p className="mt-6 text-sm font-extralight text-[#8c8c8c]">
                  {`Contact the CEO directly using this email only for administration inquiries. Please do NOT use this email for following up on your orders. `}
                  <Link href="mailto:max@nireeka.com" passHref>
                    <a className="font-extralight text-gray-200 underline hover:text-indigo-500">
                      {`max@nireeka.com`}
                    </a>
                  </Link>
                  {`.`}
                </p>
                <div className="mt-20">
                  {/* <ul role="list" className="flex mt-8 space-x-8"> */}
                  <div className="mt-4 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                      {Social.social.map((item) => (
                        <Link
                          key={item.name}
                          href={item.to}
                          target="_blank"
                          passHref
                        >
                          <a className="cursor-pointer ">
                            <div className="text-gray-400 hover:text-indigo-500 ">
                              <span className="sr-only">{item.name}</span>
                              <item.icon
                                className="w-6 h-6"
                                aria-hidden="true"
                              />
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* </ul> */}
                </div>
              </div>
            </div>
            <div className="px-4 py-16 bg-white sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
              <div className="max-w-lg mx-auto lg:max-w-none">
                <p className="my-5 font-light text-gray-500 ">
                  {`Have a question before placing your order? If you couldn't find
                your answer in `}
                  <Link href="/help-center" passHref>
                    <a className="font-medium text-gray-900 underline hover:text-indigo-500">
                      {` Help Center`}
                    </a>
                  </Link>
                  {`, just drop us a line in the form below.`}
                </p>
                <form
                  // action="#"
                  // method="POST"
                  onSubmit={(e) => handleContactClick(e, data)}
                  className="grid grid-cols-1 gap-y-6"
                >
                  <div>
                    <label htmlFor="full-name" className="sr-only">
                      Full name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      autoComplete="name"
                      className="block w-full px-4 py-3 font-light placeholder-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Full name"
                      onChange={changeHandler}
                      value={formData.name}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full px-4 py-3 font-light placeholder-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Email"
                      onChange={changeHandler}
                      value={formData.email}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      required
                      name="message"
                      rows="4"
                      className="block w-full px-4 py-3 font-light placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Message"
                      onChange={changeHandler}
                      value={formData.message}
                    ></textarea>
                  </div>
                  <div>
                    <ReCAPTCHA
                      ref={captchaRef}
                      sitekey={process.env.SITE_KEY}
                      onChange={onChange}
                      name={"g-recaptcha-response"}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}
