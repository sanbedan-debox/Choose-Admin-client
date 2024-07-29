import React, { useState } from "react";
import { modules } from "@/components/navigation/common/accessConfig";

import useGlobalStore from "@/store/global";
import useAuthStore from "@/store/auth";

const Sidebar: React.FC = () => {
  const { setSelectedModule, selectedModule } = useGlobalStore();
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
                        className={`flex justify-between items-center ${
                          selectedModule === module.name
                            ? "bg-primary"
                            : "bg-white"
                        } hover:bg-primary group rounded-lg`}
                        onClick={() => toggleDropdown(module.name)}
                      >
                        <div className="flex items-center p-2 text-black group-hover:text-white">
                          <module.icon size={18} />
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
                                  className={`flex items-center p-2 rounded-lg ${
                                    selectedModule === subModule.name
                                      ? "bg-primary text-white"
                                      : "text-black"
                                  } hover:bg-primary hover:text-white group`}
                                >
                                  <subModule.icon size={18} />
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
                      <button
                        onClick={() => setSelectedModule(module.name)}
                        className={`flex items-center p-2 rounded-lg ${
                          selectedModule === module.name
                            ? "bg-primary text-white"
                            : "text-black"
                        } hover:text-white hover:bg-primary  group w-full`}
                      >
                        <module.icon size={18} />
                        {isSidebarExpanded && (
                          <span className="ms-3">{module.name}</span>
                        )}
                      </button>
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
