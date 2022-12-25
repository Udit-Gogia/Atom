import { useState, Fragment } from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { IconMenu, IconUser } from "../assets/images";
import Image from "next/image";
import { validateRes } from "./authFunctions";
import { useRouter } from "next/router";
import {
  rateUser,
  reportUser,
  reportPost,
  bookmarkPost,
  blockUser,
  deleteBookmark,
} from "./postFunctions";
import { checkPresence } from "./cards";
import { alertUser } from "./Modals";

export default function DropDown({
  id = null,
  token = null,
  username = null,
  profilePicUrl = null,
  createdById = null,
  bookmarkId = null,
  PostId = null,
  postType = null,
}) {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(5);

  function cancelRating() {
    setRating(5);
    setHover(5);
  }

  function checkBookmarkPost() {
    if (
      checkPresence(postType) &&
      checkPresence(bookmarkId) &&
      postType === "bookmark"
    ) {
      return true;
    } else {
      return false;
    }
  }
  function checkSelfPost() {
    if (checkPresence(postType) && postType === "self") {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="relative inline-block text-left">
      <Menu>
        <Menu.Button style={{ width: "20px" }}>
          <Image
            src={IconMenu}
            width={"20"}
            alt="icon-menu"
            style={{ width: "auto" }}
          />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 p-1 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
            {!checkBookmarkPost() && !checkSelfPost() && (
              <Menu.Item disabled={false}>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-neutral-100 underline"
                    } w-full rounded-md p-2`}
                    onClick={() => bookmarkPost(PostId)}
                  >
                    Bookmark Post
                  </button>
                )}
              </Menu.Item>
            )}
            {!checkSelfPost() && (
              <Menu.Item disabled={false}>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-neutral-100 underline"
                    } w-full rounded-md p-2`}
                    onClick={() => setIsOpen(true)}
                  >
                    Rate User
                  </button>
                )}
              </Menu.Item>
            )}
            {!checkSelfPost() && (
              <Menu.Item disabled={false}>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-neutral-100 underline"
                    } w-full rounded-md p-2`}
                    onClick={() => reportPost(PostId)}
                  >
                    Report Post
                  </button>
                )}
              </Menu.Item>
            )}

            {checkBookmarkPost() && (
              <Menu.Item disabled={false}>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-neutral-100 underline"
                    } w-full rounded-md p-2`}
                    onClick={async () => {
                      const { result } = await deleteBookmark(bookmarkId);
                      if (result != undefined) {
                        router.reload();
                      }
                    }}
                  >
                    Delete Bookmark
                  </button>
                )}
              </Menu.Item>
            )}
            {checkSelfPost() && (
              <Menu.Item disabled={false}>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-neutral-100 underline"
                    } w-full rounded-md p-2`}
                    onClick={() => alertUser("Delete Post api will be called")}
                  >
                    delete post
                  </button>
                )}
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-4">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    {username}
                  </Dialog.Title>

                  <Image
                    src={profilePicUrl || IconUser}
                    width={"60"}
                    height={"60"}
                    alt="user profile picture"
                    className="mx-auto rounded-full"
                  />

                  <div className="flex mx-auto">
                    {[...Array(10)].map((star, index) => {
                      index += 1;
                      return (
                        <button
                          type="button"
                          key={index}
                          className={`${
                            index <= ((rating && hover) || hover)
                              ? "text-yellow-300"
                              : "text-neutral-500"
                          } text-4xl `}
                          onClick={() => setRating(index)}
                          onMouseEnter={() => setHover(index)}
                          onMouseLeave={() => setHover(rating)}
                        >
                          <span className="star">&#9733;</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-around items-center gap-4">
                    <button
                      className="lg:text-lg sm:text-md sm:px-4 tracking-wide  basis-1/2 py-2 text-center border-2 border-[#191919] rounded-lg  hover:bg-neutral-200 transition px-12"
                      onClick={() => {
                        setIsOpen(false);
                        console.log(username);
                        cancelRating();
                      }}
                    >
                      cancel
                    </button>
                    <button
                      className="lg:text-lg sm:text-md sm:px-4 tracking-wide bg-[#191919] px-12 py-2  lg:border-2 border-[#191919] rounded-lg text-center text-white basis-1/2 hover:bg-[#404040] "
                      onClick={() => {
                        setIsOpen(false);
                        rateUser(createdById, rating);
                      }}
                    >
                      rate now
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
