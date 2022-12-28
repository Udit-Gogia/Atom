import Link from "next/link";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { IconSetting, IconUser, IconStar } from "../assets/images";
import { useEffect, useState } from "react";
import { getUserDataObject } from "../components/authFunctions";
import { checkPresence } from "../components/cards";
import ShowPosts from "../components/showPosts";
import Sidebar from "../components/sidebar";
import ShowSelfPosts from "../components/selfPostComponent";

export default function Profile() {
  const [activeOption, setActiveOption] = useState(0);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const { userInfo } = getUserDataObject();
    const { username, profile_pic_url, rating } = userInfo;
    setUserData({ username, profile_pic_url, rating });
  }, []);
  return (
    <div className="flex bg-neutral-100 w-full min-h-screen h-max">
      <Sidebar selectedOption={4} />
      <div className="md:w-1/2 flex flex-col gap-6 border-2 rounded-lg p-8 mx-auto bg-white my-4 shadow-sm">
        {/* header starts*/}

        <div className="flex m-2 justify-between border-b-2 items-center">
          <p className="text-xl tracking-wide font-semibold pb-2 w-full ">
            My Profile
          </p>
        </div>

        <div className="flex gap-4">
          {checkPresence(userData?.profile_pic_url) ? (
            <Image
              src={userData?.profile_pic_url}
              alt={userData?.username || "icon"}
              className="rounded-full "
              width="50"
              height="50"
              style={{ width: "auto", height: "auto" }}
            />
          ) : (
            <Image
              src={IconUser}
              alt={userData?.username}
              className="rounded-full"
              style={{ width: "auto", height: "auto" }}
              width="50"
              height="50"
            />
          )}

          <div className="grid grid-cols-1">
            {checkPresence(userData?.username) && (
              <p className="text-xl">{userData?.username}</p>
            )}

            {checkPresence(toString(userData?.rating)) && (
              <p className="flex items-center">
                <Image
                  src={IconStar}
                  alt="icon-rating"
                  width={"20"}
                  height={"20"}
                  style={{ width: "20px", height: "20px" }}
                />
                <span className="mx-2 text-lg">{userData?.rating}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <Link
            href="/my-profile"
            className="border-2 rounded-md px-4 py-2 border-primaryBlack active:underline hover:underline"
          >
            My Profile Info
          </Link>
          <Link
            href="/my-login-info"
            className="border-2 rounded-md px-4 py-2 border-primaryBlack active:underline hover:underline"
          >
            My Login Info
          </Link>
          <Link
            href="/settings"
            className="border-2 rounded-md px-2 py-1 border-primaryBlack"
          >
            <Image
              src={IconSetting}
              width={"30"}
              height={"30"}
              style={{ width: "30px", height: "30px" }}
              alt="icon-setting"
            />
          </Link>
        </div>

        <Tab.Group>
          <Tab.List className="bg-neutral-100 rounded-xl flex justify-evenly">
            <Tab
              className={`p-2 m-2 text-lg`}
              id={0}
              onClick={() => setActiveOption(0)}
              style={
                0 === activeOption
                  ? { textDecoration: "underline", fontWeight: "600" }
                  : null
              }
            >
              My Post
            </Tab>
            <Tab
              className="p-2 m-2 text-lg"
              id={1}
              onClick={() => setActiveOption(1)}
              style={
                1 === activeOption
                  ? { textDecoration: "underline", fontWeight: "600" }
                  : null
              }
            >
              My Bookmark
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <ShowSelfPosts url={"private/self/read-post"} type={"self"} />
            </Tab.Panel>

            <Tab.Panel>
              <ShowSelfPosts
                url={"private/self/read-bookmark-post"}
                type={"bookmark"}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
