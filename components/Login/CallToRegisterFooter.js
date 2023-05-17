import Link from "next/link";

export default function CallToRegisterFooter() {
  return (
    <div className="w-full">
      <div>
        <p className="font-light text-gray-500 font-exo">Not a Member?</p>
      </div>
      <div className="text-xl font-light text-nireekaOrange hover:text-gray-700 transition-all">
        <Link href="/register">
          <a className="font-exo">Join The Nireeka Community</a>
        </Link>
      </div>
    </div>
  );
}
