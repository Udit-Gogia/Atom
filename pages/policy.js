import { useState, useEffect } from "react";
import callApi from "../components/callApi";
import { checkPresence, CompanyCard } from "../components/cards";

export default function Policy() {
  const [policy, setPolicy] = useState([]);

  useEffect(() => {
    async function fetchAbout() {
      const { result } = await callApi("GET", "public/read-box/1?type=policy");

      checkPresence(result) && setPolicy(result);

      return result;
    }

    fetchAbout();
  }, []);

  return (
    <div className="flex flex-col-reverse gap-4 bg-neutral-100">
      {checkPresence(policy) &&
        policy?.map((policyCard, index) => {
          const {
            title,
            description,
            media_url: media,
            link_url: link,
            tag: tags,
          } = checkPresence(policyCard) && policyCard;

          return (
            <CompanyCard
              key={index}
              title={title}
              description={description}
              media={media}
              link={link}
              tags={tags}
            />
          );
        })}
    </div>
  );
}
