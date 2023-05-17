import Link from "next/link";

export default function CallToLoginFooter() {
  return (
    <div className="w-full">
      <div>
        <p className="font-light text-gray-500 font-exo">Already a Nireeka Member?</p>
      </div>
      <div className="text-xl font-light font-exo text-nireekaOrange hover:text-gray-700 transition-all">
        <Link href="/login">
          <a className="font-exo">Sign-in Here</a>
        </Link>
      </div>
    </div>
  );
}
