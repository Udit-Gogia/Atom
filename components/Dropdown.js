import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IconMenu } from "../assets/images";
import Image from "next/image";
import Link from "next/link";

export default function DropDown({
  id = null,
  token = null,
  username = null,
  profile = null,
  createdById = null,
  bookmarkId = null,
  PostId = null,
}) {
  const links = [
    { href: "/account-settings", label: "bookmark post" },
    { href: "/support", label: "rate user" },
    { href: "/license", label: "block user" },
    { href: "/sign-out", label: "repost post" },
    { href: "/sign-out", label: "repost user" },
  ];
  return (
    <div className="relative inline-block text-left">
      <Menu>
        <Menu.Button style={{ width: "20px" }}>
          <Image
            src={IconMenu}
            width={"20"}
            alt="icon-menu"
            style={{ width: "auto" }}
          />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
            <div className="p-1">
              {links.map((item, idx) => (
                <Menu.Item disabled={item.disabled} key={idx}>
                  {({ active }) => (
                    <button
                      className={`${
                        active && "bg-neutral-100 underline"
                      } w-full rounded-md p-2 m-1`}
                      href="/account-settings"
                    >
                      {item.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
