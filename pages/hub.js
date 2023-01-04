import { IconFreelance, IconTags, IconArrow } from "../assets/images";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";

const hubTopRow = [
  {
    label: " Add your Requirements",
    icon: IconFreelance,
    href: "/create-post-workseeker",
  },
  {
    label: "List your service",
    icon: IconFreelance,
    href: "/create-post-service",
  },
  {
    label: "Add a free Job Post",
    icon: IconFreelance,
    href: "/create-post-workgiver",
  },
  {
    label: "Do you need an app/website?",
    icon: IconFreelance,
    href: "/create-lead",
  },
];

export default function Hub() {
  const router = useRouter();
  return (
    <div className="w-full bg-neutral-100 min-h-screen h-max flex">
      <Sidebar selectedOption={1} />
      <div className="md:w-3/5 flex flex-col gap-6 border-2 rounded-lg p-8 mx-auto bg-white my-4">
        <section className="flex gap-4 items-center m-2">
          <button
            onClick={() => router.back()}
            className="m-2 hover:bg-neutral-200 p-2 rounded-md"
          >
            <Image
              src={IconArrow}
              width={"40"}
              height={"40"}
              alt="icon-arrow"
              style={{ width: "15px", height: "15px" }}
            />
          </button>
          <p className="font-semibold tracking-wide text-2xl">
            Add your Requirements
          </p>
        </section>

        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          {hubTopRow.map((hubOption, index) => {
            return (
              <Link
                key={index}
                href={hubOption.href}
                shallow
                // onClick={() => router.push(hubOption.href)}
                className="flex flex-col gap-2 items-center border-2 hover:border-primaryBlack p-4 rounded-md justify-center text-center basis-1/4 transition-all duration-100 "
              >
                <Image
                  src={hubOption.icon}
                  style={{ width: "30px", height: "30px" }}
                  width={"30"}
                  height={"30"}
                  alt="icon-browse"
                />

                <p> {hubOption.label} </p>
              </Link>
            );
          })}
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
          <Link
            href="/feed/service"
            className="flex justify-around p-4 border-2 rounded-md items-center hover:border-primaryBlack transition-all duration-100"
          >
            <Image
              src={IconFreelance}
              style={{ width: "50px", height: "50px" }}
              width={"30"}
              height={"30"}
              alt="icon-service"
            />

            <p className="font-semibold text-lg">Find Services</p>
          </Link>
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
