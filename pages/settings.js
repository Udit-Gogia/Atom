import Link from "next/link";
import Image from "next/image";

import {
  IconInfo,
  IconPolicy,
  IconContactUs,
  IconSuggestAFeature,
  IconRating,
  IconLogout,
  IconArrow,
  IconDelete,
} from "../assets/images";
import { useRouter } from "next/router";

export default function Settings() {
  const router = useRouter();
  const pageList = [
    {
      icon: IconContactUs,
      label: "contact us ",
      redirect: "/contact-us",
    },
    {
      icon: IconSuggestAFeature,
      label: "suggest a feature",
      redirect: "/suggest-a-feature",
    },
    {
      icon: IconInfo,
      label: "about atom",
      redirect: "/about",
    },
    {
      icon: IconRating,
      label: "rate atom",
      redirect: "/rate-atom",
    },
    {
      icon: IconPolicy,
      label: "policy",
      redirect: "/policy",
    },
    {
      icon: IconLogout,
      label: "signout",
      redirect: "/signout",
    },
    {
      icon: IconDelete,
      label: "delete my account",
      redirect: "/delete-my-account",
    },
  ];

  return (
    <div className="w-full bg-neutral-100 min-h-screen h-fit">
      <div className="md:w-1/2 flex flex-col gap-4 border-2 rounded-lg p-8 mx-auto bg-white my-4 ">
        <section className="flex gap-4 items-center m-2">
          <button onClick={() => router.back()} className="m-2">
            <Image
              src={IconArrow}
              width={"40"}
              height={"40"}
              alt="icon-arrow"
              style={{ width: "15px", height: "15px" }}
            />
          </button>
          <p className="text-xl tracking-wide font-semibold pb-2 w-full ">
            Settings
          </p>
        </section>
        {pageList?.map((page, index) => {
          return (
            <Link
              key={index}
              href={page.redirect}
              className="flex  bg-white p-2 gap-4 hover:bg-neutral-100 items-center  hover:shadow-md border-b-2 border-neutral-300"
            >
              <Image
                src={page?.icon}
                alt="page-icon"
                width={"20"}
                height={"20"}
                style={{ width: "auto", margin: "0 1rem" }}
              />
              <p className="text-xl tracking-wide font-medium">{page.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
