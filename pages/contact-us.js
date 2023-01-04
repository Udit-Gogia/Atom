import { FileComponent, TextAreaComponent } from "../components/inputs";

import callApi from "../components/callApi";
import { validateRes, getUserDataFromApi } from "../components/authFunctions";
import { useState, useEffect } from "react";
import { IconAdd } from "../assets/images";
import { useRouter } from "next/router";
export default function ContactUs() {
  const router = useRouter();

  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(IconAdd);
  useEffect(() => {
    const isAuth = JSON.parse(localStorage.getItem("userData"))?.isAuth;
    isAuth ? setUserAuthenticated(true) : setUserAuthenticated(false);
  }, []);
  const submitRequest = async () => {
    const { id: created_by_id } =
      userAuthenticated && (await getUserDataFromApi());
    const data = {
      description,
      media_url: image != IconAdd ? image : null,
      created_by_id: created_by_id || null,
    };

    const { response, result } = await callApi(
      "POST",
      "public/create-support",
      null,
      JSON.stringify(data),
      "contact us message sent successfully"
    );
    const res = validateRes(response, result);

    if (res && res.status) {
      setDescription("");
      setImage(IconAdd);
    }

    return router.back();
  };

  return (
    <div className="w-full bg-neutral-100 h-screen">
      <div className="md:w-1/2 flex flex-col gap-6 border-2 rounded-lg p-8 mx-auto bg-white my-4">
        <p className="text-xl tracking-wide font-semibold pb-2  w-full border-b-2">
          Contact Us
        </p>

        <TextAreaComponent
          Name={"contactUsDescription"}
          value={description}
          stateMng={(e) => setDescription(e.target.value)}
          // stateMng={setDescription}
          placeholder={"please let us know how can we help you"}
        />
        <div
          className={`flex flex-col gap-4 w-1/3 text-center ${
            userAuthenticated ? "" : "hidden"
          }`}
        >
          <p className="font-semibold ">Add media</p>
          <FileComponent accept={"image/*"} file={image} setFile={setImage} />
        </div>

        <div className="flex justify-around items-center gap-6">
          <button className="lg:text-lg sm:text-md sm:px-4 tracking-wide  basis-1/2 py-2 text-center border-2 border-[#191919] rounded-lg hover:bg-neutral-200 transition px-12" 
          onClick={() => router.back()}>
            cancel
          </button>
          <button
            className="lg:text-lg sm:text-md sm:px-4 tracking-wide bg-[#191919] px-12 py-2 basis-1/2  lg:border-2 border-[#191919] rounded-lg text-center text-white hover:bg-[#404040] "
            onClick={submitRequest}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
