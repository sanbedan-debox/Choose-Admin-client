import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ReusableModal from "@/components/common/modal/modal";
import useCampaignStore from "@/store/campaign";
import { sdk } from "@/util/graphqlClient";

import Loading from "@/components/common/Loader/Loader"; // Import your loading component
import useGlobalLoaderStore from "@/store/loader";

const templateOptions = [
  { value: "template1", label: "Template 1" },
  { value: "template2", label: "Template 2" },
  { value: "template3", label: "Template 3" },
];

const EmailCampaign: React.FC = () => {
  const {
    isCreateEmailCampaignModalOpen,
    setCreateEmailCampaignModalOpen,
    selectedTargetValue,
  } = useCampaignStore();
  const { control, handleSubmit, setValue } = useForm();

  const [selectedTemplate, setSelectedTemplate] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [emailCampaigns, setEmailCampaigns] = useState<any[]>([]);
  const { isLoading, setLoading } = useGlobalLoaderStore(); // Use global loader store

  useEffect(() => {
    const fetchEmailCampaigns = async () => {
      setLoading(true);
      try {
        const { getAllEmailCampaigns } = await sdk.GetAllEmailCampaigns();
        setEmailCampaigns(getAllEmailCampaigns);
      } catch (error) {
        console.error("Error fetching email campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailCampaigns();
  }, []);

  useEffect(() => {
    setSelectedTarget(
      targetOptions.find((option) => option.value === selectedTargetValue) ||
        null
    );
  }, [selectedTargetValue]);

  const targetOptions = [
    { value: "adminUsers", label: "Admin Users" },
    { value: "restaurantUsers", label: "Restaurant Users" },
    { value: "waitlistUsers", label: "Launch Waitlist" },
  ];

  const headings = [
    { title: "Campaign Name", dataKey: "campaignName" },
    { title: "Email Subject", dataKey: "emailSubject" },
    { title: "Status", dataKey: "status" },
    { title: "Target", dataKey: "target" },
  ];

  const handleCreateClick = () => {
    setCreateEmailCampaignModalOpen(true);
    setValue("template", selectedTemplate);
    setValue("target", selectedTarget);
  };

  const mainActions = [
    {
      label: "Create",
      onClick: handleCreateClick,
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

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    setCreateEmailCampaignModalOpen(false);
  };

  return (
    <div>
      {isLoading && <Loading />} {/* Show loader when isLoading is true */}
      <RoopTable
        data={emailCampaigns}
        itemsPerPage={5}
        actions={actions}
        csvExport
        fullCsv
        csvFileName="email_campaigns_data.csv"
        headings={headings}
        mainActions={mainActions}
        hovered
      />
      <ReusableModal
        isOpen={isCreateEmailCampaignModalOpen}
        onClose={() => setCreateEmailCampaignModalOpen(false)}
        title="Create Campaign"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Form fields here */}
        </form>
      </ReusableModal>
    </div>
  );
};

export default EmailCampaign;
