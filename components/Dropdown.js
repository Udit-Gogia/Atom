import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IconMenu } from "../assets/images";
import Image from "next/image";
import { useRouter } from "next/router";
import { bookmarkPost, deleteBookmark } from "./postFunctions";
import { checkPresence } from "./cards";
import {
  alertUser,
  BlockUser,
  RateUser,
  ReportPost,
  ReportUser,
  DeleteAllMessagesWithUser,
} from "./Modals";

export default function DropDown({
  id = null,
  token = null,
  username = null,
  profilePicUrl = null,
  createdById = null,
  bookmarkId = null,
  PostId = null,
  type = null,
}) {
  const router = useRouter();
  let [isRateUserOpen, setIsRateUserOpen] = useState(false);
  let [isReportPostOpen, setIsReportPostOpen] = useState(false);
  let [isReportUserOpen, setIsReportUserOpen] = useState(false);
  const [isBlockUserOpen, setIsBlockUserOpen] = useState(false);
  const [isDeleteAllMsgsWithUser, setIsDeleteAllMsgsWithUser] = useState(false);

  function checkBookmarkPost() {
    if (
      checkPresence(type) &&
      checkPresence(bookmarkId) &&
      type === "bookmark"
    ) {
      return true;
    } else {
      return false;
    }
  }
  function checkSelfPost() {
    if (checkPresence(type) && type === "self") {
      return true;
    } else {
      return false;
    }
  }

  function checkChats() {
    if (checkPresence(type) && type === "chats") {
      return true;
    } else {
      return false;
    }
  }

  function checkAll() {
    if (checkBookmarkPost() && checkChats() && checkSelfPost()) {
      console.log("supports all types");
      return true;
    } else return false;
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
            {/* bookmark post */}
            {!checkBookmarkPost() && !checkSelfPost() && !checkChats() ? (
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
            ) : null}

            {/* rate user */}
            {!checkSelfPost() && (
              <Menu.Item disabled={false}>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-neutral-100 underline"
                    } w-full rounded-md p-2`}
                    onClick={() => setIsRateUserOpen(true)}
                  >
                    Rate User
                  </button>
                )}
              </Menu.Item>
            )}

            {/* report post */}
            {!checkSelfPost() && !checkChats() && (
              <Menu.Item disabled={false}>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-neutral-100 underline"
                    } w-full rounded-md p-2`}
                    onClick={() => setIsReportPostOpen(true)}
                  >
                    Report Post
                  </button>
                )}
              </Menu.Item>
            )}
            {/* delete bookmark */}
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
            {/* delete post */}
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
            {/* report user */}
            {checkChats() && (
              <Menu.Item disabled={false}>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-neutral-100 underline"
                    } w-full rounded-md p-2`}
                    onClick={() => setIsReportUserOpen(true)}
                  >
                    Report user
                  </button>
                )}
              </Menu.Item>
            )}
            {/* block user */}
            {checkChats() && (
              <Menu.Item disabled={false}>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-neutral-100 underline"
                    } w-full rounded-md p-2`}
                    onClick={() => setIsBlockUserOpen(true)}
                  >
                    Block user
                  </button>
                )}
              </Menu.Item>
            )}

            {/* delete all messages */}
            {checkChats() && (
              <Menu.Item disabled={false}>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-neutral-100 underline"
                    } w-full rounded-md p-2`}
                    onClick={() => setIsDeleteAllMsgsWithUser(true)}
                  >
                    Delete all messages
                  </button>
                )}
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>

      <RateUser
        isOpen={isRateUserOpen}
        setIsOpen={setIsRateUserOpen}
        username={username}
        profilePicUrl={profilePicUrl}
        createdById={createdById}
      />

      <BlockUser
        isOpen={isBlockUserOpen}
        setIsOpen={setIsBlockUserOpen}
        userDetails={{ createdById, username }}
      />

      <ReportPost
        isOpen={isReportPostOpen}
        setIsOpen={setIsReportPostOpen}
        postDetails={{ PostId }}
      />

      <ReportUser
        isOpen={isReportUserOpen}
        setIsOpen={setIsReportUserOpen}
        reportingUserId={createdById}
      />

      <DeleteAllMessagesWithUser
        isOpen={isDeleteAllMsgsWithUser}
        setIsOpen={setIsDeleteAllMsgsWithUser}
        userDetails={{ createdById, username }}
      />
    </div>
  );
}
