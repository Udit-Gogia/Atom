import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { validateRes, getUserDataObject } from "../components/authFunctions";
import callApi from "../components/callApi";
import { alertUser } from "../components/Modals";

export default function StarRating() {
  const router = useRouter();
  useEffect(() => {
    const { isAuth } = getUserDataObject();
    if (!isAuth) {
      router.back();
      alertUser("Login To Continue");
    }
  }, []);

  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(5);

  function cancelRating() {
    setRating(5);
    setHover(5);
  }

  async function submitRating() {
    const { token } = JSON.parse(localStorage.getItem("userData"));
    const { response, result } = await callApi(
      "POST",
      "private/all/create-rating",
      token,
      JSON.stringify({
        received_by_id: 1,
        rating,
      }),
      "rating sent successfully"
    );
    setRating(5);
    setHover(5);
    validateRes(response, result);
  }

  return (
    <div className="w-full bg-neutral-100 h-screen">
      <div className="md:w-1/2 flex flex-col gap-8 border-2 rounded-lg p-8 mx-auto bg-white my-4 ">
        <p className="text-xl tracking-wide font-semibold pb-2  w-full border-b-2">
          Rate Atom
        </p>
        <div className="flex mx-auto">
          {[...Array(10)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={`${
                  index <= ((rating && hover) || hover)
                    ? "text-yellow-300"
                    : "text-neutral-500"
                } text-4xl `}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
        <div className="flex justify-around items-center gap-4">
          <button
            className="lg:text-lg sm:text-md sm:px-4 tracking-wide  basis-1/2 py-2 text-center border-2 border-[#191919] rounded-lg  hover:bg-neutral-200 transition px-12"
            onClick={cancelRating}
          >
            cancel
          </button>
          <button
            className="lg:text-lg sm:text-md sm:px-4 tracking-wide bg-[#191919] px-12 py-2  lg:border-2 border-[#191919] rounded-lg text-center text-white basis-1/2 hover:bg-[#404040] "
            onClick={submitRating}
          >
            rate now
          </button>
        </div>
      </div>
    </div>
  );
}
