import { IconAdd, IconLoader } from "../assets/images";
import { useRef } from "react";
import Image from "next/image";
import { handleFileInput } from "./fileFunctions";
import { checkPresence } from "./cards";
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export const InputComponent = ({
  label,
  Name,
  value,
  stateMng,
  type,
  placeholder = null,
  defaultValue = null,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={Name} className="font-semibold text-lg tracking-wide ">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={Name}
        value={value}
        onChange={stateMng}
        required
        defaultValue={checkPresence(defaultValue) ? defaultValue : null}
        className="border-2 rounded-md p-2  focus:outline-[#191919]"
      ></input>
    </div>
  );
};

export const DropdownList = ({ label, Name, stateMng, list, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={Name} className="font-semibold text-lg tracking-wide ">
        {label}
      </label>

      <select
        name={Name}
        onChange={stateMng}
        className="border-2 focus:border-primaryBlack p-2 rounded-md shift-arrow"
      >
        <option value={null}>{placeholder}</option>
        {list.map((countryName, index) => {
          return <option key={index}>{countryName.title}</option>;
        })}
      </select>
    </div>
  );
};

export const TextAreaComponent = ({
  label = null,
  Name,
  value,
  stateMng,
  placeholder = null,
  rows = 7,
}) => {
  return (
    <div className="flex flex-col">
      {checkPresence(label) && (
        <label htmlFor={Name} className="font-semibold my-2 text-lg">
          {label}
        </label>
      )}
      <textarea
        name={Name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        className="p-2 w-full rounded-lg border-2 resize-none focus:outline-primaryBlack"
        onChange={stateMng}
      />
    </div>
  );
};

export const FileComponent = ({ file, setFile, accept }) => {
  const inputRef = useRef(null);

  const initiateFileInput = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <section className="flex flex-col">
        <button
          type="button"
          onClick={() => initiateFileInput()}
          className="border-2 p-8 rounded-md hover:border-primaryBlack transition-all items-center"
        >
          <Image
            src={file}
            alt="add-file-icon"
            width={file === IconAdd ? "30" : "250"}
            height={file === IconAdd ? "30" : "200"}
            className="mx-auto"
            style={{ width: "auto" }}
          />
        </button>
        <button
          type="button"
          className={`mt-4 border-2 rounded-lg py-2 hover:underline`}
          onClick={() => setFile(IconAdd)}
        >
          remove{" "}
        </button>
      </section>
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        accept={accept}
        onChange={(e) => handleFileInput(e, setFile)}
        name="file-input"
      />
    </div>
  );
};

export const TextDisplay = ({ heading, content }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-lg tracking-wide">{heading}</p>
      {checkPresence(content) ? (
        <p className="text-md text-neutral-600">{content}</p>
      ) : (
        <p className="text-sm text-neutral-400">Unknown</p>
      )}
    </div>
  );
};

export const TagsComponent = ({
  heading = null,
  tag,
  tagText,
  setTagText,
  setTags,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {checkPresence(heading) && (
        <h1 className="roboto-reg text-lg">{heading}</h1>
      )}
      <div className="flex items-center flex-wrap">
        <input
          type="text"
          className="border-2 p-2 mr-2 rounded-md"
          required={tag.length === 0 ? true : false}
          onChange={(e) => setTagText(e.target.value != null && e.target.value)}
          value={tagText}
        />
        <button
          type="button"
          onClick={() => {
            tagText != null && tagText != "" && tag.push(tagText);
            setTagText("");
          }}
          className="bg-neutral-200 rounded-md p-2"
        >
          +
        </button>
        <ul className="flex flex-wrap">
          {tag.map((tagEle, index) => {
            return (
              <div
                className="flex max-w-fit bg-neutral-100 border-l-2 border-[#191919] mx-2 items-center py-2 gap-2 my-2"
                key={index}
              >
                <li className="px-4">{tagEle}</li>
                <button
                  type="button"
                  className="font-semibold bg-neutral-300 px-2 rounded-md"
                  onClick={() => {
                    setTags([
                      ...tag?.filter((ele) => tag.indexOf(ele) !== index),
                    ]);
                  }}
                >
                  x
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export const RadioComponent = ({ Name, stateMng, label, Value }) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          name={Name}
          value={Value}
          className="hidden basis-1/2 peer"
          onChange={stateMng}
          required
        />

        <p className="flex flex-col items-center basis-1/2 mx-auto peer-checked:font-bold w-full border-2 peer-checked:border-[#191919] rounded-md px-4 py-2">
          {label}
        </p>
      </label>
    </div>
  );
};
