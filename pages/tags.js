import Sidebar from "../components/sidebar";
import callApi from "../components/callApi";
import { checkPresence } from "../components/cards";
import parseTag from "../components/parseTag";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Tags() {
  const router = useRouter();
  const [tagList, setTagList] = useState([]);
  useEffect(() => {
    async function getTags() {
      const { result } = await callApi("GET", "public/read-post-tag/1");
      setTagList(result);
    }
    getTags();
  }, []);

  return (
    <div className="flex bg-neutral-100 w-full min-h-screen h-max">
      {/* <Sidebar selectedOption={1} /> */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 w-full p-8 ">
        {Array.isArray(tagList) &&
          tagList?.map((tag, index) => {
            return (
              <Link
                href={`/?feed_type=fresh&tag=${tag?.tag}`}
                key={index}
                className="flex flex-col bg-white p-4 rounded-md hover:border-primaryBlack items-center justify-center hover:shadow-xl border-t-8 h-[15rem] text-center"
                onClick={() => {
                  return parseTag(tag?.tag, "tagclick");
                }}
              >
                {checkPresence(tag?.["media_url"]) && (
                  <Image
                    src={tag?.["media_url"]}
                    alt="tag-icon"
                    width={"35"}
                    height={"35"}
                  />
                )}
                <p className="text-lg tracking-wide font-semibold">
                  {tag?.tag}
                </p>
                <p>({tag?.count})</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
