import React from "react";
import RoopTable from "@/components/common/table2/table";

const LaunchWaitlist: React.FC = () => {
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

  const headings = [
    { title: "Name", dataKey: "name" },
    { title: "Email", dataKey: "email" },
    { title: "Function", dataKey: "function" },
    { title: "Status", dataKey: "status" },
    { title: "Employed", dataKey: "employed" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Launch Waitlist</h1>
      <p>Launch Waitlist!</p>
      <RoopTable
        data={members}
        itemsPerPage={5}
        csvExport
        headings={headings}
      />
    </div>
  );
};

export default LaunchWaitlist;
