import { IconInfo } from "../assets/images";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import {
  updateUserDataObject,
  deleteUser,
  getUserDataObject,
} from "../components/authFunctions";

export default function DeleteMyAccount() {
  const router = useRouter();
  useEffect(() => {
    const { isAuth } = getUserDataObject();
    if (!isAuth) {
      router.back();
    }
  }, []);

  async function handleSignOut() {
    await deleteUser();
    await updateUserDataObject("token", undefined);
    await updateUserDataObject("isAuth", false);
    await updateUserDataObject("userId", undefined);
    router.push("/");
  }

  return (
    <div className="flex flex-col border-2 sm:p-12 lg:p-6 sm:mx-4 md:mx-auto mt-8 rounded-md md:w-5/12 h-fit">
      <div className="flex justify-center  pt-12 ">
        <div className="flex gap-2 items-center">
          <Image
            src={IconInfo}
            alt="icon-info"
            width="50"
            height="50"
            style={{ width: "auto" }}
          ></Image>
          <p className="text-2xl font-semibold tracking-wide">
            do you really want to delete your account?
          </p>
        </div>
      </div>
      <div className="flex justify-around m-4 items-center  mt-12">
        <button
          className="lg:text-lg sm:text-md sm:px-4 tracking-wide bg-[#191919] px-12 py-2  lg:border-2 border-[#191919] rounded-lg text-center text-white basis-1/2 mx-2 hover:bg-[#404040] "
          onClick={() => router.back()}
        >
          go back
        </button>
        <button
          className="lg:text-lg sm:text-md sm:px-4 tracking-wide text-center basis-1/2 py-2 px-12  border-2 border-[#191919] rounded-lg mx-2 hover:bg-neutral-200 transition "
          onClick={handleSignOut}
        >
          continue
        </button>
      </div>
    </div>
  );
}
