import Link from "next/link";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { IconSetting, IconUser, IconStar } from "../assets/images";
import { useEffect, useState } from "react";
import {
  getUserDataFromApi,
  getUserDataObject,
} from "../components/authFunctions";
import { checkPresence, getTimeDifference } from "../components/cards";
import ShowPosts from "../components/showPosts";
import Sidebar from "../components/sidebar";
import ShowSelfPosts from "../components/selfPostComponent";
import callApi from "../components/callApi";

export default function Profile() {
  const [activeOption, setActiveOption] = useState(0);
  const [userData, setUserData] = useState();
  const [basicInfo, setBasicInfo] = useState();

  useEffect(() => {
    async function getUserData() {
      const result = await getUserDataFromApi();

      const { username, profile_pic_url, rating } = result;
      setUserData({ username, profile_pic_url, rating });
    }
    getUserData();
    getBasicInfo();
  }, []);

  async function getBasicInfo() {
    const { userInfo } = getUserDataObject();
    const { id } = userInfo;

    const { result } = await callApi("GET", `public/read-any-user-data/${id}`);
    const {
      post_count_total: postCount,
      like_count_total: likeCount,
      user,
    } = result;

    setBasicInfo({ postCount, likeCount, createdAt: user.created_at });
  }
  return (
    <div className="flex bg-neutral-100 w-full min-h-screen h-max">
      <Sidebar selectedOption={4} />
      <div className="md:w-1/2 flex flex-col gap-6 border-2 rounded-lg p-8 mx-auto bg-white my-4 shadow-sm">
        {/* header starts*/}

        <p className="text-xl m-2  border-b-2  tracking-wide font-semibold pb-2 w-full ">
          My Profile
        </p>

        {/* my profile */}
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
              alt={userData?.username || "icon"}
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

        {/* three buttons */}
        <div className="flex gap-4 items-center w-full">
          <Link
            href="/my-profile"
            className="border-2 rounded-md px-4 py-2 border-primaryBlack active:underline hover:underline basis-1/3 text-center"
          >
            My Profile Info
          </Link>
          <Link
            href="/my-login-info"
            className="border-2 rounded-md px-4 py-2 border-primaryBlack active:underline hover:underline basis-1/3 text-center"
          >
            My Login Info
          </Link>
          <Link
            href="/settings"
            className="border-2 rounded-md px-2 py-1 border-primaryBlack basis-1/3 "
          >
            <Image
              src={IconSetting}
              width={"30"}
              height={"30"}
              style={{ width: "30px", height: "30px", margin: "0 auto" }}
              alt="icon-setting"
            />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <section className="grid text-center">
            <p className="text-neutral-500">Days on Atom</p>
            <p className="font-semibold text-xl">
              {" "}
              {getTimeDifference(basicInfo?.createdAt, "days")}{" "}
            </p>
          </section>
          <section className="grid text-center">
            <p className="text-neutral-500">Total Posts</p>
            <p className="font-semibold text-xl">{basicInfo?.postCount}</p>
          </section>
          <section className="grid text-center">
            <p className="text-neutral-500">Total Likes</p>
            <p className="font-semibold text-xl"> {basicInfo?.likeCount} </p>
          </section>
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
