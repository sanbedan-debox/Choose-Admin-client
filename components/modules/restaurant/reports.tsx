import React from "react";
import RoopTable from "@/components/common/table2/table";

const Reports: React.FC = () => {
  const members = [
    {
      id: 1,
      name: "John Michael",
      email: "john@creative-tim.com",
      function: "Manager",
      status: "ONLINE",
      employed: "23/04/18",
    },
    {
      id: 2,
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      function: "Programator",
      status: "OFFLINE",
      employed: "23/04/18",
    },
    {
      id: 3,
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      function: "Executive",
      status: "OFFLINE",
      employed: "19/09/17",
    },
    {
      id: 4,
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      function: "Programator",
      status: "ONLINE",
      employed: "24/12/08",
    },
    {
      id: 5,
      name: "Richard Gran",
      email: "richard@creative-tim.com",
      function: "Manager",
      status: "OFFLINE",
      employed: "04/10/21",
    },
  ];

  const actions = [
    {
      label: "Delete",
      onClick: (id: number) => {
        alert(`Delete member with ID: ${id}`);
      },
      style: "bg-red-500",
    },
    {
      label: "Access Roles",
      onClick: (id: number) => {
        alert(`Access roles for member ID: ${id}`);
      },
      style: "bg-blue-500",
    },
  ];

  const headings = [
    { title: "Name", dataKey: "name" },
    { title: "Email", dataKey: "email" },
    { title: "Function", dataKey: "function" },
    { title: "Status", dataKey: "status" },
    { title: "Employed", dataKey: "employed" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Reports</h1>
      <p>Welcome to the reports section!</p>
      <RoopTable
        data={members}
        itemsPerPage={5}
        actions={actions}
        csvExport
        headings={headings}
      />
    </div>
  );
};

export default Reports;
