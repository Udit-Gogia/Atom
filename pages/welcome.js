import { AboutCard } from "./about";
import Link from "next/link";
export default function Welcome() {
  return (
    <div className="bg-neutral-100 flex flex-col min-h-[90vh] ">
      <AboutCard />
      <Link
        href="/auth"
        className="text-lg tracking-wide font-semibold bg-primaryBlack text-white px-8 py-2 rounded-md transition-all duration-150  hover:bg-neutral-100 hover:text-primaryBlack border-2 border-primaryBlack hover:border-primaryBlack text-center w-1/2 mx-auto"
      >
        Proceed
      </Link>
    </div>
  );
}
