import { useRouter } from "next/router";
import { ShowPosts } from "./workseeker";
import { checkPresence } from "../../components/cards";
import parseTag, { tagName } from "../../components/parseTag";

export default function Workgiver() {
  const router = useRouter();
  return (
    <div className="w-full bg-neutral-100 ">
      <div className="mx-auto min-h-screen h-max">
        {checkPresence(tagName) && (
          <div className=" bg-zinc-200 text-md tracking-wide w-fit px-2 py-1 rounded-sm border-l-2 border-[#191919] my-2 flex mx-auto">
            <p>{tagName}</p>
            <button
              type="button"
              className="ml-2"
              onClick={() => {
                parseTag(null);
                router.reload();
              }}
            >
              X
            </button>
          </div>
        )}
        <section className="">
          <ShowPosts feedType={"fresh"} type={"workgiver"} />
        </section>
      </div>
    </div>
  );
}
