import React, { useState } from "react";
import { modules } from "@/components/navigation/common/accessConfig";
import { getUserRole } from "@/util/auth"; // Import getUserName and logout functions
import logo1 from "../../assets/logo/logoWhite.png";
import Link from "next/link";
import Image from "next/image";
import useGlobalStore from "@/store/global";
import RoundedButton from "../common/Buttons/RoundedButton";

const Sidebar: React.FC = () => {
  const { setSelectedModule } = useGlobalStore();
  const userRole = getUserRole();
  // const userName = getUserName(); // Get the username

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const hasAccess = (moduleRoles: string[]) => moduleRoles.includes(userRole);

  const toggleDropdown = (moduleName: string) => {
    setOpenDropdown((prev) => (prev === moduleName ? null : moduleName));
  };

  const handleLogout = () => {
    // logout();
    // Redirect to login page or perform other actions after logout
  };

  return (
    <div
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
      className="h-screen flex flex-col justify-between text-white w-64"
    >
      <div>
        <div className="flex flex-col items-center mt-4">
          <Image
            className="mb-4 cursor-pointer"
            src={logo1}
            alt="Logo"
            width={150}
            onClick={() => setSelectedModule("Dashboard")}
          />
        </div>
        <ul className="mx-1">
          {modules.map(
            (module) =>
              hasAccess(module.roles) && (
                <React.Fragment key={module.name}>
                  {module.subModules ? (
                    <li className="cursor-pointer mb-1">
                      <div
                        className="flex justify-between items-center hover:bg-gray-700 rounded-lg"
                        onClick={() => toggleDropdown(module.name)}
                      >
                        <div className="flex items-center p-2 text-white group">
                          <svg
                            className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 21"
                          >
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                          </svg>
                          <span className="ms-3">{module.name}</span>
                        </div>
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 mr-2 ${
                            openDropdown === module.name ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      <ul
                        className={`ml-4 ${
                          openDropdown === module.name ? "block" : "hidden"
                        }`}
                      >
                        {module.subModules.map(
                          (subModule) =>
                            hasAccess(subModule.roles) && (
                              <li
                                className="mb-1"
                                key={subModule.name}
                                // className="cursor-pointer"
                              >
                                <a
                                  onClick={() =>
                                    setSelectedModule(subModule.name)
                                  }
                                  className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
                                >
                                  <svg
                                    className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                  >
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                  </svg>
                                  <span className="ms-3">{subModule.name}</span>
                                </a>
                              </li>
                            )
                        )}
                      </ul>
                    </li>
                  ) : (
                    <li className="cursor-pointer mb-1" key={module.name}>
                      <a
                        onClick={() => setSelectedModule(module.name)}
                        className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
                      >
                        <svg
                          className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 21"
                        >
                          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span className="ms-3">{module.name}</span>
                      </a>
                    </li>
                  )}
                </React.Fragment>
              )
          )}
        </ul>
      </div>
      <div className="mx-1 my-4">
        <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
          {/* <span>{userName}</span> */}
          <span>Sanbedan Paul</span>
          <RoundedButton onClick={handleLogout}>Logout</RoundedButton>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
