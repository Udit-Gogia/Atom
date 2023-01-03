import { useState } from "react";
import { createPost } from "../components/postFunctions";
import { IconAdd } from "../assets/images";
import {
  FileComponent,
  TagsComponent,
  TextAreaComponent,
} from "../components/inputs";
import { useRouter } from "next/router";

export default function CreatePost() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(IconAdd);
  const [tagText, setTagText] = useState("");
  const [tag, setTags] = useState([]);
  return (
    <div className="w-full bg-neutral-100 h-screen">
      <div className="md:w-1/2 flex flex-col gap-6 border-2 rounded-lg p-8 mx-auto bg-white my-4">
        <p className="text-xl tracking-wide font-semibold pb-2  w-full border-b-2">
          share anything
        </p>

        <TextAreaComponent
          Name={"createPostDescription"}
          value={description}
          stateMng={(e) => setDescription(e.target.value)}
          placeholder={"What's on your mind?"}
        />
        <div className="md:w-1/3">
          <FileComponent accept={"image/*"} file={image} setFile={setImage} />
        </div>
        <TagsComponent
          setTagText={setTagText}
          setTags={setTags}
          tag={tag}
          tagText={tagText}
        />

        <div className="flex justify-around items-center gap-6">
          <button
            type="button"
            className="lg:text-lg sm:text-md tracking-wide basis-1/2  md:px-8 py-2 text-center border-2 border-[#191919] rounded-lg hover:bg-neutral-200 transition px-12 h-fit"
          >
            cancel
          </button>
          <button
            type="button"
            className="lg:text-lg sm:text-md tracking-wide bg-[#191919] md:px-8 py-2 basis-1/2  lg:border-2 border-[#191919] rounded-lg text-center text-white hover:bg-[#404040] "
            onClick={async () => {
              const res = await createPost(
                {
                  type: "random",
                  description,
                  media_url: image != IconAdd ? image : null,
                  tag,
                },
                "create-post"
              );

              if (res?.status) {
                setDescription("");
                setImage(IconAdd);
                setTagText("");
                setTags([]);
                return router.back();
              }
            }}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
