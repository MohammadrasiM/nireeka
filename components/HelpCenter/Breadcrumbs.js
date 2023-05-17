import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Breadcrumbs(articles) {
  const router = useRouter();

  return (
    <div className="w-full px-3 mx-auto lg:w-8/12">
      <nav className="w-full py-6 rounded lg:pt-6 lg:pb-4 bg-grey-light">
        <ul className="flex list-reset text-grey-dark">
          <Link href="/help-center" passHref>
            <a className="font-light text-blue ">
              <li className="flex">
                <div className="w-8 h-8 ">
                  <Image
                    src="https://api.nireeka.com/images/logo.jpg"
                    alt="logo"
                    width={25}
                    height={25}
                    className="mt-2 rounded-full "
                  />{" "}
                </div>
                <h6>Home</h6>
              </li>
            </a>
          </Link>
          <li>
            <span className="mx-2 font-light">{`>`}</span>
          </li>
          {articles.data.slug ? (
            <>
              {" "}
              <Link
                href={`/help-center/category/${articles.data.slug}`}
                passHref
              >
                <a className="font-light text-blue">
                  <li>{articles.data.title}</li>
                </a>
              </Link>
            </>
          ) : (
            <Link href={router.asPath} passHref>
              <a className="font-light text-blue">
                <li>{articles.data.title}</li>
              </a>
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
}
