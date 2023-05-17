import Link from "next/link";
import classNames from "../../../functions/classNames";

const ConditionalLink = ({
  children,
  href,
  condition,
  className,
  noAnchor,
}) => {
  return condition && href && href !== "" ? (
    <Link href={href} passHref>
      {noAnchor ? (
        <span className={classNames(className)}>{children}</span>
      ) : (
        <a className={classNames(className)}>{children}</a>
      )}
    </Link>
  ) : (
    <>{children}</>
  );
};

export default ConditionalLink;
