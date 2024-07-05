import React, { useState } from "react";
import { modules } from "@/components/navigation/common/accessConfig";
import logo1 from "../../assets/logo/logoWhite.png";
import Image from "next/image";
import useGlobalStore from "@/store/global";
import useAuthStore from "@/store/auth";
import { useRouter } from "next/router";

const Sidebar: React.FC = () => {
  const { setSelectedModule } = useGlobalStore();
  const { userRole, userName } = useAuthStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { isSidebarExpanded, setisSidebarExpanded } = useGlobalStore();

  const hasAccess = (moduleRoles: string[]) => moduleRoles.includes(userRole);

  const toggleDropdown = (moduleName: string) => {
    setOpenDropdown((prev) => (prev === moduleName ? null : moduleName));
  };

  const toggleSidebar = () => {
    setisSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div
      className={`max-h-none flex flex-col bg-white text-white transition-all duration-300 ${
        isSidebarExpanded ? "min-w-64 w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* User Info */}
        <div
          className={`flex items-center ${
            isSidebarExpanded ? "justify-between  py-4" : "justify-center py-6"
          }  w-full px-4`}
        >
          {isSidebarExpanded && (
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-lg font-semibold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="ml-2 text-black font-semibold line-clamp-1 text-ellipsis">
                  {userName}
                </span>
                <span className="ml-2 text-black text-sm line-clamp-1 text-ellipsis">
                  {userRole}
                </span>
              </div>
            </div>
          )}
          <button
            type="button"
            title={isSidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            onClick={toggleSidebar}
            className="text-black hover:text-gray-500 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isSidebarExpanded ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Divider */}
        <hr className="border-gray-600 my-2" />
        {/* Navigation List */}
        <ul className="mx-1">
          {modules.map(
            (module) =>
              hasAccess(module.roles) && (
                <React.Fragment key={module.name}>
                  {module.subModules ? (
                    <li className="cursor-pointer mb-1">
                      <div
                        className="flex justify-between items-center hover:bg-primary group rounded-lg"
                        onClick={() => toggleDropdown(module.name)}
                      >
                        <div className="flex items-center p-2 text-black group-hover:text-white">
                          <svg
                            className="w-5 h-5 transition duration-75 text-gray-700 group-hover:text-white "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 21"
                          >
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                          </svg>
                          {isSidebarExpanded && (
                            <span className="ms-3">{module.name}</span>
                          )}
                        </div>
                        {isSidebarExpanded && (
                          <svg
                            className={`w-5 h-5 text-black group-hover:text-white transition-transform duration-200 mr-2 ${
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
                        )}
                      </div>
                      <ul
                        className={` ${
                          openDropdown === module.name ? "block" : "hidden"
                        }
                          ${isSidebarExpanded ? "ml-4" : "ml-0"}

                        `}
                      >
                        {module.subModules.map(
                          (subModule) =>
                            hasAccess(subModule.roles) && (
                              <li className="mb-1" key={subModule.name}>
                                <a
                                  onClick={() =>
                                    setSelectedModule(subModule.name)
                                  }
                                  className="flex items-center p-2 rounded-lg text-black hover:bg-primary   hover:text-white group"
                                >
                                  <svg
                                    className="w-5 h-5 transition duration-75 text-gray-700 group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                  >
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                  </svg>
                                  {isSidebarExpanded && (
                                    <span className="ms-3">
                                      {subModule.name}
                                    </span>
                                  )}
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
                        className="flex items-center p-2 rounded-lg  text-black hover:text-white hover:bg-primary  group"
                      >
                        <svg
                          className="w-5 h-5 transition duration-75 text-gray-700 group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 21"
                        >
                          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        {isSidebarExpanded && (
                          <span className="ms-3">{module.name}</span>
                        )}
                      </a>
                    </li>
                  )}
                </React.Fragment>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
