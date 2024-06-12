// import React, { useState } from "react";
// import Dashboard from "./dashboard";
// import Admin from "./admin";
// import Reports from "./reports";
// import Campaigns from "./campaign";
// import Sidebar from "./sidebar";
// import Hello from "./Hello";

// interface LayoutProps {
//   children?: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const [selectedModule, setSelectedModule] = useState<string>("Dashboard");

//   const renderModule = () => {
//     switch (selectedModule) {
//       case "Dashboard":
//         return <Dashboard />;
//       case "Admin":
//         return <Admin />;
//       case "Reports":
//         return <Reports />;
//       case "Campaigns":
//         return <Campaigns />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar setSelectedModule={setSelectedModule} />
//       <div className="flex-1 p-6 bg-gray-100">
//         {children}
//         {renderModule()}
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React, { useState } from "react";
import Sidebar from "./sidebar";
import { modules } from "@/config/accessConfig";
import Dashboard from "./dashboard";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [selectedModule, setSelectedModule] = useState<string>("Dashboard");

  const renderModule = () => {
    const selected = modules.find((mod) => mod.name === selectedModule);
    if (selected) {
      const Component = selected.component;
      return <Component />;
    } else {
      // Default to Dashboard if module not found
      return <Dashboard />;
    }
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
