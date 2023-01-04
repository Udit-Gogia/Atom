import { AboutCard } from "./about";
import Link from "next/link";
export default function Welcome() {
  return (
    <div className="bg-neutral-100 flex flex-col min-h-[90vh]">
      <section className="w-1/2 mx-auto">
        <AboutCard />
        <section className="w-full flex flex-col justify-center">
          <Link
            href="/auth"
            className="mx-auto w-full p-2 bg-primaryBlack text-white border-primaryBlack text-center rounded-md transition-a;; duration-150 hover:bg-[#404040]   border-2"
          >
            Proceed
          </Link>
        </section>
      </section>
    </div>
  );
}
