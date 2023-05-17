import Image from "next/image";
import Link from "next/link";
export default function AuthPageLayout({ title, description, children, footer }) {
  return (
    <div className="flex flex-col items-center py-4 sm:my-10 sm:px-6 lg:px-8">
      <div className="w-full sm:mx-auto sm:max-w-lg">
        <div className="sm:shadow sm:border sm:rounded-3xl bg-white">
          <div className="mt-8">
            <div className="flex flex-col items-center justify-center px-4 sm:px-10">
              <Link href="/">
                <a>
                  <Image
                    height={80}
                    width={80}
                    className="h-20 mx-auto cursor-pointer rounded-3"
                    src="/images/logos/nireeka-red.svg"
                    alt="Nireeka"
                  />
                </a>
              </Link>

              {!!title && (
                <h2 className="mt-6 text-3xl font-light text-center font-exo text-nireekaOrange">
                  {title}
                </h2>
              )}
              {!!description && (
                <p className="mt-2 text-center">
                  <span className="font-light font-exo text-gray-500">{description}</span>
                </p>
              )}
            </div>

            {/* Dynamic Content */}
            {!!children ? <div className="space-y-8 py-8 px-4 sm:px-10 font-exo">{children}</div> : null}

            {/* Dynamic jsx Footer */}
            {!!footer ? (
              <div className="px-4 py-8 sm:px-10 bg-gray-200 sm:rounded-b-3xl shadow">{footer}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
