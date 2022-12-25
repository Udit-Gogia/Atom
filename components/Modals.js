import { Dialog, Transition, Combobox } from "@headlessui/react";
import { Fragment, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { IconCopy, IconSuccess, IconUser } from "../assets/images";
import Image from "next/image";
import {
  getUserDataObject,
  updateUserDataFromApi,
  updateUserDataObject,
} from "../components/authFunctions";
import { CountrySelect, InputComponent } from "../components/inputs";
import { handleFileInput } from "../components/fileFunctions";
import Select from "react-select";
import { checkPresence } from "../components/cards";

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
                    <div className="text-lg tracking-wide px-12 lg:border-l-0 py-2  border-2 border-[#191919] rounded-r-lg text-center text-[#191919] basis-1/2">
                      {username}{" "}
                    </div>
                  </div>

                  <div className="flex justify-around my-4 items-center w-full">
                    <div className="lg:text-lg sm:text-md sm:px-4  basis-1/2 py-2 text-center border-2 border-[#191919] rounded-l-lg">
                      your password is{" "}
                    </div>
                    <div className="text-lg  tracking-wide px-12 lg:border-l-0 py-2  border-2 border-[#191919] rounded-r-lg text-center text-[#191919] basis-1/2">
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
                      onChange={(e) => handleFileInput(e, setImage)}
                      name="profile_pic_url"
                      accept="image/*"
                      type="file"
                      className="hidden"
                    />

                    <button
                      onClick={() => inputRef.current.click()}
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
                      placeholder="Select your country"
                      required
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
                      placeholder="Select your designation"
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
