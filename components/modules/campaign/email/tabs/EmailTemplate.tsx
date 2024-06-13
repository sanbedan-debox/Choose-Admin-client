import React from "react";
import RoopTable from "@/components/common/CustomTable/table";

const EmailTemplate: React.FC = () => {
  const members = [
    {
      id: 1,
      title: "John Doe",
      content: "johndoe@example.com",
      createdBy: "superAdmin",
      createdAt: "2021-10-18",
      UpdatedAt: "2021-10-18",
    },
  ];

  const mainActions = [
    {
      label: "Add Email Template",
      onClick: () => {
        alert("Main Action 1 clicked");
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
      label: "Preview",
      onClick: (id: number) => {
        alert(`Preview for member ID: ${id}`);
      },
    },
  ];

  const headings = [
    { title: "Title", dataKey: "title" },
    { title: "Content", dataKey: "content" },
    { title: "Created By", dataKey: "createdBy" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "UpdatedAt" },
  ];

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Email Template</h1>
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

export default EmailTemplate;
