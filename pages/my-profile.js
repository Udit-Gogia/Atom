import Image from "next/image";
import { useState } from "react";
import { IconEdit } from "../assets/images";
import UserProfile from "../components/userProfile";
import UpdateUserDetail from "../components/updateUserProfile";

export default function MyProfile() {
  const [editMode, setEditMode] = useState(false);
  const [update, setUpdate] = useState(false);

  return (
    <div className="w-full bg-neutral-100 min-h-screen">
      <div className="md:w-1/2 flex flex-col gap-6 border-2 rounded-lg p-8 mx-auto bg-white my-4 shadow-sm">
        {/* header starts*/}
        <div className="flex m-2 justify-between border-b-2 items-center">
          <p className="text-xl tracking-wide font-semibold pb-2 w-full ">
            My Profile Info
          </p>
          <div className="flex lg:h-10 pb-2">
            <button
              onClick={() =>
                editMode ? setEditMode(false) : setEditMode(true)
              }
              className={`${
                editMode ? "hidden" : "inline"
              } hover:bg-neutral-100 px-2 rounded-lg pt-2`}
            >
              <Image src={IconEdit} alt="icon-edit" width="25" height="25" />
            </button>
            <button
              className={`text-lg px-2 md:px-4 mr-2 hover:underline text-[#404040] font-medium tracking-wide hover:bg-neutral-200 rounded-lg ${
                editMode ? "inline" : "hidden"
              }`}
              onClick={() => {
                setEditMode(false), setUpdate(false);
              }}
            >
              cancel
            </button>
            <button
              className={`lg:text-lg sm:text-md px-2 md:px-4 tracking-wide bg-[#191919] lg:px-4 lg:border-2 border-[#191919] rounded-lg text-center text-white basis-1/2 mx-2 hover:bg-white hover:text-[#191919] transition editButton ${
                editMode ? "inline" : "hidden"
              }`}
              onClick={() => setUpdate(!update)}
            >
              save
            </button>
          </div>
        </div>
        {/* header ends*/}
        {/* detail sections starts*/}
        {editMode ? (
          <UpdateUserDetail
            update={update}
            setEditMode={setEditMode}
            setUpdate={setUpdate}
          />
        ) : (
          <UserProfile />
        )}

        {/* detail sections ends*/}
      </div>
    </div>
  );
}
