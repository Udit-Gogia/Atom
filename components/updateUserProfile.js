import { checkPresence } from "./cards";
import {
  getUserDataFromApi,
  getUserDataObject,
  updateUserDataFromApi,
} from "./authFunctions";
import { useState, useRef } from "react";
import { IconFeed, IconUser } from "../assets/images";
import Image from "next/image";
import { InputComponent } from "./inputs";
import { handleFileInput } from "./fileFunctions";

const userDetails = [
  {
    heading: "Username",
    name: "username",
    type: "text",
  },
  {
    heading: "Name",
    name: "name",
    type: "text",
  },
  {
    heading: "Mobile",
    name: "mobile",
    type: "number",
  },
  {
    heading: "Whatsapp",
    name: "whatsapp",
    type: "number",
  },
  {
    heading: "Phone",
    name: "phone",
    type: "number",
  },
  {
    heading: "City",
    name: "city",
    type: "text",
  },
  {
    heading: "State",
    name: "state",
    type: "text",
  },
  {
    heading: "Country",
    name: "country",
    type: "text",
  },
  {
    heading: "Address",
    name: "address",
    type: "text",
  },
  {
    heading: "Pincode",
    name: "pincode",
    type: "number",
  },
  {
    heading: "Gender",
    name: "gender",
  },
  {
    heading: "Year of Birth",
    name: "year_of_birth",
    type: "number",
  },
  {
    heading: "Description",
    name: "description",
    type: "text",
  },
];
export default function UpdateUserDetail({ update, setEditMode, setUpdate }) {
  const [fieldsChanged, setFieldsChanged] = useState([]);
  const [changed, setChanged] = useState({});

  const [editValue, setEditValue] = useState("");
  const [image, setImage] = useState(IconUser);
  const inputRef = useRef(null);

  const sendUserData = async () => {
    const result = await getUserDataFromApi();

    userDetails.map((info, index) => {
      if (
        result[info.name] != document.getElementById(info.name).value &&
        fieldsChanged.includes(info.name) &&
        checkPresence(document.getElementById(info.name).value)
      ) {
        changed[info.name] = document.getElementById(info.name).value;
      }
    });

    if (image != IconUser) {
      changed["profile_pic_url"] = image;
    }
    const dataUpdated = await updateUserDataFromApi(changed);

    if (dataUpdated?.status) {
      setEditMode(false);
      setUpdate(false);
    }
  };

  update && sendUserData();

  return (
    <div className="flex flex-col gap-8 mx-2">
      {/* profile pic changed */}
      <div className="flex flex-col items-center gap-1">
        <Image
          src={image || IconUser}
          alt="icon-user"
          width="50"
          height="50"
          className="rounded-full"
        />

        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={(e) => handleFileInput(e, setImage)}
          name="profilePicture"
          accept="image/*"
        />

        <button
          className={`text-md p-1  text-[#404040] border-b-2 hover:border-primaryBlack border-white  `}
          onClick={() => inputRef.current.click()}
        >
          change profile pic
        </button>
      </div>

      {userDetails.map((userDetail, index) => {
        return (
          <div className="flex flex-col gap-2" key={index}>
            <label
              htmlFor={userDetail?.name}
              className="font-semibold text-lg tracking-wide"
            >
              {userDetail?.heading}
            </label>
            <input
              type={userDetail?.type}
              name={userDetail?.name}
              id={userDetail?.name}
              className="border-2 rounded-md p-2  focus:outline-[#191919]"
              required
              onChange={(e) => {
                setEditValue(e.target.value);
                if (!fieldsChanged.includes(e.target.name)) {
                  fieldsChanged.push(e.target.name);
                }
              }}
            ></input>
          </div>
        );
      })}
    </div>
  );
}
