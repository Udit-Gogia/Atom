import { IconFreelance, IconTags } from "../assets/images";
import Link from "next/link";
import Image from "next/image";
export default function Hub() {
  return (
    <div className="w-full bg-neutral-100 min-h-screen h-max">
      <div className="md:w-3/5 flex flex-col gap-6 border-2 rounded-lg p-8 mx-auto bg-white my-4">
        <p className="font-semibold tracking-wide text-2xl">
          Add your Requirements
        </p>
        <div className="flex gap-4">
          <Link
            href={"/create-post-workseeker"}
            className="flex flex-col gap-2 items-center border-2 hover:border-primaryBlack p-4 rounded-md justify-center text-center basis-1/4 transition-all duration-100"
          >
            <Image
              src={IconFreelance}
              style={{ width: "30px", height: "30px" }}
              width={"30"}
              height={"30"}
              alt="icon-browse"
            />

            <p>Looking for a Job?</p>
          </Link>
          <Link
            href={"/create-post-service"}
            className="flex flex-col gap-2 items-center border-2 hover:border-primaryBlack p-4 rounded-md justify-center text-center basis-1/4 transition-all duration-100"
          >
            <Image
              src={IconFreelance}
              style={{ width: "30px", height: "30px" }}
              width={"30"}
              height={"30"}
              alt="icon-browse"
            />

            <p>List your service</p>
          </Link>
          <Link
            href={"/create-post-workgiver"}
            className="flex flex-col gap-2 items-center border-2 hover:border-primaryBlack p-4 rounded-md justify-center text-center basis-1/4 transition-all duration-100"
          >
            <Image
              src={IconFreelance}
              style={{ width: "30px", height: "30px" }}
              width={"30"}
              height={"30"}
              alt="icon-browse"
            />

            <p>Add a free Job Post</p>
          </Link>
          <Link
            href={"/create-lead"}
            className="flex flex-col gap-2 items-center border-2 hover:border-primaryBlack p-4 rounded-md justify-center text-center basis-1/4 transition-all duration-100"
          >
            <Image
              src={IconFreelance}
              style={{ width: "30px", height: "30px" }}
              width={"30"}
              height={"30"}
              alt="icon-browse"
            />

            <p>Do you need an app/website?</p>
          </Link>
        </div>

        <p className="font-semibold tracking-wide text-2xl">Browse</p>

        <div className="flex flex-col gap-4">
          <Link
            href="/feed/workseeker"
            className="flex justify-around p-4 border-2 rounded-md items-center hover:border-primaryBlack transition-all duration-100"
          >
            <Image
              src={IconFreelance}
              style={{ width: "50px", height: "50px" }}
              width={"30"}
              height={"30"}
              alt="icon-work"
            />

            <p className="font-semibold text-lg">Find Work</p>
          </Link>
          <section className="flex justify-around p-4 border-2 rounded-md items-center hover:border-primaryBlack transition-all duration-100">
            <Image
              src={IconFreelance}
              style={{ width: "50px", height: "50px" }}
              width={"30"}
              height={"30"}
              alt="icon-service"
            />

            <p className="font-semibold text-lg">Find Services</p>
          </section>
          <Link
            href="/feed/workgiver"
            className="flex justify-around p-4 border-2 rounded-md items-center hover:border-primaryBlack transition-all duration-100"
          >
            <Image
              src={IconFreelance}
              style={{ width: "50px", height: "50px" }}
              width={"30"}
              height={"30"}
              alt="icon-hire"
            />

            <p className="font-semibold text-lg">Hire Candidates</p>
          </Link>
          <Link
            href="/tags"
            className="flex justify-around p-4 border-2 rounded-md items-center hover:border-primaryBlack transition-all duration-100"
          >
            <Image
              src={IconTags}
              style={{ width: "50px", height: "50px" }}
              width={"30"}
              height={"30"}
              alt="icon-tags.js"
            />

            <p className="font-semibold text-lg">Trending Tags</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
