import Sidebar from "../components/sidebar";
import callApi from "../components/callApi";
import { getUserDataObject } from "../components/authFunctions";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IconDelete, IconInfo } from "../assets/images";
import { DeleteMsgModal, MessageInfoModal } from "../components/Modals";
import InfiniteScroll from "react-infinite-scroll-component";
import { ChatCard, checkPresence, ShowChatCard } from "../components/cards";

async function fetchUnreadMessageCount(id) {
  const { result } = await callApi(
    "GET",
    `public/read-any-user-total-unread-message-count/${id}`
  );

  return result;
}

export default function Message() {
  const [unreadMsgCount, setUnreadMsgCount] = useState(0);
  const [allMessages, setAllMessages] = useState([]);
  const [isDeleteMsgOpen, setIsDeleteMsg] = useState(false);
  const [isInfoOpen, setIsInfoMsg] = useState(false);
  const chatsWith = [];
  const [chatlist, setChatList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  let [pageNumber, setPageNumber] = useState(1);
  const [showChatsWith, setShowChatsWith] = useState({});

  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const { userInfo } = getUserDataObject();
    getAllMessages();

    async function getMsgCount() {
      const res = await fetchUnreadMessageCount(userInfo?.id);
      setUnreadMsgCount(res[0]?.count);
    }
    getMsgCount();
  }, [chatlist]);

  async function getAllMessages() {
    pageNumber = 1;
    const { token, userInfo } = getUserDataObject();
    const { result: chatRes } = await callApi(
      "GET",
      `private/self/read-message-inbox/${pageNumber}`,
      token
    );

    const { id: selfId } = userInfo;

    checkPresence(chatRes) &&
      chatRes?.map((chat, idx) => {
        const {
          created_by_id,
          created_by_username,
          created_by_profile_pic_url,
          description,
          media_url,
          received_by_id,
          received_by_username,
          received_by_profile_pic_url,
          created_at,
        } = chat;

        const chatDetails =
          selfId === received_by_id
            ? {
                chattingWithId: created_by_id,
                username: created_by_username,
                profile: created_by_profile_pic_url,
                description,
                media_url,
                created_at,
              }
            : {
                chattingWithId: received_by_id,
                description,
                media_url,
                username: received_by_username,
                profile: received_by_profile_pic_url,
                created_at,
              };

        chatsWith.push(chatDetails);
        setChatList(chatsWith);

        Array.isArray(chatRes) && checkPresence(chatRes)
          ? setChatList(chatsWith)
          : setHasMore(false);
      });

    return;
  }
  const getMoreMessages = async () => {
    ++pageNumber;
    const { token } = getUserDataObject();
    const { result } = await callApi(
      "GET",
      `private/self/read-message-inbox/${pageNumber}`,
      token
    );

    checkPresence(result) && Array.isArray(result)
      ? setChatList((prevChats) => [...new Set([...prevChats, ...result])])
      : setHasMore(false);
    setPageNumber(pageNumber);
  };

  return (
    <div className="flex bg-neutral-100 w-full min-h-screen h-max ">
      <Sidebar selectedOption={3} />

      <div className="basis-5/12 flex flex-col gap-4 border-2 rounded-lg p-8 sm:mx-auto bg-white shadow-sm sm:w-full md:m-4 ">
        <div className="text-lg tracking-wide font-semibold pb-2  w-full border-b-2 flex justify-between ">
          <p>Message</p>

          {/* message heading , unread msgs , DeleteMsgModal , MessageInfoModal */}
          <div className="flex gap-2 items-center ">
            <p>{`${unreadMsgCount}`} new messages</p>
            <button
              className="p-2 hover:bg-neutral-200 rounded-md"
              onClick={() => setIsDeleteMsg(true)}
            >
              <Image
                src={IconDelete}
                alt="icon-delete"
                width={"25"}
                height={"25"}
                style={{ width: "20px", height: "20px" }}
              />
            </button>
            <DeleteMsgModal
              isOpen={isDeleteMsgOpen}
              setIsOpen={setIsDeleteMsg}
              setAllMessages={setAllMessages}
              setUnreadMessageCount={setUnreadMsgCount}
              setCurrChatList={setChatList}
            />
            <button
              className="p-2 hover:bg-neutral-200 rounded-md"
              onClick={() => setIsInfoMsg(true)}
            >
              <Image
                src={IconInfo}
                alt="icon-delete"
                width={"25"}
                height={"25"}
                style={{ width: "20px", height: "20px" }}
              />
              <MessageInfoModal isOpen={isInfoOpen} setIsOpen={setIsInfoMsg} />
            </button>
          </div>
        </div>
        {/* show all messages */}
        <section className="basis-1/2 flex flex-col">
          <InfiniteScroll
            dataLength={chatlist?.length}
            next={() => {
              getMoreMessages();
            }}
            hasMore={hasMore}
          >
            <div className="flex flex-col">
              {Array.isArray(chatlist) && checkPresence(chatlist) ? (
                chatlist.map((chat, idx) => {
                  return (
                    <ChatCard
                      key={idx}
                      chattingWithId={chat?.chattingWithId}
                      profilePicUrl={chat?.profile}
                      createdByUsername={chat?.username}
                      description={chat?.description}
                      createdAt={chat?.created_at}
                      hasMedia={checkPresence(chat?.media_url)}
                      setShowChat={setShowChat}
                      setShowChatsWith={setShowChatsWith}
                    />
                  );
                })
              ) : (
                <p>No more messages</p>
              )}
            </div>
          </InfiniteScroll>
        </section>
      </div>

      {/* show all messages */}
      <div
        className={`${
          showChat ? "" : "hidden"
        } basis-4/12 flex flex-col gap-4 border-2 border-neutral-300 rounded-lg sm:mx-auto bg-white shadow-sm sm:w-full md:m-4 max-w-[40vw]`}
      >
        <ShowChatCard
          showChat={showChat}
          setShowChat={setShowChat}
          showChatsWith={showChatsWith}
          setShowChatsWith={setShowChatsWith}
        />
      </div>
    </div>
  );
}
