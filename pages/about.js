import { useState, useEffect } from "react";
import callApi from "../components/callApi";
import { checkPresence, CompanyCard } from "../components/cards";

export function AboutCard() {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    async function fetchAbout() {
      const { result } = await callApi("GET", "public/read-box/1?type=about");

      checkPresence(result) && setAbout(result);
      return result;
    }

    fetchAbout();
  }, []);

  const {
    title,
    description,
    media_url: media,
    link_url: link,
    tag: tags,
  } = checkPresence(about) && about[0];

  return (
    <>
      {checkPresence(about) && (
        <CompanyCard
          title={title}
          description={description}
          media={media}
          link={link}
          tags={tags}
        />
      )}
    </>
  );
}

export default function About() {
  return (
    <div className="bg-neutral-100 min-h-[90vh]">
      <AboutCard />
    </div>
  );
}
