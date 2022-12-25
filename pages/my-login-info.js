import { useState, useEffect } from "react";
import Image from "next/image";
import { alertUser } from "../components/Modals";
import { IconEdit } from "../assets/images";
import {
  getUserDataFromApi,
  updatePassword,
  updateUserDataFromApi,
} from "../components/authFunctions";

export default function MyLoginInfo() {
  const [currUsername, setCurrUsername] = useState("");

  const [editUsername, setEditusername] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      const result = await getUserDataFromApi();
      const { username } = result;
      setCurrUsername(username);
    }

    fetchUserData();
  }, []);

  async function updateCredentials() {
    if (editUsername) {
      if (currUsername != newUsername) {
        const result = await updateUserDataFromApi({ username: newUsername });

        if (result?.status) {
          setCurrUsername(newUsername);
          setEditusername(false);
          return setNewUsername("");
        }
      } else {
        alertUser("same username");
      }
    } else if (editPassword) {
      if (newPassword === newConfirmPassword) {
        const result = await updatePassword({ password: newPassword });
        if (result?.status) {
          setEditPassword(false);
          setNewPassword("");
          return setNewConfirmPassword("");
        }
      } else {
        alertUser("password does not match");
      }
    }
  }

  return (
    <div className="flex flex-col border-2 sm:p-4 lg:p-2 sm:mx-4 md:mx-auto mb-12 rounded-lg md:w-5/12 mt-2 lg:px-2 h-fit gap-4">
      {/* edit username */}
      <div className={`mx-4 px-4 ${editPassword ? "hidden" : ""}`}>
        {/* heading */}
        <h1 className="text-md roboto-reg my-2 px-1 ">
          {editUsername ? "current username" : "username"}
        </h1>
        <div
          className={`w-full border-2 rounded-lg p-2 flex items-center border-neutral-200 `}
        >
          {/* current username  */}
          <input
            type="text"
            defaultValue={currUsername}
            name="username"
            className={`p-2 w-full rounded-md mr-4 focus:outline-none`}
            readOnly
          ></input>

          {/* edit current username */}
          <button
            onClick={() => {
              setEditusername(!editUsername);
              setEditPassword(false);
            }}
            className={` hover:bg-neutral-100 px-2 rounded-lg pt-2`}
          >
            <Image src={IconEdit} alt="icon-edit" width="25" height="25" />
          </button>
        </div>

        {/* new username input */}
        <div className={`mx-4 px-4 ${editUsername ? "inline " : "hidden "}`}>
          <h1 className="text-md px-1">new username</h1>
          <input
            type="text"
            placeholder="new username"
            value={newUsername}
            name="new_username"
            className={`w-full border-2 rounded-lg p-4 mt-2   ${
              editUsername ? "inline border-[#191919]" : "hidden "
            }`}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
      </div>

      {/* edit password */}
      <div className={`mx-4 mb-4 px-4 ${editUsername ? "hidden" : "inline"}`}>
        <div className={`${editPassword ? "hidden" : "inline"}`}>
          <h1 className="text-md roboto-reg my-2 px-1">password</h1>

          {/* curr Password */}
          <div
            className={`w-full border-2 rounded-lg p-2 flex items-center ${
              editPassword ? "border-[#191919] " : "border-neutral-200 "
            }`}
          >
            <input
              type="password"
              name="password"
              placeholder="***********"
              className={`p-2 w-full  rounded-lg mr-4 focus:outline-none `}
              readOnly
            ></input>
            <button
              onClick={() => {
                setEditPassword(!editPassword);
                setEditusername(false);
              }}
              className={`${
                editPassword ? "" : "inline"
              } hover:bg-neutral-100 px-2 rounded-lg pt-2 focus:outline-none`}
            >
              <Image src={IconEdit} alt="icon-edit" width="25" height="25" />
            </button>
          </div>
        </div>

        {/* new password */}
        <div className={`mx-4 px-4 $ ${editPassword ? "inline " : "hidden "}`}>
          <h1 className="text-md roboto-reg px-1">new password</h1>
          <input
            type="password"
            placeholder="create your new password"
            value={newPassword}
            name="new_password"
            className={`w-full border-2 rounded-lg p-4 mt-2 mr-4  ${
              editPassword ? "inline border-[#191919]" : "hidden "
            }`}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <h1 className="text-md roboto-reg px-1 mt-4">confirm password</h1>
          <input
            type="password"
            placeholder="re-enter your new password"
            value={newConfirmPassword}
            name="new_password"
            className={`w-full border-2 rounded-lg p-4 mt-2 mr-4  ${
              editPassword ? "inline border-[#191919]" : "hidden "
            }`}
            onChange={(e) => setNewConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      {/* buttons */}
      <div
        className={`flex lg:h-10 m-4 px-4 ${
          editUsername || editPassword ? "inline" : "hidden"
        }`}
      >
        <button
          className={`btnStyle1 basis-1/2 ${
            editUsername || editPassword ? "inline" : "hidden"
          }`}
          onClick={() => {
            setEditusername(false);
            setEditPassword(false);
          }}
        >
          cancel
        </button>
        <button
          className={`lg:text-lg sm:text-md sm:px-4 tracking-wide bg-[#191919] lg:px-4 lg:border-2 border-[#191919] rounded-lg text-center text-white basis-1/2 ml-2 hover:bg-white hover:text-[#191919] transition editButton ${
            editUsername || editPassword ? "inline" : "hidden"
          }`}
          onClick={updateCredentials}
        >
          save
        </button>
      </div>
    </div>
  );
}
