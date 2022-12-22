import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { IconCopy, IconSuccess } from "../assets/images";
import Image from "next/image";

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
                  className="text-xl font-medium text-center tracking-wide flex items-center"
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
                  <div className="flex justify-around my-4 items-center w-full">
                    <div className="lg:text-lg sm:text-md sm:px-4  basis-1/2 py-2 text-center border-2 border-[#191919] rounded-l-lg ">
                      your username is{" "}
                    </div>
                    <div className="text-lg tracking-wide px-12 lg:border-l-0 lg:py-2 sm:py-5 border-2 border-[#191919] rounded-r-lg text-center text-[#191919] basis-1/2">
                      {username}{" "}
                    </div>
                  </div>

                  <hr className="w-[17vw] mx-auto sm:w-1/2 bg-primaryBlack h-[2px]" />

                  <div className="flex justify-around my-4 items-center w-full">
                    <div className="lg:text-lg sm:text-md sm:px-4  basis-1/2 py-2 text-center border-2 border-[#191919] rounded-l-lg">
                      your password is{" "}
                    </div>
                    <div className="text-lg  tracking-wide px-12 lg:border-l-0 lg:py-2 sm:py-5 border-2 border-[#191919] rounded-r-lg text-center text-[#191919] basis-1/2">
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
                    className="btnStyle2 w-full p-2"
                    onClose={() => {}}
                    onClick={() => {
                      router.push("/basic-info");
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
