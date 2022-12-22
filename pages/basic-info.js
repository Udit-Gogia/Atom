import { useEffect, useState, useRef } from "react";
import {
  getUserDataObject,
  updateUserDataFromApi,
} from "../components/authFunctions";
import { InputComponent } from "../components/inputs";
import { handleFileInput } from "../components/fileFunctions";
import { IconUser } from "../assets/images";
import Image from "next/image";
import Select from "react-select";
import { checkPresence } from "../components/cards";
import { useRouter } from "next/router";

export default function BasicInfo() {
  const router = useRouter();
  const [image, setImage] = useState(IconUser);
  const [countryList, setCountryList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [interestList, setInterestList] = useState([]);
  const [currUserData, setCurrUserData] = useState({
    username: "",
    profile_pic_url: "",
    country: "",
    designation: "",
    tag: [],
  });
  const [userInterestTag, setUserInterestTag] = useState([]);

  useEffect(() => {
    const { userInfo, country, designation, interest } = getUserDataObject();

    let newInterest = [];
    let newCountry = [];
    let newDesignation = [];
    interest.map((interstName, index) => {
      newInterest.push({ value: interstName.title, label: interstName.title });
    });
    country.map((countryName, index) => {
      newCountry.push({ value: countryName.title, label: countryName.title });
    });
    designation.map((designationName, index) => {
      newDesignation.push({
        value: designationName.title,
        label: designationName.title,
      });
    });

    setCurrUserData((prev) => {
      return {
        ...prev,
        username: userInfo?.username,
        profile_pic_url: userInfo?.profile_pic_url,
      };
    });

    setCountryList(newCountry);
    setDesignationList(newDesignation);
    setInterestList(newInterest);
  }, []);

  const inputRef = useRef(null);
  return (
    <div className="min-h-screen h-max bg-neutral-100">
      <div className="w-1/2 mx-auto bg-white flex flex-col gap-8 p-4 m-4 rounded-md">
        <h1 className="font-semibold tracking-wide text-xl text-center">
          Add Basic Info
        </h1>

        <div className="flex flex-col items-center gap-1">
          <Image
            src={image}
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

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg tracking-wide ">Country</p>
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
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg tracking-wide ">Designation</p>
          <Select
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
          <p className="font-semibold text-lg tracking-wide ">Interests</p>
          <Select
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
          className="AuthButton"
          onClick={async () => {
            userInterestTag.map((interest) => {
              currUserData.tag.push(interest.value);
            });
            currUserData.tag = [...new Set(currUserData.tag)];
            if (image != IconUser) {
              currUserData.profile_pic_url = image;
            }

            const result = await updateUserDataFromApi(currUserData);

            if (checkPresence(result)) {
              router.push("/");
            }
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
