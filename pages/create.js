import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { getUserDataObject } from "../components/authFunctions";
import { alertUser } from "../components/Modals";

export default function Create() {
  const [isLoggedin, setIsLoggedin] = useState();

  useEffect(() => {
    var { isAuth } = getUserDataObject();
    setIsLoggedin(isAuth);
  }, []);
  const createPostDetails = [
    {
      label: "Share your random thoughts",
      redirect: "/create-post",
    },
    {
      label: "Share a meme",
      redirect: "/create-post-meme",
    },
    {
      label: "Looking for a job?",
      redirect: "/create-post-workseeker",
    },
    {
      label: "Looking to hire?",
      redirect: "/create-post-workgiver",
    },
    {
      label: "List your service ",
      redirect: "/create-post-service",
    },
    {
      label: "Do you need an app/website",
      redirect: "/create-lead",
    },
  ];

  return (
    <div className="flex bg-neutral-100 min-w-max min-h-screen h-max ">
      <Sidebar selectedOption={2} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full p-8 ">
        {createPostDetails.map((createPost, index) => {
          return (
            <Link
              onClick={() => {
                if (!isLoggedin) {
                  alertUser("login to continue");
                }
              }}
              key={index}
              href={!isLoggedin ? "/create" : createPost.redirect}
              className="flex flex-col  bg-white p-4 rounded-md border-t-8 hover:border-primaryBlack items-center justify-center hover:shadow-xl font-semibold tracking-wide text-lg md:text-xl text-center md:h-[15rem] "
            >
              {createPost.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
