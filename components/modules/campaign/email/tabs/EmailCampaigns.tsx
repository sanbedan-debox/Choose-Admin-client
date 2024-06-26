import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ReusableModal from "@/components/common/modal/modal";
import useCampaignStore from "@/store/campaign";
import { sdk } from "@/util/graphqlClient";

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

  // Initialize states with null or appropriate initial values
  const [selectedTemplate, setSelectedTemplate] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [emailCampaigns, setEmailCampaigns] = useState<any[]>([]);

  // Fetch email campaigns data on component mount
  useEffect(() => {
    const fetchEmailCampaigns = async () => {
      try {
        const { getAllEmailCampaigns } = await sdk.getAllEmailCampaigns();
        console.log(getAllEmailCampaigns);
        setEmailCampaigns(getAllEmailCampaigns);
      } catch (error) {
        console.error("Error fetching email campaigns:", error);
        // Handle error fetching data (e.g., show error message)
      }
    };

    fetchEmailCampaigns();
  }, []);

  // Update selectedTarget when selectedTargetValue changes
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
          <div>
            <label className="block text-white">Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter name"
                  type="text"
                  maxLength={60}
                  className="mt-1 border bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
                />
              )}
            />
            <p className="text-gray-400 text-xs">
              *Name must be under 60 characters
            </p>
          </div>
          <div>
            <label className="block text-white">Email Subject</label>
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter subject"
                  type="text"
                  maxLength={60}
                  className="mt-1 border bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
                />
              )}
            />
            <p className="text-gray-400 text-xs">
              *Email Subject must be under 60 characters
            </p>
          </div>
          <div>
            <label className="block text-white">Email Template</label>
            <Controller
              name="template"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={templateOptions}
                  value={selectedTemplate}
                  onChange={(value) => setSelectedTemplate(value)}
                  classNames={{
                    placeholder: () => "!text-gray-400",
                    control: () =>
                      "!bg-secondary !bg-opacity-30 !border-none !text-sm !rounded-lg !w-full transition duration-150 ease-in-out !shadow-none",
                    menu: () => "z-[100] !bg-[#142D5F]",
                    singleValue: () => "!text-white",
                    option: (state) =>
                      `!text-sm hover:!bg-white hover:!text-black focus:!bg-transparent ${
                        state.isFocused || state.isSelected
                          ? "!bg-transparent"
                          : ""
                      }`,
                  }}
                  classNamePrefix="react-select"
                  placeholder="Select Template"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-white">Target</label>
            <Controller
              name="target"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={targetOptions}
                  value={selectedTarget}
                  onChange={(value) => setSelectedTarget(value)}
                  classNames={{
                    placeholder: () => "!text-gray-400",
                    control: () =>
                      "!bg-secondary !bg-opacity-30 !border-none !text-sm !rounded-lg !w-full transition duration-150 ease-in-out !shadow-none",
                    menu: () => "z-[100] !bg-[#142D5F]",
                    singleValue: () => "!text-white",
                    option: (state) =>
                      `!text-sm hover:!bg-white hover:!text-black focus:!bg-transparent ${
                        state.isFocused || state.isSelected
                          ? "!bg-transparent"
                          : ""
                      }`,
                  }}
                  classNamePrefix="react-select"
                  placeholder="Select Target"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-white">Schedule Type</label>
            <Controller
              name="scheduleType"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter schedule type"
                  type="text"
                  className="mt-1 border bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
                />
              )}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded"
              onClick={() => setCreateEmailCampaignModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default EmailCampaign;
