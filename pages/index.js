import Image from "next/image";
import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Welcome from "./welcome";
import { Tab } from "@headlessui/react";
import ShowPosts from "../components/showPosts";
import parseTag, { tagName } from "../components/parseTag";
import { checkPresence } from "../components/cards";
import { useRouter } from "next/router";
import { MandatoryCheck } from "../components/Modals";

export default function Home() {
  const [isAuth, setAuth] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState();

  useEffect(() => {
    const userDataObject = JSON.parse(localStorage.getItem("userData"));
    userDataObject?.hasOwnProperty("token") ? setAuth(true) : setAuth(false);
    setUsername(userDataObject?.userInfo?.username);

    if (
      !userDataObject?.mandatory_check ||
      !(
        checkPresence(userDataObject?.userInfo.designation) &&
        checkPresence(userDataObject?.userInfo.country) &&
        checkPresence(userDataObject?.userInfo.tag) &&
        checkPresence(userDataObject?.userInfo.profile_pic_url)
      )
    ) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  });
  const router = useRouter();
  const [activeOption, setActiveOption] = useState(0);
  return (
    <div>
      {isAuth ? (
        <div className="flex bg-neutral-100 w-full min-h-screen ">
          <Sidebar />
          <MandatoryCheck
            isOpen={isOpen}
            username={username}
            setIsOpen={setIsOpen}
          />
          <div className="w-full flex flex-col ">
            <Tab.Group>
              <Tab.List>
                <Tab
                  className={`p-2 m-4 lg:w-32  text-xl`}
                  id={0}
                  onClick={() => setActiveOption(0)}
                  style={
                    0 === activeOption
                      ? { textDecoration: "underline", fontWeight: "600" }
                      : null
                  }
                >
                  Fresh
                </Tab>
                <Tab
                  className="p-2 m-4 lg:w-32 text-xl"
                  id={1}
                  onClick={() => setActiveOption(1)}
                  style={
                    1 === activeOption
                      ? { textDecoration: "underline", fontWeight: "600" }
                      : null
                  }
                >
                  Most Liked
                </Tab>
                <Tab
                  className="p-2 m-4 lg:w-32 text-xl"
                  id={2}
                  onClick={() => setActiveOption(2)}
                  style={
                    2 === activeOption
                      ? { textDecoration: "underline", fontWeight: "600" }
                      : null
                  }
                >
                  Trending
                </Tab>
              </Tab.List>
              <Tab.Panels>
                {/* fresh posts starts */}

                <Tab.Panel>
                  {checkPresence(tagName) && (
                    <div className="lg:mr-3 bg-zinc-200 text-md tracking-wide w-fit px-2 py-1 rounded-sm border-l-2 border-[#191919] my-2 flex">
                      <p>{tagName}</p>
                      <button
                        type="button"
                        className="ml-2"
                        onClick={() => {
                          parseTag(null);
                          router.reload();
                        }}
                      >
                        X
                      </button>
                    </div>
                  )}
                  <ShowPosts feedType={"fresh"} />
                </Tab.Panel>
                {/* fresh posts ends */}
                {/* most liked posts starts */}
                <Tab.Panel>
                  {checkPresence(tagName) && (
                    <div className="lg:mr-3 bg-zinc-200 text-md tracking-wide w-fit px-2 py-1 rounded-sm border-l-2 border-[#191919] my-2 flex">
                      <p>{tagName}</p>
                      <button
                        type="button"
                        className="ml-2"
                        onClick={() => {
                          parseTag(null);
                          router.reload();
                        }}
                      >
                        X
                      </button>
                    </div>
                  )}
                  <ShowPosts feedType={"most_liked"} />
                </Tab.Panel>
                {/* most liked posts ends */}
                {/* trending posts starts */}
                <Tab.Panel>
                  {checkPresence(tagName) && (
                    <div className="lg:mr-3 bg-zinc-200 text-md tracking-wide w-fit px-2 py-1 rounded-sm border-l-2 border-[#191919] my-2 flex">
                      <p>{tagName}</p>
                      <button
                        type="button"
                        className="ml-2"
                        onClick={() => {
                          parseTag(null);
                          router.reload();
                        }}
                      >
                        X
                      </button>
                    </div>
                  )}
                  <ShowPosts feedType={"trending"} />
                </Tab.Panel>
                {/* trending posts ends */}
              </Tab.Panels>
            </Tab.Group>
            {/* <ShowPosts feedType={"fresh"} /> */}
          </div>
        </div>
      ) : (
        <Welcome />
      )}
    </div>
  );
}
