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
    setCreateEmailCampaignModalOpen(false);
  };

  return (
    <div>
      {isLoading && <Loading />}
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
            <label className="block text-black">Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter name"
                  type="text"
                  maxLength={60}
                  className="input input-primary"
                />
              )}
            />
            <p className="text-gray-400 text-xs">
              *Name must be under 60 characters
            </p>
          </div>
          <div>
            <label className="block text-black">Email Subject</label>
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter subject"
                  type="text"
                  maxLength={60}
                  className="input input-primary"
                />
              )}
            />
            <p className="text-gray-400 text-xs">
              *Email Subject must be under 60 characters
            </p>
          </div>
          <div>
            <label className="block text-black">Email Template</label>
            <Controller
              name="template"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={templateOptions}
                  value={selectedTemplate}
                  onChange={(value) => setSelectedTemplate(value)}
                  className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
                  classNamePrefix="react-select"
                  placeholder="Select Template"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-black">Target</label>
            <Controller
              name="target"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={targetOptions}
                  value={selectedTarget}
                  onChange={(value) => setSelectedTarget(value)}
                  // classNames={{
                  //   placeholder: () => "!text-gray-400",
                  //   control: () =>
                  //     "!bg-input !border-none !text-sm !rounded-lg !w-full transition duration-150 ease-in-out !shadow-none",
                  //   menu: () => "z-[100] !bg-white text-black",
                  //   singleValue: () => "!text-black",
                  //   option: (state) =>
                  //     `!text-sm hover:!bg-primary hover:!text-white  focus:!bg-transparent ${
                  //       state.isFocused || state.isSelected
                  //         ? "!bg-transparent !text-black"
                  //         : ""
                  //     }`,
                  // }}
                  className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
                  classNamePrefix="react-select"
                  placeholder="Select Target"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-black">Schedule Type</label>
            <Controller
              name="scheduleType"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter schedule type"
                  type="text"
                  className="input input-primary"
                />
              )}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button className="btn btn-primary">Send</button>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default EmailCampaign;
