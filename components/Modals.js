import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState, useRef } from "react";
import { InputComponent, RadioComponent } from "../components/inputs";
import { handleFileInput } from "../components/fileFunctions";
import Select from "react-select";
import { checkPresence, CommentCard } from "../components/cards";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";
import callApi from "./callApi";
import Link from "next/link";
import Image from "next/image";
import {
  IconCopy,
  IconSuccess,
  IconUser,
  IconSend,
  IconImage,
} from "../assets/images";
import {
  getUserDataObject,
  updateUserDataFromApi,
  updateUserDataObject,
} from "../components/authFunctions";
import {
  reportPost,
  reportUser,
  rateUser,
  blockUser,
  deleteMsgsWithUser,
} from "./postFunctions";

export function alertUser(msg) {
  alert(msg);
}

export function SignupModal({ username, password, isOpen }) {
  const router = useRouter();

  function copyToClipboard() {
    navigator.clipboard.writeText(`${username} ${password}`);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 min-w-max" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all min-w-fit">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium text-center tracking-wide flex items-center mb-4"
                >
                  <Image
                    src={IconSuccess}
                    alt="icon-success.png"
                    width={"60"}
                    height={"60"}
                    priority={true}
                    style={{ width: "auto", height: "auto" }}
                  />
                  Your account has been successfull created.
                </Dialog.Title>

                <div className="flex flex-col sm:py-4 lg:py-2  mb-12s">
                  <div className="flex justify-around mt-4 items-center w-full">
                    <div className="lg:text-lg sm:text-md sm:px-4  basis-1/2 py-2 text-center border-2  rounded-tl-lg ">
                      your username is{" "}
                    </div>
                    <div className="text-lg tracking-wide px-12 lg:border-l-0 py-2  border-2  rounded-tr-lg text-center text-[#191919] basis-1/2 font-semibold">
                      {username}{" "}
                    </div>
                  </div>

                  <div className="flex justify-around mb-4 items-center w-full">
                    <div className="lg:text-lg sm:text-md sm:px-4 basis-1/2 py-2 text-center border-2 rounded-bl-lg border-t-0">
                      your password is{" "}
                    </div>
                    <div className="text-lg  tracking-wide px-12 lg:border-l-0 py-2  border-2 rounded-br-lg text-center text-[#191919] basis-1/2 border-t-0 font-semibold">
                      {password}{" "}
                    </div>
                  </div>
                  <button
                    className="flex btnStyle1 text-sm gap-2 mx-auto"
                    onClick={copyToClipboard}
                  >
                    <Image
                      src={IconCopy}
                      alt="icon-copy"
                      width="20"
                      height="20"
                      priority={true}
                      style={{ width: "auto", height: "auto" }}
                    ></Image>
                    <p>Copy to Clipboard</p>
                  </button>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="lg:text-lg sm:text-md tracking-wide bg-[#191919] md:px-8 py-2 basis-1/2  lg:border-2 border-[#191919] rounded-lg text-center text-white hover:bg-[#404040] w-full"
                    onClose={() => {}}
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    continue
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export function MandatoryCheck({ isOpen, setIsOpen }) {
  // const router = useRouter();

  const inputRef = useRef();
  const [image, setImage] = useState(IconUser);
  const [userData, setUserData] = useState();
  const [currUserData, setCurrUserData] = useState({
    username: "",
    profile_pic_url: "",
    country: "",
    designation: "",
    tag: [],
  });
  const [countryList, setCountryList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [interestList, setInterestList] = useState([]);
  const [userInterestTag, setUserInterestTag] = useState([]);
  useEffect(() => {
    const { userInfo, country, designation, interest } = getUserDataObject();
    setUserData(userInfo);

    setCurrUserData((prev) => {
      return {
        ...prev,
        username: userInfo?.username,
        profile_pic_url: userInfo?.profile_pic_url,
        country: userInfo?.country,
        designation: userInfo?.designation,
      };
    });

    checkPresence(userInfo?.profile_pic_url) &&
      setImage(userInfo?.profile_pic_url);

    let newInterest = interest?.map((intName) => {
      return { value: intName.title, label: intName.title };
    });
    let newCountry = country?.map((intName) => {
      return { value: intName.title, label: intName.title };
    });
    let newDesignation = designation?.map((intName) => {
      return { value: intName.title, label: intName.title };
    });

    setCountryList(newCountry);
    setDesignationList(newDesignation);
    setInterestList(newInterest);
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative " onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 min-w-max" />
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
              <Dialog.Panel className="w-full max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all min-w-fit flex flex-col gap-4">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium text-center tracking-wide"
                >
                  Add Basic Info
                </Dialog.Title>

                <form
                  id="mandatory-check"
                  className="flex flex-col gap-4"
                  onSubmit={async (e) => {
                    try {
                      e.preventDefault();
                      if (image === IconUser) {
                        return alertUser("Please add an image to continue");
                      }

                      currUserData.profile_pic_url =
                        image != IconUser ? image : null;

                      checkPresence(userInterestTag) &&
                        userInterestTag.map((interest) => {
                          currUserData.tag.push(interest.label);
                        });

                      currUserData.tag = [...new Set(currUserData.tag)];

                      await updateUserDataObject({
                        userInfo: { ...userData, ...currUserData },
                      });
                      await updateUserDataObject({ mandatory_check: true });

                      const result = await updateUserDataFromApi(currUserData);

                      if (result != undefined) {
                        return setIsOpen(false);
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <div className="flex flex-col gap-1 items-center">
                    <Image
                      src={currUserData.profile_pic_url || image}
                      alt="icon-user"
                      width="50"
                      height="50"
                      className="rounded-full"
                    />

                    <input
                      ref={inputRef}
                      onChange={(e) => {
                        handleFileInput(e, setImage);
                      }}
                      name="profile_pic_url"
                      accept="image/*"
                      type="file"
                      className="hidden"
                    />

                    <button
                      onClick={() => {
                        inputRef.current.click();
                      }}
                      type="button"
                      className="hover:underline"
                    >
                      change profile picture
                    </button>
                  </div>

                  <InputComponent
                    Name="username"
                    label="username"
                    type="text"
                    value={currUserData.username}
                    stateMng={(e) =>
                      setCurrUserData((prev) => {
                        return { ...prev, username: e.target.value };
                      })
                    }
                  />
                  <div className="flex flex-col gap-2 ">
                    <p className="font-semibold text-lg tracking-wide ">
                      Country
                    </p>
                    <Select
                      onChange={(e) =>
                        setCurrUserData((prev) => {
                          return { ...prev, country: e.label };
                        })
                      }
                      id="countryselect"
                      instanceId={"selectCountry"}
                      name="country"
                      className="select"
                      options={countryList}
                      required
                      placeholder={"Select Your country"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-lg tracking-wide ">
                      Designation
                    </p>
                    <Select
                      required
                      id="designationselect"
                      onChange={(e) =>
                        setCurrUserData((prev) => {
                          return { ...prev, designation: e.label };
                        })
                      }
                      instanceId={"selectDesignation"}
                      name="designation"
                      className="select"
                      options={designationList}
                      placeholder={"Select your designation"}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-lg tracking-wide ">
                      Interests
                    </p>
                    <Select
                      required
                      id="interestselect"
                      instanceId={"selectInterest"}
                      closeMenuOnSelect={false}
                      onChange={(e) => setUserInterestTag(e)}
                      isMulti
                      name="interest"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      options={interestList}
                      placeholder="Select your interests"
                    />
                  </div>

                  <button
                    type="submit"
                    form="mandatory-check"
                    className="AuthButton"
                  >
                    Continue
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export function CommentModal({ post_id, isOpen, setIsOpen }) {
  const [comments, setComments] = useState([]);
  let [newComments, setNewComments] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  let [hasMore, setHasMore] = useState(true);
  const [file, setFile] = useState(null);
  const commentDescRef = useRef();

  const inputRef = useRef(null);

  const initiateFileInput = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    setNewComments([]);
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setPageNumber(1);
    pageNumber = 1;
    hasMore = true;

    const { result } = await callApi(
      "GET",
      `public/read-comment/${pageNumber}?post_id=${post_id}`
    );

    Array.isArray(result) && checkPresence(result)
      ? setComments(result)
      : setHasMore(false);
  };

  const getMoreComments = async () => {
    ++pageNumber;

    const { result } = await callApi(
      "GET",
      `public/read-comment/${pageNumber}?post_id=${post_id}`
    );

    checkPresence(result) && Array.isArray(result)
      ? setComments((prevComments) => [
          ...new Set([...prevComments, ...result]),
        ])
      : setHasMore(false);
    setPageNumber(pageNumber);
  };

  const submitFunction = async () => {
    const { token } = getUserDataObject();
    const data = { post_id };
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
      "post created successfully"
    );

    result?.status;
    if (result?.status) {
      fetchComments();
      commentDescRef.current.value = null;
    }
  };
  return (
    <div className={`${isOpen ? "" : "hidden"}  `}>
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

          <div className="bg-neutral-100 py-4 flex flex-col " id="commentDiv">
            {/* show comments here */}

            <InfiniteScroll
              dataLength={comments.length * 10}
              next={() => {
                getMoreComments();
              }}
              scrollableTarget="commentDiv"
              scrollThreshold={0.8}
              hasMore={hasMore}
              loader={<p>loading ...</p>}
              style={{
                height: "fit-content",
                maxHeight: "40vh",
                overflow: "auto",
              }}
              className="h-screen"
            >
              {checkPresence(comments) ? (
                Array.isArray(comments) &&
                comments?.map((comment, index) => {
                  return (
                    <div key={index} className="p-4 pt-0  text-center">
                      <CommentCard
                        createdById={comment?.created_by_id}
                        mediaUrl={comment?.media_url}
                        createdAt={comment?.created_at}
                        createdByProfilePicUrl={
                          comment?.created_by_profile_pic_url
                        }
                        description={comment?.description}
                        createdByUsername={comment?.created_by_username}
                      />
                    </div>
                  );
                })
              ) : (
                <p className="text-center font-semibold">No comments yet</p>
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
  );
}

export function CreateModal({ isOpen, setIsOpen }) {
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
  ];
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative " onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 min-w-max" />
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
              <Dialog.Panel className="w-full max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all min-w-fit flex flex-col gap-4">
                <div className="flex gap-4 justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium text-center tracking-wide"
                  >
                    What do you want to post?
                  </Dialog.Title>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="font-semibold  text-xl py-1 px-4 hover:bg-neutral-300 rounded-md"
                  >
                    X
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {createPostDetails.map((createPostOption, index) => {
                    return (
                      <Link
                        href={createPostOption.redirect}
                        key={index}
                        className="flex jutify-around p-4 border-2 rounded-md  transition-all duration-100   hover:shadow-xl hover:border-primaryBlack"
                      >
                        {createPostOption.label}
                      </Link>
                    );
                  })}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export const DeleteMsgModal = ({
  isOpen,
  setIsOpen,
  setAllMessages,
  setUnreadMessageCount,
}) => {
  async function deleteAllMessages() {
    const { token } = getUserDataObject();
    const { result } = await callApi(
      "DELETE",
      `private/self/delete-message-all`,
      token,
      null,
      "all messages deleted successfully"
    );

    if (result?.status) {
      setAllMessages([]);
      return setUnreadMessageCount(0);
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative " onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 min-w-max" />
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
              <Dialog.Panel
                className="w-full max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all min-w-fit flex flex-col"
                style={{ gap: "1.5rem" }}
              >
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium tracking-wide"
                >
                  Delete all chat messages
                </Dialog.Title>

                <p className="text-neutral-900">
                  Are you sure you want to delete all chat messages?
                </p>

                <div className="flex justify-around items-center gap-4">
                  <button
                    className="lg:text-lg sm:text-md sm:px-4 tracking-wide  basis-1/3 py-2 text-center border-2 border-[#191919] rounded-lg  hover:bg-neutral-200 transition px-12"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    cancel
                  </button>
                  <button
                    className="lg:text-lg sm:text-md sm:px-4 tracking-wide bg-[#191919] px-12 py-2  lg:border-2 border-[#191919] rounded-lg text-center text-white basis-2/3 hover:bg-[#404040] "
                    onClick={() => {
                      setIsOpen(false);
                      deleteAllMessages();
                    }}
                  >
                    delete all messages
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const MessageInfoModal = ({ isOpen, setIsOpen }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative " onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 min-w-max" />
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
              <Dialog.Panel
                className="w-full max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all min-w-fit flex flex-col"
                style={{ gap: "0.5rem" }}
              >
                <div className="flex gap-4 justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium text-center tracking-wide"
                  >
                    Note
                  </Dialog.Title>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="font-semibold  text-lg py-1 px-4 hover:bg-neutral-300 rounded-md"
                  >
                    X
                  </button>
                </div>

                <p className="text-neutral-900">
                  Old messages will be deleted after 30 days.
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const ReportPost = ({ isOpen, setIsOpen, postDetails }) => {
  const [reportReasonText, setReportReasonText] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [reportPostReason, setReportPostReason] = useState([]);

  useEffect(() => {
    const { option_report_post } = getUserDataObject();
    setReportReasonText("");
    setReportReason("");
    option_report_post?.map((option) => {
      reportPostReason.push(option?.title);
    });

    setReportPostReason([...new Set(reportPostReason)]);
  }, []);

  return (
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
                  Report Post
                </Dialog.Title>

                <form id="reportPostform" className=" flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder={"+ Type to add your own reason"}
                    name={"reportReason"}
                    onChange={(e) => {
                      setReportReasonText(e.target.value);
                      setReportReason();
                    }}
                    className="border-2 rounded-md p-2  focus:outline-[#191919]"
                  />

                  <section
                    className={`flex flex-col gap-2 ${
                      reportReasonText === "" ? "" : "hidden"
                    }`}
                  >
                    {reportPostReason?.map((option, index) => {
                      return (
                        <RadioComponent
                          key={index}
                          label={option}
                          Name={"reportReason"}
                          Value={option}
                          stateMng={(e) => setReportReason(e.target.value)}
                        />
                      );
                    })}
                  </section>
                  <div className="flex justify-around items-center gap-4">
                    <button
                      type="button"
                      className="lg:text-lg sm:text-md sm:px-4 tracking-wide  basis-1/3 py-2 text-center border-2 border-[#191919] rounded-lg  hover:bg-neutral-200 transition px-12"
                      onClick={() => {
                        setIsOpen(false);
                        setReportReasonText("");
                        setReportReason("");
                      }}
                    >
                      cancel
                    </button>
                    <button
                      type="button"
                      className="lg:text-lg sm:text-md sm:px-4 tracking-wide bg-[#191919] px-12 py-2  lg:border-2 border-[#191919] rounded-lg text-center text-white basis-2/3 hover:bg-[#404040] "
                      onClick={async () => {
                        const { userInfo } = getUserDataObject();

                        const description = checkPresence(reportReasonText)
                          ? reportReasonText
                          : reportReason;

                        const result = await reportPost(
                          postDetails?.PostId,
                          description
                        );

                        setIsOpen(false);
                        setReportReasonText("");
                        setReportReason("");
                      }}
                    >
                      continue
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const DeleteAllMessagesWithUser = ({
  isOpen,
  setIsOpen,
  userDetails,
}) => {
  const router = useRouter();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative " onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 min-w-max" />
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
              <Dialog.Panel
                className="w-full max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all min-w-fit flex flex-col"
                style={{ gap: "1rem" }}
              >
                <div className="flex gap-4 justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium text-center tracking-wide"
                  >
                    Delete all messages?
                  </Dialog.Title>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="font-semibold  text-lg py-1 px-4 hover:bg-neutral-300 rounded-md"
                  >
                    X
                  </button>
                </div>

                <p className="text-neutral-900">
                  Are you sure you want to delete all messages with{" "}
                  {userDetails?.username} ?
                </p>

                <div className="flex justify-around items-center gap-4">
                  <button
                    className="lg:text-lg sm:text-md sm:px-4 tracking-wide  basis-1/3 py-2 text-center border-2 border-[#191919] rounded-lg  hover:bg-neutral-200 transition px-12"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="lg:text-lg sm:text-md sm:px-4 tracking-wide bg-[#191919] px-12 py-2  lg:border-2 border-[#191919] rounded-lg text-center text-white basis-2/3 hover:bg-[#404040] "
                    onClick={async () => {
                      await setIsOpen(false);
                      const result = await deleteMsgsWithUser(
                        userDetails?.createdById
                      );

                      if (result?.status) {
                        router.reload();
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// user functions
export const BlockUser = ({ isOpen, setIsOpen, userDetails }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative " onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 min-w-max" />
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
              <Dialog.Panel
                className="w-full max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all min-w-fit flex flex-col"
                style={{ gap: "1rem" }}
              >
                <div className="flex gap-4 justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium text-center tracking-wide"
                  >
                    Block User
                  </Dialog.Title>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="font-semibold  text-lg py-1 px-4 hover:bg-neutral-300 rounded-md"
                  >
                    X
                  </button>
                </div>

                <p className="text-neutral-900">
                  Are you sure you want to block {userDetails?.username}
                </p>

                <div className="flex justify-around items-center gap-4">
                  <button
                    className="lg:text-lg sm:text-md sm:px-4 tracking-wide  basis-1/3 py-2 text-center border-2 border-[#191919] rounded-lg  hover:bg-neutral-200 transition px-12"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="lg:text-lg sm:text-md sm:px-4 tracking-wide bg-[#191919] px-12 py-2  lg:border-2 border-[#191919] rounded-lg text-center text-white basis-2/3 hover:bg-[#404040] "
                    onClick={async () => {
                      await setIsOpen(false);
                      blockUser(userDetails?.createdById);
                    }}
                  >
                    Block
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const RateUser = ({
  isOpen,
  setIsOpen,
  username,
  profilePicUrl,
  createdById,
}) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(5);

  function cancelRating() {
    setRating(5);
    setHover(5);
  }

  return (
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
                    className="lg:text-lg sm:text-md sm:px-4 tracking-wide  basis-1/3 py-2 text-center border-2 border-[#191919] rounded-lg  hover:bg-neutral-200 transition px-12"
                    onClick={() => {
                      setIsOpen(false);

                      cancelRating();
                    }}
                  >
                    cancel
                  </button>
                  <button
                    className="lg:text-lg sm:text-md sm:px-4 tracking-wide bg-[#191919] px-12 py-2  lg:border-2 border-[#191919] rounded-lg text-center text-white basis-2/3 hover:bg-[#404040] "
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
  );
};

export const ReportUser = ({ isOpen, setIsOpen, reportingUserId }) => {
  const [reportReasonText, setReportReasonText] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [reportUserReason, setReportUserReason] = useState([]);
  useEffect(() => {
    const { option_report_user } = getUserDataObject();

    setReportReasonText("");
    setReportReason("");
    option_report_user?.map((option) => {
      reportUserReason.push(option?.title);
    });

    setReportUserReason([...new Set(reportUserReason)]);
  }, []);
  return (
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
                  Report User
                </Dialog.Title>

                <form id="reportPostform" className=" flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder={"+ Type to add your own reason"}
                    name={"reportReason"}
                    onChange={(e) => {
                      setReportReasonText(e.target.value);
                      setReportReason();
                    }}
                    className="border-2 rounded-md p-2  focus:outline-[#191919]"
                  />

                  <section
                    className={`flex flex-col gap-2 ${
                      reportReasonText === "" ? "" : "hidden"
                    }`}
                  >
                    {reportUserReason?.map((option, index) => {
                      return (
                        <RadioComponent
                          key={index}
                          label={option}
                          Name={"reportReason"}
                          Value={option}
                          stateMng={(e) => setReportReason(e.target.value)}
                        />
                      );
                    })}
                  </section>
                  <div className="flex justify-around items-center gap-4">
                    <button
                      type="button"
                      className="lg:text-lg sm:text-md sm:px-4 tracking-wide  basis-1/3 py-2 text-center border-2 border-[#191919] rounded-lg  hover:bg-neutral-200 transition px-12"
                      onClick={() => {
                        setIsOpen(false);
                        setReportReasonText("");
                        setReportReason("");
                      }}
                    >
                      cancel
                    </button>
                    <button
                      type="button"
                      className="lg:text-lg sm:text-md sm:px-4 tracking-wide bg-[#191919] px-12 py-2  lg:border-2 border-[#191919] rounded-lg text-center text-white basis-2/3 hover:bg-[#404040] "
                      onClick={async () => {
                        const { userInfo } = getUserDataObject();
                        const description = checkPresence(reportReasonText)
                          ? reportReasonText
                          : reportReason;
                        await reportUser(
                          reportingUserId,
                          userInfo?.id,
                          description
                        );
                        setIsOpen(false);
                        setReportReasonText("");
                        setReportReason("");
                      }}
                    >
                      continue
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
