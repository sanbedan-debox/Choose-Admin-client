import React from "react";
import RoopTable from "@/components/common/customTableR/table";
import useGlobalLoaderStore from "@/store/loader";

const MssgTemplate: React.FC = () => {
  const members = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      role: "superAdmin",
      createdAt: "2021-10-18",
      UpdatedAt: "2021-10-18",
      access: {
        join: {
          hello: "java",
        },
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      role: "admin",
      createdAt: "2021-10-18",
      UpdatedAt: "2021-10-18",
      access: {
        join: {
          hello: "java",
        },
      },
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mikejohnson@example.com",
      role: "worker",
      createdAt: "2021-10-18",
      UpdatedAt: "2021-10-18",
      access: {
        join: {
          hello: "java",
        },
      },
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarahwilliams@example.com",
      role: "master",
      createdAt: "2021-10-18",
      UpdatedAt: "2021-10-18",
      access: {
        join: {
          hello: "java",
        },
      },
    },
    {
      id: 5,
      name: "David Brown",
      email: "davidbrown@example.com",
      role: "superAdmin",
      createdAt: "2021-10-18",
      UpdatedAt: "2021-10-18",
      access: {
        join: {
          hello: "java",
        },
      },
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emilydavis@example.com",
      role: "admin",
      createdAt: "2021-10-18",
      UpdatedAt: "2021-10-18",
      access: {
        join: {
          hello: "java",
        },
      },
    },
    {
      id: 7,
      name: "Robert Wilson",
      email: "robertwilson@example.com",
      role: "worker",
      createdAt: "2021-10-18",
      UpdatedAt: "2021-10-18",
      access: {
        join: {
          hello: "java",
        },
      },
    },
    {
      id: 8,
      name: "Olivia Taylor",
      email: "oliviataylor@example.com",
      role: "master",
      createdAt: "2021-10-18",
      UpdatedAt: "2021-10-18",
      access: {
        join: {
          hello: "java",
        },
      },
    },
    {
      id: 9,
      name: "Michael Anderson",
      email: "michaelanderson@example.com",
      role: "superAdmin",
      createdAt: "2021-10-18",
      UpdatedAt: "2021-10-18",
      access: {
        join: {
          hello: "java",
        },
      },
    },
    {
      id: 10,
      name: "Sophia Martinez",
      email: "sophiamartinez@example.com",
      role: "admin",
      createdAt: "2021-10-18",
      UpdatedAt: "2021-10-18",
      access: {
        join: {
          hello: "java",
        },
      },
    },
  ];

  const mainActions = [
    {
      label: "Action 1",
      onClick: () => {
        alert("Main Action 1 clicked");
      },
    },
    {
      label: "Action 2",
      onClick: () => {
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

  const headings = [
    { title: "Name", dataKey: "name" },
    { title: "Email", dataKey: "email" },
    { title: "Role", dataKey: "role" },
    { title: "Join", dataKey: "access.join.hello" },
  ];
  const { isLoading, setLoading } = useGlobalLoaderStore();

  return (
    <div>
      <RoopTable
        loading={isLoading}
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

export default MssgTemplate;
