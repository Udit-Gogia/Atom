import { SidebarCard } from "./cards";
import { IconFeed } from "../assets/images";
import { useState } from "react";
import { IconEdit, IconChat } from "../assets/images";
const Sidebar = ({ selectedOption = 0 }) => {
  const sidebarContent = [
    {
      src: IconFeed,
      alt: "icon-feed.png",
      display: "Home",
      href: "/",
    },
    {
      src: IconFeed,
      alt: "icon-feed.png",
      display: "Hub",
      href: "/tags",
    },
    {
      src: IconEdit,
      alt: "icon-edit.png",
      display: "Create",
      href: "/create",
    },
    {
      src: IconChat,
      alt: "icon-chat.png",
      display: "Messages",
      href: "/my",
    },
    {
      src: IconFeed,
      alt: "icon-feed.png",
      display: "Profile",
      href: "/my",
    },
  ];
  const [activeOption, setActiveOption] = useState(selectedOption);
  return (
    <div className="flex flex-col gap-2 md:ml-12 py-8 md:mx-8 px-4 min-w-fit">
      {sidebarContent.map((option, index) => {
        option;
        return (
          <SidebarCard
            sidebarSection={option}
            key={index}
            index={index}
            isActiveIndex={activeOption}
            setActiveOption={setActiveOption}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
