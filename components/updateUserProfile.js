import { checkPresence } from "./cards";
import {
  getUserDataFromApi,
  getUserDataObject,
  updateUserDataFromApi,
} from "./authFunctions";
import { useState, useRef, useEffect } from "react";
import { IconFeed, IconUser } from "../assets/images";
import Image from "next/image";
import {
  InputComponent,
  TextAreaComponent,
  RadioComponent,
  TagsComponent,
} from "./inputs";
import { handleFileInput } from "./fileFunctions";
import Select from "react-select";

export default function UpdateUserDetail({ update, setEditMode, setUpdate }) {
  const [currUserData, setCurrUserData] = useState({});
  const [tagText, setTagText] = useState("");
  const [tag, setTags] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [fieldsChanged, setFieldsChanged] = useState([]);
  const [changed, setChanged] = useState({});
  const [userDataInLocalStorage, setUserDataInLocalStorage] = useState([]);
  const [image, setImage] = useState();
  const inputRef = useRef();
  useEffect(() => {
    async function getUserInfo() {
      const { country, designation } = getUserDataObject();
      const result = await getUserDataFromApi();

      let newDesignation = designation.map((intName) => {
        return { value: intName.title, label: intName.title };
      });

      let newCountry = country.map((intName) => {
        return { value: intName.title, label: intName.title };
      });

      setCountryList(newCountry);
      setDesignationList(newDesignation);
      setUserDataInLocalStorage(result);
    }

    getUserInfo();
  }, []);

  const sendUserData = async () => {
    if (image != IconUser) {
      currUserData["profile_pic_url"] = image;
    }

    const dataUpdated = await updateUserDataFromApi({
      ...currUserData,
      tag: checkPresence(tag) ? tag : null,
    });

    if (dataUpdated?.status) {
      setEditMode(false);
      setUpdate(false);
    }
  };

  update && sendUserData();

  return (
    <div className="flex flex-col gap-8 min-h-max ">
      <form
        id="editUserProfile"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* profile pic changed */}
        <div className="flex flex-col items-center gap-1">
          <Image
            src={currUserData?.profile_pic_url || IconUser}
            alt="icon-user"
            width="100"
            height="100"
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
            className={`text-md p-1  text-sky-700 border-b-2 hover:border-sky-700 border-white  `}
            onClick={() => inputRef.current.click()}
          >
            change profile pic
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg tracking-wide ">Designation</p>
          <Select
            required
            placeholder={userDataInLocalStorage?.designation}
            id="designationselect"
            onChange={(e) => {
              if (!fieldsChanged.includes("designation")) {
                fieldsChanged.push("designation");
              }
              setCurrUserData((prev) => {
                return { ...prev, designation: e.label };
              });
            }}
            instanceId={"selectDesignation"}
            name="designation"
            className="select"
            options={designationList}
          />
        </div>

        <TextAreaComponent
          label={"About Me"}
          Name={"description"}
          placeholder={"Type about yourself"}
          stateMng={(e) => {
            if (!fieldsChanged.includes(e.target.name)) {
              fieldsChanged.push(e.target.name);
            }
            setCurrUserData((prev) => {
              return { ...prev, description: e.target.value };
            });
          }}
        />

        <div className="my-4">
          <p className="font-semibold my-2 text-lg">Gender</p>
          <section className="flex gap-4">
            <RadioComponent
              Name={"gender"}
              label={"Male"}
              Value={"male"}
              stateMng={(e) => {
                if (!fieldsChanged.includes(e.target.name)) {
                  fieldsChanged.push(e.target.name);
                }
                setCurrUserData((prev) => {
                  return { ...prev, gender: e.target.value };
                });
              }}
            />
            <RadioComponent
              Name={"gender"}
              label={"Female"}
              Value={"female"}
              stateMng={(e) => {
                if (!fieldsChanged.includes(e.target.name)) {
                  fieldsChanged.push(e.target.name);
                }
                setCurrUserData((prev) => {
                  return { ...prev, gender: e.target.value };
                });
              }}
            />
            <RadioComponent
              Name={"gender"}
              label={"Other"}
              Value={"other"}
              stateMng={(e) => {
                if (!fieldsChanged.includes(e.target.name)) {
                  fieldsChanged.push(e.target.name);
                }
                setCurrUserData((prev) => {
                  return { ...prev, gender: e.target.value };
                });
              }}
            />
          </section>
        </div>

        <div className="flex gap-4 justify-between">
          <section className="basis-1/2">
            <InputComponent
              type="number"
              defaultValue={userDataInLocalStorage?.year_of_birth}
              stateMng={(e) => {
                if (!fieldsChanged.includes(e.target.name)) {
                  fieldsChanged.push(e.target.name);
                }
                setCurrUserData((prev) => {
                  return { ...prev, year_of_birth: e.target.value };
                });
              }}
              Name={"year_of_birth"}
              placeholder={
                userDataInLocalStorage?.year_of_birth
                  ? userDataInLocalStorage?.year_of_birth
                  : "YYYY"
              }
              label={"Year of Birth"}
            />
          </section>
          <section className="basis-1/2">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-lg tracking-wide mb-[2px]">
                Country
              </p>
              <Select
                required
                placeholder={userDataInLocalStorage?.country}
                id="countryselect"
                onChange={(e) => {
                  if (!fieldsChanged.includes("country")) {
                    fieldsChanged.push("country");
                  }
                  setCurrUserData((prev) => {
                    return { ...prev, country: e.label };
                  });
                }}
                instanceId={"selectDesignation"}
                name="country"
                className="select"
                options={countryList}
              />
            </div>
          </section>
        </div>
        <section className="flex gap-4 justify-between my-4">
          <section className="basis-1/2">
            <InputComponent
              type="text"
              stateMng={(e) => {
                if (!fieldsChanged.includes(e.target.name)) {
                  fieldsChanged.push(e.target.name);
                }
                setCurrUserData((prev) => {
                  return { ...prev, state: e.target.value };
                });
              }}
              Name={"state"}
              label={"State"}
              placeholder={userDataInLocalStorage?.state}
            />
          </section>
          <section className="basis-1/2">
            <InputComponent
              type="text"
              stateMng={(e) => {
                if (!fieldsChanged.includes(e.target.name)) {
                  fieldsChanged.push(e.target.name);
                }
                setCurrUserData((prev) => {
                  return { ...prev, city: e.target.value };
                });
              }}
              Name={"City"}
              label={"City"}
              placeholder={userDataInLocalStorage?.city}
            />
          </section>
        </section>

        <TagsComponent
          heading={"Interests"}
          tagText={tagText}
          setTagText={setTagText}
          tag={tag}
          setTags={setTags}
        />
      </form>
    </div>
  );
}
