import { checkPresence } from "./cards";
import { getUserDataFromApi } from "./authFunctions";
import { useEffect, useState } from "react";
import { IconUser, IconStar } from "../assets/images";
import Image from "next/image";
import { TextDisplay } from "./inputs";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    async function getUserInfo() {
      const result = await getUserDataFromApi();
      setUserInfo(result);
    }
    getUserInfo();
  }, []);

  const userDetails = [
    {
      heading: "Name",
      content: userInfo?.["name"],
    },
    {
      heading: "About Me",
      content: userInfo?.["description"],
    },

    {
      heading: "Mobile",
      content: userInfo?.["mobile"],
    },
    {
      heading: "Whatsapp",
      content: userInfo?.["whatsapp"],
    },
    {
      heading: "Phone",
      content: userInfo?.["phone"],
    },
    {
      heading: "City",
      content: userInfo?.["city"],
    },
    {
      heading: "State",
      content: userInfo?.["state"],
    },
    {
      heading: "Country",
      content: userInfo?.["country"],
    },
    {
      heading: "Address",
      content: userInfo?.["address"],
    },
    {
      heading: "Pincode",
      content: userInfo?.["pincode"],
    },
    {
      heading: "Gender",
      content: userInfo?.["gender"],
    },
    {
      heading: "Year of Birth",
      content: userInfo?.["year_of_birth"],
    },
  ];

  return (
    <div className="flex flex-col gap-8 mx-2">
      <div className="flex gap-4">
        {checkPresence(userInfo?.["profile_pic_url"]) ? (
          <Image
            src={userInfo?.["profile_pic_url"]}
            alt="icon-user"
            width="100"
            height="100"
            className="rounded-full "
          />
        ) : (
          <Image
            src={IconUser}
            alt="icon-user"
            width="50"
            height="50"
            className="rounded-full "
          />
        )}

        <div className="flex flex-col gap-2">
          <TextDisplay
            heading={userInfo?.["username"]}
            content={userInfo?.["designation"]}
          />

          <section className="flex gap-2">
            <Image
              src={IconStar}
              width={"25"}
              height={"10"}
              alt="icon-star.png"
            />
            <TextDisplay content={`${userInfo?.["rating"]}`} />
          </section>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {userDetails.map((userDetail, index) => {
          return (
            <TextDisplay
              key={index}
              heading={userDetail.heading}
              content={userDetail.content}
            />
          );
        })}
      </div>

      {checkPresence(userInfo?.tag) && (
        <div>
          <p className="font-semibold text-lg tracking-wide">My Interests</p>
          <div className="flex my-4 flex-wrap ">
            {Array.isArray(userInfo?.tag) &&
              userInfo?.tag.map((interest, index) => {
                return (
                  <p className="lg:mr-3 bg-zinc-200 text-md tracking-wide w-fit px-2 py-1 rounded-sm border-l-2 border-[#191919] my-2">
                    {interest}
                  </p>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
