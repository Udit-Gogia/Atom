import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import { createPost, updateFormData } from "../components/postFunctions";
import callApi from "../components/callApi";
import { useState } from "react";
import {
  FileComponent,
  TextAreaComponent,
  TagsComponent,
} from "../components/inputs";
import { IconAdd } from "../assets/images";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const { result: serviceType } = await callApi(
    "GET",
    "public/read-box/1?type=service_type"
  );

  return {
    props: {
      serviceType,
    },
  };
}

export default function CreatePostService({ serviceType }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    service_type: "",
    media_url: "",
    tag: [],
    link_url: "",
    email: "",
    mobile: "",
    whatsapp: "",
    description: "",
  });

  function updateFormData(event) {
    const Name = event.target.name;
    const value = event.target.value;

    setFormData((prevValue) => {
      return { ...prevValue, [Name]: value };
    });
  }

  const [tagText, setTagText] = useState("");

  return (
    <div className="w-full bg-neutral-100 min-h-max">
      <div className="md:w-1/2 flex flex-col gap-6 border-2 rounded-lg p-8 mx-auto bg-white my-4">
        <p className="text-xl tracking-wide font-semibold pb-2  w-full border-b-2">
          list your service
        </p>

        <form
          id="workseeker"
          onSubmit={async (e) => {
            e.preventDefault();

            const res = await createPost(formData, "create-post-service");

            if (res?.status) {
              await setFormData({
                service_type: "",
                media_url: "",
                tag: [],
                link_url: "",
                email: "",
                mobile: "",
                whatsapp: "",
                description: "",
              });
              return router.back();
            }
          }}
          method="post"
          className="flex flex-col gap-6"
        >
          {/* service_type starts */}
          <div>
            <h1 className="text-lg mb-1">select service type</h1>
            <input
              type="text"
              list="work"
              name="service_type"
              className="px-4 py-2 border-2 rounded-lg w-full"
              onClick={() => setFormData({ ...formData, service_type: `` })}
              onChange={updateFormData}
              value={formData.service_type}
              placeholder="enter work profile.."
              required
            />
            <datalist id="work">
              {Array.isArray(serviceType) &&
                serviceType?.map((service, index) => (
                  <option key={index} value={service.title}>
                    {service.title}
                  </option>
                ))}
            </datalist>
          </div>
          {/* service_type ends */}

          {/* tag starts */}
          <TagsComponent
            heading={"Enter relevant tags"}
            tag={formData.tag}
            setTags={(tag) => setFormData({ ...formData, tag: [...tag] })}
            tagText={tagText}
            setTagText={setTagText}
          />
          {/* tag ends */}

          {/* media_url starts */}
          <div className="flex flex-col gap-2">
            <h1 className="text-lg mb-1">attach a brochure (optional)</h1>
            <section className="md:w-1/3 ">
              <FileComponent
                name="media_url"
                accept={".pdf"}
                file={IconAdd}
                setFile={(awsUrl) =>
                  setFormData({ ...formData, media_url: `${awsUrl}` })
                }
              />
            </section>
          </div>
          {/* media_url ends */}

          {/* link_url starts */}
          <div>
            <h1 className="text-lg mb-1">
              add website/social links (optional)
            </h1>

            <input
              type="text"
              name="link_url"
              className="px-4 py-2 border-2 rounded-lg w-full"
              onChange={updateFormData}
              value={formData.link_url}
            />
          </div>
          {/* link_url ends */}

          {/* contact details start */}
          <div className="flex flex-col gap-2">
            <h1 className=" text-lg">add your contact details (optional)</h1>

            {/* email starts */}
            <h1 className="">email</h1>
            <input
              type="email"
              className="px-4 py-2 border-2 rounded-lg w-full"
              value={formData.email}
              label={"email"}
              name="email"
              onChange={updateFormData}
            />

            {/* email ends */}

            {/* phone number input starts */}
            <div className="flex flex-col gap-2">
              <h1 className="mb-1">mobile number </h1>

              <PhoneInput
                name="mobile"
                onChange={updateFormData}
                enableSearch={true}
                inputStyle={{
                  width: "100%",
                  border: "2px solid #e5e7eb",
                  borderRadius: "0.375rem",
                }}
                country={"in"}
                value={formData.mobile}
              />
            </div>
            {/* phone number input ends */}

            {/* whatsapp input starts */}
            <div className="flex flex-col gap-2">
              <h1 className="mb-1">whatsapp number</h1>

              <PhoneInput
                name="whatsapp"
                onChange={updateFormData}
                enableSearch={true}
                inputStyle={{ width: "100%" }}
                country={"in"}
                value={formData.whatsapp}
              />
            </div>
            {/* whatsapp input ends */}
          </div>
          {/* contact details ends */}

          {/* description starts */}
          <TextAreaComponent
            Name="description"
            stateMng={updateFormData}
            value={formData.description}
            placeholder="write something about your services so that it could attract people..."
            label="write something about the service"
          />
          {/* description ends */}

          {/* button starts */}
          <div className="flex justify-around items-center gap-6">
            <button className="lg:text-lg sm:text-md tracking-wide basis-1/2  md:px-8 py-2 text-center border-2 border-[#191919] rounded-lg hover:bg-neutral-200 transition px-12 h-fit">
              cancel
            </button>
            <button
              type="submit"
              form="workseeker"
              className="lg:text-lg sm:text-md tracking-wide bg-[#191919] md:px-8 py-2 basis-1/2  lg:border-2 border-[#191919] rounded-lg text-center text-white hover:bg-[#404040] "
            >
              submit
            </button>
          </div>
          {/* button ends */}
        </form>
      </div>
    </div>
  );
}
