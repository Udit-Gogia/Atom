import { IconInfo } from "../assets/images";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition, Dialog, Disclosure } from "@headlessui/react";
import { RadioComponent } from "../components/inputs";
import callApi from "../components/callApi";
import { checkPresence } from "../components/cards";
import Image from "next/image";
import {
  updateUserDataObject,
  deleteUser,
  getUserDataObject,
} from "../components/authFunctions";

export default function DeleteMyAccount() {
  let [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [deleteReasonText, setDeleteReasonText] = useState("");
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteUserPostReason, setDeleteUserReason] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const { option_account_delete, isAuth } = getUserDataObject();

    setDeleteReasonText("");
    setDeleteReason("");
    option_account_delete?.map((option) => {
      deleteUserPostReason.push(option?.title);
    });

    setDeleteUserReason([...new Set(deleteUserPostReason)]);

    if (!isAuth) {
      router.back();
    }
  }, []);

  async function handleDeleteReasonModal() {
    setIsDeleteUserOpen(true);
  }

  return (
    <div className="w-full bg-neutral-100 h-screen">
      <div className="flex flex-col border-2 sm:p-12 lg:p-6 sm:mx-4 md:mx-auto mt-8 rounded-lg md:w-5/12 h-fit mx-auto bg-white">
        <div className="flex justify-center  pt-12 ">
          <div className="flex gap-2 items-center ">
            <Image
              src={IconInfo}
              alt="icon-info"
              width="50"
              height="50"
              style={{ width: "auto" }}
            ></Image>
            <p className="text-xl font-semibold tracking-wide text-center">
              do you really want to delete your account?
            </p>
          </div>
        </div>
        <div className="flex justify-around m-4 items-center  mt-12">
          <button
            className="lg:text-lg sm:text-md sm:px-4 tracking-wide text-center basis-1/3 py-2 px-12  border-2 border-[#191919] rounded-lg mx-2 hover:bg-neutral-200 transition "
            onClick={() => router.back()}
          >
            go back
          </button>
          <button
            type="button"
            className="lg:text-lg sm:text-md sm:px-4 tracking-wide bg-[#191919] px-12 py-2  lg:border-2 border-[#191919] rounded-lg text-center text-white basis-2/3 mx-2 hover:bg-[#404040] "
            onClick={handleDeleteReasonModal}
          >
            continue
          </button>
        </div>
        {/* Delete user Modal starts */}
        <Transition appear show={isDeleteUserOpen} as={Fragment}>
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
                    ></Dialog.Title>

                    <form id="reportPostform" className=" flex flex-col gap-4">
                      <input
                        type="text"
                        placeholder={"+ Type to add your own reason"}
                        name={"reportReason"}
                        onChange={(e) => {
                          setDeleteReasonText(e.target.value);
                          setDeleteReason();
                        }}
                        className="border-2 rounded-md p-2  focus:outline-[#191919]"
                      />

                      <section
                        className={`flex flex-col gap-2 ${
                          deleteReasonText === "" ? "" : "hidden"
                        }`}
                      >
                        {deleteUserPostReason?.map((option, index) => {
                          return (
                            <RadioComponent
                              key={index}
                              label={option}
                              Name={"reportReason"}
                              Value={option}
                              stateMng={(e) => setDeleteReason(e.target.value)}
                            />
                          );
                        })}
                      </section>
                      <div className="flex justify-around items-center gap-4">
                        <button
                          type="button"
                          className="lg:text-lg sm:text-md sm:px-4 tracking-wide  basis-1/3 py-2 text-center border-2 border-[#191919] rounded-lg  hover:bg-neutral-200 transition px-12"
                          onClick={() => {
                            setIsDeleteUserOpen(false);
                            setDeleteReasonText("");
                            setDeleteReason("");
                          }}
                        >
                          cancel
                        </button>
                        <button
                          type="button"
                          className="lg:text-lg sm:text-md sm:px-4 tracking-wide bg-[#191919] px-12 py-2  lg:border-2 border-[#191919] rounded-lg text-center text-white basis-2/3 hover:bg-[#404040] "
                          onClick={async () => {
                            const { userInfo, token } = getUserDataObject();

                            const { result } = await callApi(
                              "POST",
                              "private/all/create-account-delete",
                              token,
                              JSON.stringify({
                                description: checkPresence(deleteReasonText)
                                  ? deleteReasonText
                                  : deleteReason,
                              })
                            );

                            if (result?.status) {
                              await deleteUser();

                              await updateUserDataObject({
                                token: undefined,
                                isAuth: false,
                                userId: undefined,
                              });
                              router.push("/");
                            }

                            setIsDeleteUserOpen(false);
                            setDeleteReasonText("");
                            setDeleteReason("");
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
        {/* Delete user Modal ends */}
      </div>
    </div>
  );
}
