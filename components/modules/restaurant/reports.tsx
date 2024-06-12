import MembersList from "@/components/common/table2/table";
import HelloTable from "@/components/common/table2/table";
import React from "react";

const Reports: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Reports</h1>
      <p>Welcome to the reports section!</p>
      <MembersList />
    </div>
  );
};

export default Reports;
