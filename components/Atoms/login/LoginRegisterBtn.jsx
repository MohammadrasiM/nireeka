import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "functions/classNames";

const LoginRegisterBtn = (props) => {
  const router = useRouter();

  return (
    <div className="flex justify-end space-x-6">
      <Link href={{ pathname: "/login", query: { nireekaContinue: router.asPath } }} passHref>
        <a className={classNames(
            "text-sm font-light cursor-pointer",
            props.mode === "dark" && "text-gray-900",
            props.mode === "light" && "text-white",
            props.className
          )}
        >
          Login
        </a>
      </Link>
    </div>
  );
};

export default LoginRegisterBtn;
