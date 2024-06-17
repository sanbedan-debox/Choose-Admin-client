import React from "react";
import RoopTable from "@/components/common/CustomTable/table";
import Heading from "@/components/common/Headings/Heading";

const Reports: React.FC = () => {
  const members = [
    {
      id: 1,
      name: "John Michael",
      email: "john@creative-tim.com",
      function: "Manager",
      status: "ONLINE",
      employed: "23/04/18",
      data: "nil",
      hello: "nil",
      zuzu: "nil",
      calm: "nil",
      alien: "alien",
    },
    // Rest of the member data...
  ];

  const actions = [
    {
      label: "Delete",
      onClick: (id: number) => {
        alert(`Delete member with ID: ${id}`);
      },
      // style: "bg-red-500",
    },
    {
      label: "Access Email",
      onClick: (id: number) => {
        alert(`Access roles for member ID: ${id}`);
      },
      // style: "bg-blue-500",
    },
  ];

  const mainActions = [
    {
      label: "Add Restaurant",
      onClick: () => {
        alert("Main Action 1 clicked");
      },
    },
  ];

  const headings = [
    { title: "Name", dataKey: "name" },
    { title: "Email", dataKey: "email" },
    { title: "Function", dataKey: "function" },
    { title: "Status", dataKey: "status" },
    { title: "Employed", dataKey: "employed" },
    { title: "Employed", dataKey: "employed" },
    { title: "Employed", dataKey: "employed" },
    { title: "Employed", dataKey: "employed" },
    { title: "Employed", dataKey: "employed" },
    { title: "Employed", dataKey: "employed" },
    { title: "Employed", dataKey: "employed" },
  ];

  return (
    <div className="container mx-auto px-2">
      <Heading highlight="Restaurant Management" />
      <RoopTable
        data={members}
        itemsPerPage={5}
        actions={actions}
        csvExport
        mainActions={mainActions}
        headings={headings}
        hovered
        hscroll
      />
    </div>
  );
};

export default Reports;
