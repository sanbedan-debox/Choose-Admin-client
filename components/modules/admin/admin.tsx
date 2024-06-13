import RoopTable from "@/components/common/table2/table";
import React from "react";

const Admin: React.FC = () => {
  const members = [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      role: "superAdmin",
      createdAt: "1634567890",
      UpdatedAt: "1634567890",
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      role: "admin",
      createdAt: "1634567890",
      UpdatedAt: "1634567890",
    },
    {
      name: "Mike Johnson",
      email: "mikejohnson@example.com",
      role: "worker",
      createdAt: "1634567890",
      UpdatedAt: "1634567890",
    },
    {
      name: "Sarah Williams",
      email: "sarahwilliams@example.com",
      role: "master",
      createdAt: "1634567890",
      UpdatedAt: "1634567890",
    },
    {
      name: "David Brown",
      email: "davidbrown@example.com",
      role: "superAdmin",
      createdAt: "1634567890",
      UpdatedAt: "1634567890",
    },
    {
      name: "Emily Davis",
      email: "emilydavis@example.com",
      role: "admin",
      createdAt: "1634567890",
      UpdatedAt: "1634567890",
    },
    {
      name: "Robert Wilson",
      email: "robertwilson@example.com",
      role: "worker",
      createdAt: "1634567890",
      UpdatedAt: "1634567890",
    },
    {
      name: "Olivia Taylor",
      email: "oliviataylor@example.com",
      role: "master",
      createdAt: "1634567890",
      UpdatedAt: "1634567890",
    },
    {
      name: "Michael Anderson",
      email: "michaelanderson@example.com",
      role: "superAdmin",
      createdAt: "1634567890",
      UpdatedAt: "1634567890",
    },
    {
      name: "Sophia Martinez",
      email: "sophiamartinez@example.com",
      role: "admin",
      createdAt: "1634567890",
      UpdatedAt: "1634567890",
    },
  ];
  const mainActions = [
    {
      label: "Action 1",
      onClick: () => {
        // Define the action functionality
        alert("Main Action 1 clicked");
      },
    },
    {
      label: "Action 2",
      onClick: () => {
        // Define the action functionality
        alert("Main Action 2 clicked");
      },
    },
  ];
  const actions = [
    {
      label: "Delete",
      onClick: (id: number) => {
        alert(`Delete member with ID: ${id}`);
      },
    },
    {
      label: "Reset Password",
      onClick: (id: number) => {
        alert(`Reset password for member ID: ${id}`);
      },
    },
  ];
  // const mainActions = [
  //   {
  //     label: "Add Member",
  //     onClick: () => {
  //       alert("Add new member action");
  //     },
  //   },
  // ];

  const headings = [
    { title: "Name", dataKey: "name" },
    { title: "Email", dataKey: "email" },
    { title: "Role", dataKey: "role" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p>Welcome to the admin panel!</p>
      <RoopTable
        data={members}
        itemsPerPage={5}
        actions={actions}
        csvExport
        fullCsv
        csvFileName="admins_data.csv"
        headings={headings}
        mainActions={mainActions}
        // striped
        // bordered
        hovered
      />
    </div>
  );
};

export default Admin;
