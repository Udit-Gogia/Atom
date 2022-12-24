import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import { createPost } from "../components/postFunctions";
import callApi from "../components/callApi";
import Image from "next/image";
import { useState } from "react";
import {
  FileComponent,
  TextAreaComponent,
  TagsComponent,
} from "../components/inputs";
import {
  IconConsultant,
  IconFullTime,
  IconFreelance,
  IconAdd,
} from "../assets/images";

export async function getServerSideProps() {
  const { result: workProfile } = await callApi(
    "GET",
    "public/read-box/1?type=work_profile"
  );

  return {
    props: {
      workProfile,
    },
  };
}

const jobRoles = [
  {
    jobName: "full-time",
    jobImage: IconFullTime,
  },
  {
    jobName: "consultant",
    jobImage: IconConsultant,
  },
  {
    jobName: "internship",
    jobImage: IconFreelance,
  },
  {
    jobName: "freelance",
    jobImage: IconFreelance,
  },
];

const experienceOptions = [
  "0-1 year of experience",
  "1-3 years of experience",
  "3-5 years of experience",
  "5-10 years of experience",
  "10-15 years of experience",
  "15-20 years of experience",
  "20-30 years of experience",
  ">30 years of experience",
];

export default function CreatePostWorkgiver({ workProfile }) {
  const [formData, setFormData] = useState({
    work_type: "",
    work_profile: "",
    experience: "",
    city: "",
    media_url: "",
    tag: [],
    link_url: "",
    email: "",
    mobile: "",
    whatsapp: "",
    description: "",
  });

  const [tagText, setTagText] = useState("");

  function updateFormData(event) {
    const Name = event.target.name;
    const value = event.target.value;

    setFormData((prevValue) => {
      return { ...prevValue, [Name]: value };
    });
  }

  return (
    <div className="w-full bg-neutral-100 min-h-max">
      <div className="md:w-1/2 flex flex-col gap-6 border-2 rounded-lg p-8 mx-auto bg-white my-4">
        <p className="text-xl tracking-wide font-semibold pb-2  w-full border-b-2">
          looking to hire?
        </p>

        <form
          id="workseeker"
          onSubmit={async (e) => {
            e.preventDefault();

            const res = await createPost(formData, "create-post-workgiver");

            if (res?.status) {
              return setFormData({
                work_type: "",
                work_profile: "",
                experience: "",
                city: "",
                media_url: "",
                tag: [],
                link_url: "",
                email: "",
                mobile: "",
                whatsapp: "",
                description: "",
              });
            }
          }}
          method="post"
          className="flex flex-col gap-6"
        >
          {/* work_type starts */}
          <div className="flex flex-col gap-2">
            <h1 className="text-lg ">what work type are you looking for?</h1>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {jobRoles?.map((job, index) => {
                return (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        value={job.jobName}
                        className="hidden basis-1/2 peer"
                        name="work_type"
                        onChange={updateFormData}
                        required
                      />
                      <div className="flex flex-col items-center basis-1/2 mx-auto peer-checked:font-bold w-full border-2 peer-checked:border-[#191919] rounded-md py-2">
                        <Image
                          src={job.jobImage}
                          width="50"
                          height="50"
                          alt={job.jobName}
                        />
                        <p>{job.jobName}</p>
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          {/* work_type ends */}
          {/* work_profile starts */}
          <div>
            <h1 className="text-lg mb-1">select work profiles</h1>
            <input
              type="text"
              list="work"
              name="work_profile"
              className="px-4 py-2 border-2 rounded-lg w-full"
              onClick={() => setFormData({ ...formData, work_profile: `` })}
              onChange={updateFormData}
              value={formData.work_profile}
              placeholder="enter work profile.."
              required
            />
            <datalist id="work">
              {Array.isArray(workProfile) &&
                workProfile?.map((work, index) => (
                  <option key={index}>{work.title}</option>
                ))}
            </datalist>
          </div>
          {/* work_profile ends */}
          {/* experience starts */}
          <div>
            <h1 className="roboto-reg text-lg mb-1">
              select minimum experience required
            </h1>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {experienceOptions.map((exp, index) => {
                return (
                  <div key={index}>
                    <label className="flex w-full jusitfy-center place-content-center">
                      <input
                        type="radio"
                        value={exp}
                        onChange={updateFormData}
                        className="opacity-0 p-2 peer"
                        name="experience"
                        required
                      />
                      <p className="peer-checked:font-semibold mx-auto w-full border-2 peer-checked:border-[#191919] p-2 text-center rounded-md">
                        {exp}
                      </p>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          {/* experience ends */}
          {/* location preference starts */}
          <div>
            <h1 className="text-lg mb-1">select work location</h1>

            <input
              type="text"
              list="loc"
              name="city"
              onChange={updateFormData}
              className="px-4 py-2 border-2 rounded-lg w-full"
              onClick={() => setFormData({ ...formData, city: "" })}
              value={formData.city}
              required
            />
            <datalist id="loc">
              <option>Remote only</option>
            </datalist>
          </div>
          {/* location preference ends */}
          {/* skills section starts */}
          <TagsComponent
            heading={"Enter relevant skills required"}
            tag={formData.tag}
            setTags={(tag) => setFormData({ ...formData, tag: [...tag] })}
            tagText={tagText}
            setTagText={setTagText}
          />
          {/* skills section ends */}
          {/* resume section starts */}
          <div className="flex flex-col gap-2">
            <h1 className="text-lg mb-1">upload job description (optional)</h1>
            <section className="md:w-1/3 ">
              <FileComponent
                accept={".pdf"}
                file={IconAdd}
                setFile={(awsUrl) =>
                  setFormData({ ...formData, media_url: `${awsUrl}` })
                }
              />
            </section>
          </div>
          {/* resume section ends */}
          {/* portfolio/linkedin url starts */}
          <div>
            <h1 className="text-lg mb-1">
              company&apos;s website link (optional)
            </h1>

            <input
              type="text"
              name="link_url"
              className="px-4 py-2 border-2 rounded-lg w-full"
              onChange={updateFormData}
              value={formData.link_url}
            />
          </div>
          {/* portfolio/linkedin url ends */}
          <div className="flex flex-col gap-2">
            <h1 className=" text-lg">add your contact details (optional)</h1>

            {/* email starts */}
            <h1 className="">email</h1>
            <input
              type="email"
              className="px-4 py-2 border-2 rounded-lg w-full"
              value={formData.email}
              name="email"
              label={"email"}
              onChange={updateFormData}
            />

            {/* email ends */}

            {/* phone number input starts */}
            <div className="flex flex-col gap-2">
              <h1 className="mb-1">mobile number </h1>

              <PhoneInput
                enableSearch={true}
                inputStyle={{
                  width: "100%",
                  border: "2px solid #e5e7eb",
                  borderRadius: "0.375rem",
                }}
                country={"in"}
                value={formData.mobile}
                name="mobile"
                onChange={updateFormData}
              />
            </div>
            {/* phone number input ends */}

            {/* whatsapp input starts */}
            <div className="flex flex-col gap-2">
              <h1 className="mb-1">whatsapp number</h1>

              <PhoneInput
                enableSearch={true}
                inputStyle={{ width: "100%" }}
                country={"in"}
                value={formData.whatsapp}
                name="whatsapp"
                onChange={updateFormData}
              />
            </div>
            {/* whatsapp input ends */}
          </div>

          {/* description starts */}
          <TextAreaComponent
            name="description"
            onChange={updateFormData}
            value={formData.description}
            label="write something about the job"
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
              send message
            </button>
          </div>
          {/* button ends */}
        </form>
      </div>
    </div>
  );
}
