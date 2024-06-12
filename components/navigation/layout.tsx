import React, { useState } from "react";
import Sidebar from "./sidebar";
import { modules } from "@/components/navigation/common/accessConfig";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [selectedModule, setSelectedModule] = useState<string>("Dashboard");

  const renderModule = () => {
    const selected = modules.find(
      (mod) =>
        mod.name === selectedModule ||
        (mod.subModules &&
          mod.subModules.find((subMod) => subMod.name === selectedModule))
    );
    if (selected) {
      if (selected.subModules) {
        const selectedSubModule = selected.subModules.find(
          (subMod) => subMod.name === selectedModule
        );
        if (selectedSubModule) {
          const Component = selectedSubModule.component;
          return <Component />;
        }
      } else {
        const Component = selected.component;
        return <Component />;
      }
    }
    return null;
  };

  return (
    <div className="flex">
      <Sidebar setSelectedModule={setSelectedModule} />
      <div className="flex-1 p-6 ">
        {children}
        {renderModule()}
      </div>
    </div>
  );
};

export default Layout;
