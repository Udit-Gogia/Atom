import Link from "next/link";
import Image from "next/image";
import Sidebar from "../components/sidebar";
import { getUserDataObject } from "../components/authFunctions";
import { alertUser } from "../components/Modals";
import { IconMyProfile, IconLogin, IconFeed } from "../assets/images";
import { useEffect, useState } from "react";

export default function My() {
  const [isLoggedin, setIsLoggedin] = useState();
  useEffect(() => {
    var { isAuth } = getUserDataObject();
    setIsLoggedin(isAuth);
  }, []);
  const pageList = [
    {
      icon: IconMyProfile,
      label: "my profile",
      redirect: "/my-profile",
    },
    {
      icon: IconLogin,
      label: "my login info",
      redirect: "/my-login-info",
    },
    {
      icon: IconFeed,
      label: "my post",
      redirect: "/my-post",
    },
    {
      icon: IconFeed,
      label: "my bookmark",
      redirect: "/my-bookmark",
    },
  ];

  return (
    <div className="flex bg-neutral-100 w-full min-h-screen h-max">
      <Sidebar selectedOption={3} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full p-8 pl-0 ">
        {pageList?.map((page, index) => {
          return (
            <Link
              onClick={() => {
                if (!isLoggedin) {
                  alertUser("login to continue");
                }
              }}
              key={index}
              href={!isLoggedin ? "/my" : page.redirect}
              className="flex flex-col bg-white p-4 gap-4 rounded-md hover:border-primaryBlack items-center justify-center hover:shadow-xl border-t-8 md:h-[15rem]"
            >
              <Image
                src={page?.icon}
                alt="page-icon"
                width={"35"}
                height={"35"}
                style={{ width: "auto" }}
              />
              <p className="text-xl tracking-wide font-semibold sm:text-center">
                {page.label}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
