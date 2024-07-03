import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ReusableModal from "@/components/common/modal/modal";
import { sdk } from "@/util/graphqlClient";
import Loading from "@/components/common/Loader/Loader"; // Import your loading component
import useGlobalLoaderStore from "@/store/loader";
import DatePicker from "react-datepicker"; // Import date picker component
import "react-datepicker/dist/react-datepicker.css"; // Date picker styles

const templateOptions = [
  { value: "template1", label: "Template 1" },
  { value: "template2", label: "Template 2" },
  { value: "template3", label: "Template 3" },
];

const EmailCampaign: React.FC = () => {
  const { control, handleSubmit, setValue } = useForm();
  const { isLoading, setLoading } = useGlobalLoaderStore(); // Use global loader store
  const [emailCampaigns, setEmailCampaigns] = useState<any[]>([]);
  const [isCreateEmailCampaignModalOpen, setCreateEmailCampaignModalOpen] =
    useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedScheduleType, setSelectedScheduleType] = useState<
    string | null
  >(null);
  const [scheduleTime, setScheduleTime] = useState<Date | null>(null); // Updated state to store date/time
  const [csvFile, setCsvFile] = useState<File | null>(null); // State to store uploaded CSV file

  const targetOptions = [
    { value: "both", label: "Both" },
    { value: "csv", label: "CSV" },
    { value: "employee", label: "Employee" },
    { value: "employer", label: "Employer" },
  ];

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

  const handleCreateClick = () => {
    setCreateEmailCampaignModalOpen(true);
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
        handleDeleteCampaign(id); // Implement this function
      },
    },
    // Add more actions as needed
  ];

  const headings = [
    { title: "Campaign Name", dataKey: "campaignName" },
    { title: "Email Subject", dataKey: "emailSubject" },
    { title: "Status", dataKey: "status" },
    { title: "Target", dataKey: "target" },
  ];

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      // Ensure data.template and data.target are not undefined/null before accessing their values
      const templateValue = data.template ? data.template.value : null;
      const targetValue = data.target ? data.target.value : null;

      // Example: Call to create email campaign using sdk
      await sdk.CreateEmailCampaign({
        campaignName: data.name,
        emailSubject: data.subject,
        emailTemplate: templateValue,
        target: targetValue,
        scheduleType: selectedScheduleType,
        scheduleTime,
        csvDataUrl: data.csvDataUrl || null,
        customLink: data.customLink || null,
        csvFile, // Pass the uploaded CSV file to the SDK function
      });
      // Assuming successful creation, update state or refetch data
      const { getAllEmailCampaigns } = await sdk.GetAllEmailCampaigns();
      setEmailCampaigns(getAllEmailCampaigns);
      setCreateEmailCampaignModalOpen(false);
    } catch (error) {
      console.error("Error creating email campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCampaign = async (id: number) => {
    // Implement delete campaign logic using sdk or similar
    try {
      setLoading(true);
      // Example delete operation
      await sdk.DeleteEmailCampaign(id);
      // Assuming successful deletion, update state or refetch data
      const updatedCampaigns = emailCampaigns.filter(
        (campaign) => campaign.id !== id
      );
      setEmailCampaigns(updatedCampaigns);
    } catch (error) {
      console.error("Error deleting email campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTargetChange = (value: any) => {
    setSelectedTarget(value);
    // Reset schedule type and schedule time if target is CSV
    if (value.value === "csv") {
      setSelectedScheduleType(null);
      setScheduleTime(null);
    }
  };

  const handleScheduleTypeChange = (value: string) => {
    setSelectedScheduleType(value);
    // Reset schedule time if switching from later to now
    if (value === "now") {
      setScheduleTime(null);
    }
  };

  const handleCsvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setCsvFile(files[0]);
    }
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
                  onChange={(value) => handleTargetChange(value)}
                  className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
                  classNamePrefix="react-select"
                  placeholder="Select Target"
                />
              )}
            />
          </div>
          {selectedTarget?.value === "csv" && (
            <div>
              <label className="block text-black">Upload CSV File</label>
              <input
                type="file"
                onChange={handleCsvFileChange}
                accept=".csv"
                className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
              />
            </div>
          )}
          <div>
            <label className="block text-black">Schedule Type</label>
            <Controller
              name="scheduleType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: "now", label: "Now" },
                    { value: "later", label: "Later" },
                  ]}
                  value={selectedScheduleType}
                  onChange={(value) => handleScheduleTypeChange(value.value)}
                  className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
                  classNamePrefix="react-select"
                  placeholder="Select Schedule Type"
                />
              )}
            />
          </div>
          {selectedScheduleType === "later" && (
            <div>
              <label className="block text-black">Schedule Time</label>
              <Controller
                name="scheduleTime"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={scheduleTime}
                    onChange={(date: Date | null) => setScheduleTime(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="yyyy-MM-dd HH:mm"
                    className="input input-primary"
                  />
                )}
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <button className="btn btn-primary">Send</button>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default EmailCampaign;
