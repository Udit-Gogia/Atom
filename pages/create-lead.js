import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import { createLead } from "../components/postFunctions";
import { useEffect, useState } from "react";
import { FileComponent, TextAreaComponent } from "../components/inputs";
import { IconAdd } from "../assets/images";
import { getUserDataObject } from "../components/authFunctions";

export default function CreateLead() {
  const [created_by_id, setCreatedById] = useState(null);
  useEffect(() => {
    setCreatedById(getUserDataObject("userId"));
  }, []);

  const [formData, setFormData] = useState({
    type: "atomx",
    description: "",
    media_url: IconAdd,
    email: "",
    mobile: "",
    whatsapp: "",
    created_by_id,
  });

  return (
    <div className="w-full bg-neutral-100 min-h-max">
      <div className="md:w-1/2 flex flex-col gap-6 border-2 rounded-lg p-8 mx-auto bg-white my-4">
        <p className="text-xl tracking-wide font-semibold pb-2  w-full border-b-2">
          create lead
        </p>

        <form
          id="lead"
          onSubmit={async (e) => {
            e.preventDefault();

            const res = await createLead(formData, "create-lead");

            if (res?.status) {
              return setFormData({
                type: "atomx",
                description: "",
                media_url: "",
                email: "",
                mobile: "",
                whatsapp: "",
                created_by_id,
              });
            }
          }}
          method="post"
          className="flex flex-col gap-6"
        >
          {/* description starts */}
          <TextAreaComponent
            stateMng={(e) =>
              setFormData({ ...formData, description: `${e.target.value}` })
            }
            Name="about self"
            value={formData.description}
            label="add your requirement"
            placeholder="add details of your idea and what type of tech do you need"
          />
          {/* description ends */}

          {/* media_url starts */}
          <div className="flex flex-col gap-2">
            <h1 className="text-lg mb-1">upload prototype file (optional)</h1>
            <section className="md:w-1/3 ">
              <FileComponent
                file={formData.media_url || IconAdd}
                setFile={(awsUrl) =>
                  setFormData({ ...formData, media_url: awsUrl })
                }
              />
            </section>
          </div>
          {/* media_url  ends */}

          {/* contact details start */}
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
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
                onChange={(mobileNumber) =>
                  setFormData({ ...formData, mobile: `${mobileNumber}` })
                }
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
                onChange={(whatsappNumber) =>
                  setFormData({ ...formData, whatsapp: `${whatsappNumber}` })
                }
              />
            </div>
            {/* whatsapp input ends */}
          </div>
          {/* contact details end */}

          {/* button starts */}
          <div className="flex justify-around items-center gap-6">
            <button className="lg:text-lg sm:text-md tracking-wide basis-1/2  md:px-8 py-2 text-center border-2 border-[#191919] rounded-lg hover:bg-neutral-200 transition px-12 h-fit">
              cancel
            </button>
            <button
              type="submit"
              form="lead"
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
