import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ReusableModal from "@/components/common/modal/modal";
import { sdk } from "@/util/graphqlClient";
import useGlobalLoaderStore from "@/store/loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const templateOptions = [
  { value: "template1", label: "Template 1" },
  { value: "template2", label: "Template 2" },
  { value: "template3", label: "Template 3" },
];

const targetOptions = [
  { value: "both", label: "Both" },
  { value: "csv", label: "CSV" },
  { value: "employee", label: "Employee" },
  { value: "employer", label: "Employer" },
];

const EmailCampaign: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const { isLoading, setLoading } = useGlobalLoaderStore();
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
  const [scheduleTime, setScheduleTime] = useState<Date | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);

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

  const headings = [
    { title: "Campaign Name", dataKey: "campaignName" },
    { title: "Email Subject", dataKey: "emailSubject" },
    { title: "Status", dataKey: "status" },
    { title: "Target", dataKey: "target" },
  ];

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      let csvDataUrl = null;
      if (selectedTarget?.value === "csv" && csvFile) {
        const formData = new FormData();
        formData.append("file", csvFile);
        formData.append("upload_preset", "email-csv-data");
        formData.append("public_id", `csv_user_data_${Date.now()}`);

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/inradiuscloud/raw/upload",
          formData
        );

        csvDataUrl = response.data.secure_url;
      }

      const templateValue = selectedTemplate ? selectedTemplate.value : null;
      const targetValue = selectedTarget ? selectedTarget.value : null;

      await sdk.CreateEmailCampaign({
        input: {
          campaignName: data.name,
          emailSubject: data.subject,
          emailTemplate: templateValue ?? "",
          // target: targetValue as string,
          // scheduleType: selectedScheduleType as string,
          scheduleTime,
          csvDataUrl,
          customLink: data.customLink || null,
        },
        // filters: {
        //   location: data.location || null,
        //   industry: data.industry || null,
        //   minPay: data.minPay || null,
        //   maxPay: data.maxPay || null,
        //   employerEmailPending: data.employerEmailPending || null,
        // },
      });

      const { getAllEmailCampaigns } = await sdk.GetAllEmailCampaigns();
      setEmailCampaigns(getAllEmailCampaigns);
      setCreateEmailCampaignModalOpen(false);
    } catch (error) {
      console.error("Error creating email campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTargetChange = (value: any) => {
    setSelectedTarget(value);
    if (value.value === "csv") {
      setSelectedScheduleType(null);
      setScheduleTime(null);
    }
  };

  const handleScheduleTypeChange = (value: string) => {
    setSelectedScheduleType(value);
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
      <RoopTable
        data={emailCampaigns}
        itemsPerPage={5}
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
                  value={
                    selectedScheduleType
                      ? {
                          value: selectedScheduleType,
                          label:
                            selectedScheduleType === "now" ? "Now" : "Later",
                        }
                      : null
                  }
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
