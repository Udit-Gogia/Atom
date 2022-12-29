import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import parseTag from "./parseTag";
import { likePost, verifyLikedPosts } from "./postFunctions";
import { useRouter } from "next/router";
import { handleFileInput } from "./fileFunctions";
import InfiniteScroll from "react-infinite-scroll-component";
import { CreateModal } from "./Modals";
import DropDown from "./Dropdown";
import callApi from "./callApi";
import {
  IconUser,
  IconStar,
  IconPdf,
  IconLike,
  IconComment,
  IconChat,
  IconLiked,
  IconImage,
  IconSend,
  IconDownload,
  IconArrow,
} from "../assets/images";
import { getUserDataObject, validateRes } from "./authFunctions";

export function checkPresence(ele) {
  return ele != "undefinedundefined" &&
    ele != [] &&
    ele != "nullnull" &&
    ele != "string" &&
    ele &&
    ele != undefined &&
    ele != null &&
    ele != "no data" &&
    ele != ["no data"] &&
    ele != ""
    ? true
    : false;
}

export function CompanyCard({ title, description, media, link, tags }) {
  return (
    <div className="flex flex-col gap-6 min-w-fit md:mx-auto w-1/2 my-4 p-4 mx-4 border-2 rounded-md bg-white ">
      {checkPresence(title) && (
        <p className="text-3xl font-semibold tracking-wide">{title}</p>
      )}

      {checkPresence(description) && <p className="text-md ">{description}</p>}

      {checkPresence(media) && (
        <Image
          src={`${media}`}
          alt={`image-${title}`}
          width="350"
          height="300"
          className="rounded-md object-cover mx-auto"
          style={{ width: "auto", height: "auto" }}
          priority={true}
        />
      )}

      {checkPresence(link) && (
        <p className="">
          Link{" "}
          <Link
            className="mx-1 text-blue-500 "
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            {link}
          </Link>
        </p>
      )}

      {checkPresence(tags) && (
        <div className="flex gap-3">
          {tags?.map((tag, index) => {
            return (
              <p
                key={index}
                className="bg-neutral-200 text-lg tracking-wide w-fit px-2 py-1 rounded-lg"
              >
                {tag}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SidebarCard({
  sidebarSection,
  index,
  isActiveIndex,
  setActiveOption,
  isCreate,
}) {
  const [isOpen, setIsOpen] = useState(false);
  if (!isCreate) {
    return (
      <Link
        href={sidebarSection.href}
        className={`flex items-center py-4 px-4 md:px-8 w-full  ${
          index == isActiveIndex
            ? "bg-white rounded-r-full shadow-sm"
            : "bg-neutral-100 hover:bg-neutral-200 hover:rounded-r-full "
        }`}
        onClick={() => setActiveOption(index)}
      >
        <Image
          src={sidebarSection.src}
          alt={sidebarSection.alt}
          width="26"
          height="26"
          className="mx-2"
          style={{ width: "auto" }}
        />

        <p className="mx-2">{sidebarSection.display}</p>
      </Link>
    );
  } else {
    return (
      <div>
        <button
          className={`flex items-center py-4 px-4 md:px-8 w-full ${
            index == isActiveIndex
              ? "bg-white rounded-r-full shadow-sm"
              : "bg-neutral-100 hover:bg-neutral-200 hover:rounded-r-full"
          }`}
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={sidebarSection.src}
            alt={sidebarSection.alt}
            width="26"
            height="26"
            className="mx-2"
            style={{ width: "auto" }}
          />

          <p className="mx-2">{sidebarSection.display}</p>
        </button>
        <CreateModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    );
  }
}

export const getTimeDifference = (date, format = null) => {
  const formattedDate = Date.parse(date);
  const currDate = new Date();
  const formattedCurrDate = Date.parse(currDate);
  const timeDiffInSeconds = (formattedCurrDate - formattedDate) / 1000;

  switch (format) {
    case "days":
      return parseInt(parseInt(timeDiffInSeconds / 86400));
      break;
  }

  if (timeDiffInSeconds < 60) {
    return "right now";
  } else if (timeDiffInSeconds >= 60 && timeDiffInSeconds < 3600) {
    return `${parseInt(timeDiffInSeconds / 60)}m`;
  } else if (timeDiffInSeconds >= 3600 && timeDiffInSeconds < 86400) {
    return `${parseInt(timeDiffInSeconds / 3600)}h`;
  } else if (timeDiffInSeconds >= 86400 && timeDiffInSeconds < 2592000) {
    return `${parseInt(timeDiffInSeconds / 86400)}d`;
  } else if (timeDiffInSeconds >= 2592000 && timeDiffInSeconds < 31104000) {
    return `${parseInt(timeDiffInSeconds / 2592000)}mo`;
  }

  return "show time diff";
};

export function CommentCard({
  description,
  createdAt,
  createdByProfilePicUrl,
  mediaUrl,
  createdById,
  createdByUsername,
}) {
  return (
    <div className="flex w-full gap-2 h-fit">
      <section>
        <Image
          src={createdByProfilePicUrl || IconUser}
          width={"40"}
          height={"40"}
          style={{ width: "40px", height: "40px" }}
          alt="user-img"
          className="rounded-full"
        />
      </section>

      <section className="flex flex-col gap-4 p-4 w-full bg-white rounded-md h-fit">
        <section className="flex justify-between">
          <p className="font-semibold text-lg">{createdByUsername}</p>
          <p className="ml-auto">{getTimeDifference(createdAt)}</p>
        </section>

        {checkPresence(description) && (
          <p className="text-left text-lg whitespace-pre-wrap text-neutral-700">
            {description}
          </p>
        )}

        {checkPresence(mediaUrl) && (
          <Image
            src={mediaUrl}
            width={"100"}
            height={"100"}
            style={{ width: "100px", height: "100px" }}
            alt="comment-media"
          />
        )}
      </section>
    </div>
  );
}

export function ChatCard({
  profilePicUrl,
  createdByUsername,
  description,
  createdAt,
  chattingWithId,
  setShowChat,
  hasMedia,
  setShowChatsWith,
}) {
  return (
    <button
      className="flex gap-4 border-2 rounded-md items-center p-2 mb-2 hover:shadow-md justify-start"
      onClick={() => {
        setShowChat(true);
        setShowChatsWith({
          username: createdByUsername,
          id: chattingWithId,
          profilePicUrl: profilePicUrl ? profilePicUrl : IconUser,
        });
      }}
    >
      <section>
        <Image
          src={profilePicUrl || IconUser}
          alt="icon-user"
          width={"50"}
          height={"50"}
          style={{ width: "auto", height: "auto" }}
        />
      </section>

      <section className="flex flex-col gap-2 w-full">
        <div className="w-full flex ">
          <span className="font-medium text-lg">{createdByUsername}</span>

          <span className="text-neutral-400 ml-auto mr-4">
            {getTimeDifference(createdAt)}
          </span>
        </div>

        {checkPresence(description) && (
          <p
            className="text-left text-neutral-600 text-md"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "26rem",
              whiteSpace: "pre",
            }}
          >
            {description}
          </p>
        )}

        {checkPresence(hasMedia) && !checkPresence(description) ? (
          <p className="text-left text-neutral-400 ">media</p>
        ) : null}
      </section>
    </button>
  );
}

export function ShowChatCard({ showChat, setShowChat, showChatsWith }) {
  const [displayComments, setDisplayComments] = useState([]);
  let [newComments, setNewComments] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  let [moreComments, setMoreComments] = useState(true);
  const [textMessage, setTextMessage] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(null);

  const inputRef = useRef(null);

  const initiateFileInput = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    renderChats();
    const { userInfo } = getUserDataObject();
    const { id } = userInfo;
    setUserId(id);
  }, [showChatsWith.username, showChatsWith.id]);

  const renderChats = async () => {
    if (showChatsWith?.id) {
      pageNumber = 1;
      const { token } = getUserDataObject();

      const { result } = await callApi(
        "GET",
        `private/self/read-message-thread/${showChatsWith?.id}/${pageNumber}`,
        token
      );

      await setDisplayComments(result);

      setMoreComments(checkPresence(result) && Array.isArray(result));

      return pageNumber;
    }
  };

  const getMoreChats = async () => {
    pageNumber++;
    const { token } = getUserDataObject();
    const { result: res } = await callApi(
      "GET",
      `private/self/read-message-thread/${showChatsWith.id}/${pageNumber}`,
      token
    );

    if (res != "no data") {
      if (res[0]?.post_id === 10) {
        await setMorePosts(false);
      }

      if (res?.length != 0) {
        (await Array.isArray(res)) &&
          setDisplayComments((displayComments) => [...displayComments, ...res]);
      }
    } else {
      setMoreComments(false);
    }
    setMoreComments(checkPresence(res) && Array.isArray(res));
  };

  const submitFunction = async () => {
    const { token } = getUserDataObject();
    const data = { received_by_id: showChatsWith.id };
    if (checkPresence(file)) {
      data["media_url"] = file;
    }
    if (checkPresence(textMessage)) {
      data["description"] = textMessage;
    }

    const { response, result } = await callApi(
      "POST",
      "private/all/create-message",
      token,
      JSON.stringify(data)
    );

    validateRes(response, result);

    result?.status;
    if (result?.status) {
      renderChats();
      setFile(null);
      await setTextMessage("");
    }
  };

  return (
    <div className={`${showChat ? "" : "hidden"} flex flex-col h-full `}>
      <div className=" flex gap-4 p-2 items-center rounded-t-md border-b-2 border-neutral-300">
        <button onClick={() => setShowChat(false)}>
          <Image
            src={IconArrow}
            width={"25"}
            height={"25"}
            alt="icon-arrow"
            style={{ width: "15px", height: "15px" }}
          />
        </button>

        <section>
          <Image
            src={showChatsWith?.profilePicUrl || IconUser}
            alt="icon-user"
            width={"40"}
            height={"40"}
            style={{ width: "35px", height: "35px" }}
          />
        </section>

        <section>
          <p className="textmd">{showChatsWith?.username}</p>
        </section>

        <section className="ml-auto">
          <DropDown
            username={showChatsWith?.username}
            createdById={showChatsWith?.id}
            type={"chats"}
          />
        </section>
      </div>
      <div
        id="scrollableDiv"
        className="flex flex-col gap-4 bg-neutral-200 h-full max-h-[80vh] p-2"
        style={{ height: "100%", overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={displayComments?.length}
          style={{
            display: "flex",
            flexDirection: "column-reverse",
          }}
          refreshFunction={getMoreChats}
          next={() => {
            getMoreChats();
            setPageNumber((pageNumber) => pageNumber + 1);
          }}
          hasMore={moreComments}
          scrollableTarget="scrollableDiv"
          scrollThreshold={0.8}
        >
          {Array.isArray(displayComments) && checkPresence(displayComments) ? (
            displayComments?.map((message, index) => {
              if (userId === message.created_by_id) {
                return <SentMsg msgDetails={message} key={index} />;
              } else {
                return <ReceivedMsg msgDetails={message} key={index} />;
              }
            })
          ) : (
            <p>no messages</p>
          )}
        </InfiniteScroll>
      </div>
      {/* new message input */}
      <div className="flex gap-2 p-2 border-t-2 mt-auto border-neutral-300">
        <div className="flex items-center ">
          <button
            type="button"
            onClick={initiateFileInput}
            className="rounded-md hover:border-primaryBlack transition-all items-center"
          >
            <Image
              src={IconImage}
              alt="icon-image"
              width={"30"}
              height={"30"}
              style={{ width: "30px", height: "30px", minWidth: "30px" }}
            />
          </button>

          <input
            type="file"
            style={{ display: "none" }}
            ref={inputRef}
            accept="image/*"
            onClick={(e) => handleFileInput(e, setFile)}
            onChange={(e) => handleFileInput(e, setFile)}
            name="file-input"
          />
        </div>

        <input
          type="text"
          placeholder="Start typing.."
          className="w-full p-2 focus:outline-neutral-200 "
          onChange={(e) => setTextMessage(e.target.value)}
          value={textMessage}
        />

        {checkPresence(file) && (
          <div className="p-2 flex gap-4 items-center flex-col">
            <Image src={file} width={"75"} height={"75"} alt="comment-media" />

            <p
              className={`hover:underline hover:cursor-pointer border-2 px-4 py-2 rounded-md hover:border-primaryBlack`}
              onClick={() => setFile(null)}
            >
              remove{" "}
            </p>
          </div>
        )}
        <button
          onClick={async () => {
            await submitFunction("");
            setTextMessage("");
          }}
        >
          <Image
            src={IconSend}
            alt="icon-send"
            style={{ width: "30px", height: "25px" }}
            className="ml-auto"
          />
        </button>
      </div>
    </div>
  );
}

export function ReceivedMsg({ msgDetails }) {
  return (
    <div className="flex flex-col float-left p-4 neutral-400 gap-4 bg-neutral-100 my-2 py-2 px-4 rounded-md w-fit bg-white max-w-[70%]">
      <section>
        {checkPresence(msgDetails?.description) && (
          <p className="text-left text-md whitespace-pre-wrap text-neutral-700">
            {msgDetails?.description}
          </p>
        )}
      </section>
      {checkPresence(msgDetails?.media_url) && (
        <Image
          className={` rounded-md mx-auto`}
          src={msgDetails?.media_url}
          style={{ width: "auto" }}
          alt={"chat media"}
          width="200"
          height="250"
        />
      )}
    </div>
  );
}

export function SentMsg({ msgDetails }) {
  return (
    <div className="flex flex-col ml-auto bg-sky-100 p-2 neutral-200 gap-4 m-2 py-2 px-4 rounded-md w-fit max-w-[70%]">
      <section>
        {checkPresence(msgDetails?.description) && (
          <p className="text-left text-md whitespace-pre-wrap text-neutral-700 ">
            {msgDetails?.description}
          </p>
        )}
      </section>

      {checkPresence(msgDetails?.media_url) && (
        <Image
          className={` rounded-md mx-auto`}
          src={msgDetails?.media_url}
          style={{ width: "auto" }}
          alt={"chat media"}
          width="100"
          height="150"
        />
      )}
    </div>
  );
}

export function PostCard({
  postId,
  createdById,
  createdByProfilePicUrl,
  createdByUsername,
  createdByRating,
  postTitle,
  postDescription,
  postMediaUrl,
  postLinkUrl,
  postTags,
  city,
  state,
  country,
  createdByEmail,
  createdByMobile,
  createdByWhatsapp,
  postCreatedAt,
  postLikeCount,
  postCommentCount,
  bookmarkId,
  postType,
}) {
  const router = useRouter();
  const [likedStatus, setLikedStatus] = useState(verifyLikedPosts(postId));
  const [likeCount, setLikeCount] = useState(postLikeCount);
  const [showComments, setShowComments] = useState(false);

  const [displayComments, setDisplayComments] = useState([]);
  let [newComments, setNewComments] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  let [moreComments, setMoreComments] = useState(true);
  const [file, setFile] = useState(null);
  const commentDescRef = useRef();

  const inputRef = useRef(null);

  const initiateFileInput = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    setNewComments([]);
    renderComments();
  }, []);

  const renderComments = async () => {
    pageNumber = 1;
    const { result } = await callApi(
      "GET",
      `public/read-comment/${pageNumber}?post_id=${postId}`
    );
    await setDisplayComments(result);

    return pageNumber;
  };

  const getMoreComments = async () => {
    pageNumber++;

    const { result: res } = await callApi(
      "GET",
      `public/read-comment/${pageNumber}?post_id=${postId}`
    );

    if (res != "no data") {
      if (res[0]?.post_id === 10) {
        await setMorePosts(false);
      }

      if (res?.length != 0) {
        (await Array.isArray(res)) &&
          setDisplayComments((displayComments) => [...displayComments, ...res]);
      }
    } else {
      setMoreComments(false);
    }
  };

  const submitFunction = async () => {
    const { token } = getUserDataObject();
    const data = { post_id: postId };
    if (checkPresence(file)) {
      data["media_url"] = file;
    } else {
      data["description"] = commentDescRef.current.value;
    }

    const { result } = await callApi(
      "POST",
      "private/all/create-comment",
      token,
      JSON.stringify(data),
      "comment created successfully"
    );

    result?.status;
    if (result?.status) {
      renderComments();
      setFile(null);
    }
  };

  function showTagFeed(tagName) {
    router.push(
      {
        query: { feed_type: router.query.feed_type, tag: tagName },
      },
      undefined,
      { shallow: true }
    );
    window.scrollTo(0, 0);

    return parseTag(tagName, "tagClick");
  }

  async function likeThisPost() {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;

    if (!verifyLikedPosts(postId) && token) {
      await likePost(postId, token);
      setLikedStatus(true);
      setLikeCount((count) => count + 1);
    }
  }

  return (
    <>
      {checkPresence(postId) && (
        <div className="flex flex-col w-full p-6 m-4 mt-2 bg-white border-2 rounded-xl border-primaryBlack gap-6">
          <section className="flex gap-2 justify-between items-center">
            <div className="flex gap-2">
              {checkPresence(createdByProfilePicUrl) ? (
                <Image
                  src={createdByProfilePicUrl}
                  alt={createdByUsername || "icon"}
                  className="rounded-full "
                  width="50"
                  height="50"
                  style={{ width: "4em", height: "4em" }}
                />
              ) : (
                <Image
                  src={IconUser}
                  alt={createdByUsername}
                  className="rounded-full"
                  style={{ width: "4em", height: "4em" }}
                  width="50"
                  height="50"
                />
              )}

              <div className="grid grid-cols-1">
                {checkPresence(createdByUsername) && (
                  <p className="text-xl">{createdByUsername}</p>
                )}

                {checkPresence(toString(createdByRating)) && (
                  <p className="flex items-center">
                    <Image
                      src={IconStar}
                      alt="icon-rating"
                      width={"20"}
                      height={"20"}
                      style={{ width: "20px", height: "20px" }}
                    />
                    <span className="mx-2 text-lg">{createdByRating}</span>
                  </p>
                )}
              </div>
            </div>

            <DropDown
              username={createdByUsername}
              PostId={postId}
              createdById={createdById}
              profilePicUrl={createdByProfilePicUrl}
              bookmarkId={bookmarkId ? bookmarkId : null}
              postType={postType ? postType : null}
            />
          </section>

          {checkPresence(postTitle) && (
            <p className="text-left text-xl font-semibold">{postTitle}</p>
          )}
          {checkPresence(postDescription) && (
            <p className="text-left text-lg whitespace-pre-wrap text-neutral-700">
              {postDescription}
            </p>
          )}
          {checkPresence(postMediaUrl) &&
            (postMediaUrl.substring(postMediaUrl.length - 3) != "pdf" ? (
              <Image
                className={` rounded-md mx-auto`}
                src={postMediaUrl}
                style={{ width: "auto" }}
                alt={createdByUsername || "icon"}
                width="200"
                height="250"
              />
            ) : (
              checkPresence(postId) && (
                <div className="w-full flex justify-start gap-4 items-center">
                  <Image
                    src={IconPdf}
                    style={{ width: "auto" }}
                    alt="icon-pdf"
                    width={"40"}
                    height={"40"}
                  />
                  <a
                    href={postMediaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold "
                  >
                    View file
                  </a>
                </div>
              )
            ))}
          {checkPresence(postLinkUrl) && (
            <p className="text-left ">
              Link{" "}
              <a
                href={postLinkUrl}
                className="mx-1 text-blue-500 "
                target="_blank"
                rel="noreferrer"
              >
                {postLinkUrl}
              </a>
            </p>
          )}
          {checkPresence(postTags) && (
            <div className="flex flex-wrap gap-2">
              {postTags.map((tag, index) => {
                return (
                  <button
                    key={index}
                    className="lg:mr-3 bg-zinc-200 text-md tracking-wide w-fit px-2 py-1 rounded-sm border-l-4 border-blue-900"
                    type="button"
                    onClick={() => showTagFeed(tag)}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}

          {(checkPresence(city) ||
            checkPresence(state) ||
            checkPresence(country)) && (
            <p className="text-start">
              Location : {checkPresence(country) && `${country},`}{" "}
              {checkPresence(state) && `${state},`}{" "}
              {checkPresence(city) && `${city}`}
            </p>
          )}

          {(checkPresence(createdByEmail) ||
            checkPresence(createdByMobile) ||
            checkPresence(createdByWhatsapp)) && (
            <section className="flex flex-col items-start gap-2">
              {checkPresence(createdByEmail) && <p>Email {createdByEmail} </p>}
              {checkPresence(createdByMobile) && (
                <p>Mobile {createdByMobile} </p>
              )}
              {checkPresence(createdByWhatsapp) && (
                <p>Whatsapp {createdByWhatsapp} </p>
              )}
            </section>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <section className="flex mr-4">
                <button
                  className="hover:bg-neutral-200 p-2 gap-2 rounded-md flex items-center "
                  onClick={likeThisPost}
                  disabled={verifyLikedPosts(postId)}
                >
                  <Image
                    src={likedStatus ? IconLiked : IconLike}
                    width={"22"}
                    height={"22"}
                    alt="icon-like"
                  />
                  <p className="font-semibold text-lg">{likeCount}</p>
                </button>
              </section>
              <button className="hover:bg-neutral-200 px-2 rounded-md mr-4">
                <Image
                  src={IconChat}
                  width={"22"}
                  height={"22"}
                  alt="icon-chat"
                />
              </button>

              <button
                onClick={async () => {
                  pageNumber = 1;
                  setShowComments(!showComments);
                  pageNumber = 1;

                  var currpage = await renderComments();

                  return setPageNumber(1);
                }}
                className="hover:bg-neutral-200 rounded-md flex gap-2 p-2 items-center"
              >
                <Image
                  src={IconComment}
                  width={"22"}
                  height={"22"}
                  alt="icon-comment"
                />
                <p className="font-semibold text-lg">{postCommentCount}</p>
              </button>
            </div>
            <div className="ml-auto flex gap-4 items-center">
              {checkPresence(postMediaUrl) && (
                <Link
                  href={postMediaUrl}
                  className="hover:bg-neutral-200 rounded-md p-2"
                >
                  <Image
                    src={IconDownload}
                    width={"20"}
                    height={"20"}
                    alt="icon-download"
                    style={{ width: "20px", height: "20px" }}
                  />
                </Link>
              )}
              <p className="ml-auto">{getTimeDifference(postCreatedAt)}</p>
            </div>
          </div>

          <div className={`${showComments ? "" : "hidden"}  `}>
            <div className={`h-full inset-0 overflow-y-auto `}>
              <div
                className="flex flex-col justify-centertext-center rounded-md overflow-hidden"
                style={{ height: "inherit" }}
              >
                <div className="flex items-center bg-primaryBlack p-4 transform gap-8 ">
                  <h3 className="mx-auto text-xl font-medium text-center tracking-wide text-white">
                    Comments
                  </h3>
                </div>

                {/* show comments here */}

                <div
                  id="scrollableDiv"
                  className="flex flex-col gap-4 bg-neutral"
                  style={{ height: "50vh", overflow: "auto" }}
                >
                  <InfiniteScroll
                    dataLength={displayComments?.length}
                    refreshFunction={getMoreComments}
                    next={() => {
                      getMoreComments();
                      setPageNumber((pageNumber) => pageNumber + 1);
                    }}
                    hasMore={moreComments}
                    loader={
                      <p className="font-semibold roboto-reg">Loading...</p>
                    }
                    endMessage={<p>end of comments</p>}
                    scrollableTarget="scrollableDiv"
                    scrollThreshold={0.8}
                  >
                    {Array.isArray(displayComments) && displayComments != [] ? (
                      displayComments.map((comment, idx) => {
                        return (
                          <CommentCard
                            key={idx}
                            commentId={comment?.["id"]}
                            createdByProfilePicUrl={
                              comment?.["created_by_profile_pic_url"]
                            }
                            createdByUsername={comment?.["created_by_username"]}
                            description={comment?.["description"]}
                            mediaUrl={comment?.["media_url"]}
                            createdById={comment?.["created_by_id"]}
                            createdAt={comment?.["created_at"]}
                          />
                        );
                      })
                    ) : (
                      <p className="text-center font-semibold">
                        No comments yet
                      </p>
                    )}
                  </InfiniteScroll>
                </div>

                {/* new comment input */}
                <div className="flex gap-2 p-2 border-2">
                  <div className="flex items-center ">
                    <button
                      type="button"
                      onClick={initiateFileInput}
                      className="rounded-md hover:border-primaryBlack transition-all items-center"
                    >
                      <Image
                        src={IconImage}
                        alt="icon-image"
                        width={"30"}
                        height={"30"}
                        style={{ width: "30px", height: "30px" }}
                      />
                    </button>

                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={inputRef}
                      accept="image/*"
                      onClick={(e) => handleFileInput(e, setFile)}
                      onChange={(e) => handleFileInput(e, setFile)}
                      name="file-input"
                    />
                  </div>

                  {!checkPresence(file) ? (
                    <textarea
                      wrap="soft"
                      type="text"
                      placeholder="Start typing.."
                      className="w-full p-2 resize-y placeholder:leading-[2.5] focus:placeholder:leading-none"
                      ref={commentDescRef}
                    />
                  ) : (
                    <div className="w-full p-2 flex gap-4 items-center">
                      <Image
                        src={file}
                        width={"75"}
                        height={"75"}
                        alt="comment-media"
                      />

                      <p
                        type="button"
                        className={`hover:underline border-2 px-4 py-2 rounded-md hover:border-primaryBlack`}
                        onClick={() => setFile(null)}
                      >
                        remove{" "}
                      </p>
                    </div>
                  )}
                  <button onClick={submitFunction}>
                    <Image
                      src={IconSend}
                      alt="icon-send"
                      style={{ width: "30px", height: "25px" }}
                      className="ml-auto"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
