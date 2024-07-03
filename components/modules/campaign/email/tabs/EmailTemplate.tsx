import React, { useState, useEffect } from "react";
import RoopTable from "@/components/common/customTableR/table";
import useGlobalStore from "@/store/global";
import { sdk } from "@/util/graphqlClient";
import Loading from "@/components/common/Loader/Loader"; // Import your loading component
import useGlobalLoaderStore from "@/store/loader";

const EmailTemplate: React.FC = () => {
  const { setEmailBuilderOpen } = useGlobalStore();
  const { isLoading, setLoading } = useGlobalLoaderStore(); // Use global loader store
  const [emailTemplates, setEmailTemplates] = useState<any[]>([]); // Adjust type as per your GraphQL schema

  useEffect(() => {
    fetchEmailTemplates();
  }, []);

  const fetchEmailTemplates = async () => {
    setLoading(true);
    try {
      const { getAllEmailTemplates } = await sdk.GetAllEmailTemplates();
      setEmailTemplates(getAllEmailTemplates);
    } catch (error) {
      console.error("Error fetching email templates:", error);
      // Handle error fetching data (e.g., show error message)
    } finally {
      setLoading(false);
    }
  };

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
