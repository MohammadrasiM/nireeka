import Image from "next/image";
import Link from "next/link";
import { dealers } from "@/components/StaticPages/Dealers/data";
import Footer from "@/components/StaticPages/Footer";
import DealerBikeThree from "../../public/images/dealers/bike-dealers.jpg";
import Head from "next/head";
import CustomHead from "@/components/seo/CustomHead";
export default function Index() {
  console.log(Object.values(dealers.card)?.map((bike) => bike?.image));

  return (
    <>
      {/* <Head>
        <title>Dealers - Nireeka Bikes</title>
      </Head> */}
      <CustomHead
        selfTitle
        title="Dealers - Nireeka Bikes"
        name="Find a Nireeka Dealer"
        description="Search our list of authorized Nireeka dealers in your area."
        available
      />

      <div>
        <div className="pt-16 md:pt-16">
          <div className="px-4 pt-16 pb-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-xl font-light text-indigo-600 uppercase sm:tracking-tight md:text-2xl">
                {`DEALERSHIP`}
              </h2>
              <p className="mt-1 text-4xl font-light text-gray-900 lg:text-5xl">
                {`Nireeka Service Centers/Dealers`}
              </p>
              <div className="max-w-xl mx-auto mt-5 text-xl text-gray-500 ">
                {`If you can't find a dealership or service center in your country, please contact `}

                <Link href="mailto:sales@nireeka.com">
                  <a className="font-light text-blue-500 cursor-pointer hover:text-customColorNIR hover:underline">{`sales@nireeka.com`}</a>
                </Link>
              </div>
            </div>
          </div>
          {/* //cards */}
          <div className="grid max-w-md gap-8 px-4 py-12 mx-auto sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
            {dealers.card.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                >
                  <div>
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.alt_image}
                        height="250"
                        width="400"
                        objectFit="cover"

                        // className="object-cover w-full"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:h-[435px]">
                      <div className="flex-1">
                        {/* <Link href="/">
                          <a className="text-xl font-normal text-blue-600 cursor-pointer hover:text-customColorNIR hover:underline">
                            {item.head}
                          </a>
                        </Link> */}
                        <h3 className="text-xl font-normal text-blue-600 hover:text-customColorNIR hover:underline">
                          {item.head}
                        </h3>

                        <Link href={item.href_website} passHref>
                          <a className="block mt-2 text-xl font-normal text-gray-900 hover:text-customColorNIR">
                            {item.head_two}
                          </a>
                        </Link>

                        <div className="mt-3 font-normal leading-8 text-gray-500">
                          {item.title_1}
                          <br />
                          <Link href={item.href_phone}>
                            <a className="inline hover:text-customColorNIR">
                              {item.phone}
                            </a>
                          </Link>
                          <br />
                          {item.email && (
                            <>
                              {" "}
                              <p className="inline">{item.email}</p>
                              <Link href={item.href_mail}>
                                <a target="_blank" className="text-blue-600">
                                  {item.name_href_mail}
                                </a>
                              </Link>
                            </>
                          )}

                          <br />
                          {item.website && (
                            <>
                              {" "}
                              <p className="inline">{item.website}</p>
                              <Link href={item.href_website} passHref>
                                <a target="_blank" className="text-blue-600">
                                  {item.name_href_website}
                                </a>
                              </Link>
                            </>
                          )}

                          <br />
                          <br />
                          <span className="font-light text-gray-900">
                            {item.head_title}
                          </span>
                          {item.title}
                        </div>
                      </div>
                      <div className="flex items-center mt-6">
                        <div className="flex-shrink-0">
                          {/* <Link href="/"> */}
                          <>
                            <Image
                              src={item.flag_img}
                              width={26}
                              height={26}
                              className="rounded-full"
                              objectFit="cover"
                              alt={item.alt_img}
                            />
                          </>
                          {/* </Link> */}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-light text-gray-900">
                            {/* <Link href="#">
                              <a className="hover:text-customColorNIR hover:underline">
                                {item.title_img}
                              </a>
                            </Link> */}
                            <p className="hover:text-customColorNIR hover:underline">
                              {item.title_img}
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/*  */}
          <div className="relative w-11/12 mx-auto mt-10 mb-24 rounded-lg bg-gradient-to-tl from-gray-900 to-gray-600 ">
            <div className="relative h-56 bg-indigo-600 rounded-lg sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
              <Image
                src={DealerBikeThree}
                // width="350px"
                alt="bike"
                layout="fill"
                objectFit="cover"
                className="rounded-l-lg "
              />

              {/* <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 mix-blend-multiply"></div> */}
            </div>
            <div className="relative max-w-md px-4 py-12 mx-auto sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
              <div className="md:ml-auto md:w-1/2 md:pl-10">
                <p className="mt-2 text-3xl font-light text-white sm:text-4xl">
                  {`Interested in becoming a dealer?`}
                </p>
                <div className="mt-3 text-lg font-light text-gray-300">
                  {`   If you are interested in becoming a Nireeka dealer or an
                authorized service center, please contact `}
                  <Link href="mailto:dealers@nireeka.com">
                    <a
                      target="_blank"
                      className="font-light text-blue-400 hover:text-customColorNIR"
                    >
                      {`dealers@nireeka.com`}
                    </a>
                  </Link>
                </div>
                <div className="flex justify-center mt-8 group-hover:text-customColorNIR md:flex md:justify-start ">
                  <div className="inline-flex rounded-md shadow ">
                    <Link href="mailto:dealers@nireeka.com" passHref>
                      <a className="inline-flex items-center justify-center px-5 py-3 font-light text-gray-900 bg-white border border-transparent rounded-md hover:ring-2 hover:ring-customColorNIR">
                        {`Apply`}
                        <svg
                          className="w-5 h-5 ml-3 -mr-1 text-gray-400 "
                          xmlns={`http://www.w3.org/2000/svg`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
}
