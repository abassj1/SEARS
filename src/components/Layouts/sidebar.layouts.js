import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faImages,
  // faInfoCircle,
  faQuestionCircle,
  faHouse,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // eslint-disable-next-line
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(null);
  // const [attention, setAttention] = useState(true);
  const menus = [
    { title: "Home", link: "/", icon: "faHouse" },
    // { title: "Chat", link: "/chatgpt", icon: "faMessage" },
    // { title: "Dall·E", link: "/dall-e", icon: "faImages" },
    { title: "FAQs", link: "/question", icon: "faQuestionCircle" },
    // { title: "Demo", link: "/demo", icon: "faVideo" },
  ];

  const handleIcon = (icon) => {
    switch (icon) {
      case "faMessage":
        return faMessage;
      case "faImages":
        return faImages;
      case "faQuestionCircle":
        return faQuestionCircle;
      case "faHouse":
        return faHouse;
      case "faVideo":
        return faVideo;
      default:
        return "";
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    // setIsMobile(mediaQuery.matches);
    setOpen(!mediaQuery.matches);

    const handleMediaQueryChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <div
      className={`${
        open ? "w-44 md:w-72" : "w-12 md:w-16"
      } border-r-2 border-[#1c1c1c] h-screen sticky top-0`}
    >
      <div className={`flex items-center`}>
        <div
          className={`text-white origin-left font-medium text-2xl duration-200 ml-1.5 mt-8 md:mt-7 ${
            !open && "scale-0"
          }`}
        >
          <h1 style={{ font: "charter" }}>SEARS</h1>
        </div>
      </div>
      <ul className="pt-6">
        {menus.map((menu, index) => (
          <NavLink
            to={menu.link}
            style={({ isActive }) => ({
              color: isActive ? "white" : "#696969",
            })}
            key={index}
          >
            <li
              className={`flex rounded-md py-3 md:py-4 px-2 cursor-pointer md:hover:bg-gray-500/10
              text-sm items-center gap-x-4`}
            >
              <FontAwesomeIcon
                icon={handleIcon(menu.icon)}
                className={`text-base ml-1.5 md:text-lg md:ml-2.5`}
              />
              <span
                className={`${
                  !open && "scale-0"
                } origin-left duration-200 md:text-lg`}
              >
                {menu.title}
              </span>
            </li>
          </NavLink>
        ))}
      </ul>
      <div
        className="px-3.5 md:px-5 mb-8 md:mb-5 rounded-lg md:bottom-0 bottom-10 absolute text-gray-600"
        role="alert"
      >
      </div>
    </div>
  );
};

export { Sidebar };
