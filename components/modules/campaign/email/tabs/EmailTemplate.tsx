import React, { useState, useEffect } from "react";
import RoopTable from "@/components/common/customTableR/table";
import useGlobalStore from "@/store/global";
import { sdk } from "@/util/graphqlClient";

const EmailTemplate: React.FC = () => {
  const { setEmailBuilderOpen } = useGlobalStore();
  const [emailTemplates, setEmailTemplates] = useState<any[]>([]); // Adjust type as per your GraphQL schema

  useEffect(() => {
    const fetchEmailTemplates = async () => {
      try {
        const { getAllEmailTemplates } = await sdk.getAllEmailTemplates();
        setEmailTemplates(getAllEmailTemplates);
      } catch (error) {
        console.error("Error fetching email templates:", error);
        // Handle error fetching data (e.g., show error message)
      }
    };

    fetchEmailTemplates();
  }, []);

  const mainActions = [
    {
      label: "Add Email Template",
      onClick: () => setEmailBuilderOpen(true),
    },
  ];

  const actions = [
    {
      label: "Delete",
      onClick: (id: number) => {
        alert(`Delete template with ID: ${id}`);
      },
    },
    {
      label: "Preview",
      onClick: (id: number) => {
        alert(`Preview for template ID: ${id}`);
      },
    },
  ];

  const headings = [
    { title: "Title", dataKey: "title" },
    { title: "Content", dataKey: "content" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    // Add more headings as needed
  ];

  return (
    <div className="">
      <RoopTable
        data={emailTemplates}
        itemsPerPage={5}
        actions={actions}
        csvExport
        fullCsv
        csvFileName="email_templates_data.csv"
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
