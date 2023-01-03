import { useState } from "react";
import { FileComponent } from "../components/inputs";
import { IconAdd, IconLoader } from "../assets/images";
import { createPost } from "../components/postFunctions";
import { alertUser } from "../components/Modals";
import { useRouter } from "next/router";

export default function CreatePostMeme() {
  const router = useRouter();
  const [image, setImage] = useState(IconAdd);
  return (
    <div className="w-full bg-neutral-100 min-h-screen h-max">
      <div className="md:w-1/2 flex flex-col gap-6 border-2 rounded-lg p-8 mx-auto bg-white my-4">
        <p className="text-xl tracking-wide font-semibold pb-2  w-full border-b-2">
          share a meme
        </p>

        <div className="md:w-1/3">
          <FileComponent accept={"image/*"} file={image} setFile={setImage} />
        </div>

        <div className="flex justify-around items-center gap-6">
          <button className="lg:text-lg sm:text-md tracking-wide basis-1/2  md:px-8 py-2 text-center border-2 border-[#191919] rounded-lg hover:bg-neutral-200 transition px-12 h-fit">
            cancel
          </button>
          <button
            className="lg:text-lg sm:text-md tracking-wide bg-[#191919] md:px-8 py-2 basis-1/2  lg:border-2 border-[#191919] rounded-lg text-center text-white hover:bg-[#404040] "
            onClick={async () => {
              if (image != IconAdd) {
                const res = await createPost(
                  {
                    type: "meme",
                    media_url: image,
                    tag: ["meme"],
                  },
                  "create-post"
                );

                if (res?.status) {
                  setImage(IconAdd);
                  return router.back();
                }
              } else {
                alertUser("Please add an image to continue!");
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
