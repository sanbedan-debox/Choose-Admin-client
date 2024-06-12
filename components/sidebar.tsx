import React from "react";
import { modules } from "@/config/accessConfig";
import { getUserRole } from "@/util/auth";

interface SidebarProps {
  setSelectedModule: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedModule }) => {
  const userRole = getUserRole();

  const hasAccess = (moduleRoles: string[]) => moduleRoles.includes(userRole);

  return (
    <div className="h-screen bg-gray-800 text-white w-64">
      <ul>
        {modules.map(
          (module) =>
            hasAccess(module.roles) ? (
              <React.Fragment key={module.name}>
                <li
                  className="p-4 hover:bg-gray-700 cursor-pointer"
                  onClick={() => setSelectedModule(module.name)}
                >
                  {module.name}
                  {module.subModules && (
                    <ul className="ml-4">
                      {module.subModules.map(
                        (subModule) =>
                          hasAccess(subModule.roles) ? (
                            <li
                              key={subModule.name}
                              className="p-2 hover:bg-gray-600 cursor-pointer"
                              onClick={() => setSelectedModule(subModule.name)}
                            >
                              {subModule.name}
                            </li>
                          ) : null // Do not render subModule if not accessible
                      )}
                    </ul>
                  )}
                </li>
              </React.Fragment>
            ) : null // Do not render module if not accessible
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
