import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import ReusableModal from "@/components/common/modal/modal";
import { sdk } from "@/util/graphqlClient";
import useGlobalLoaderStore from "@/store/loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  EmailCampaignScheduleTypes,
  EmailCampaignTargetTypes,
} from "@/generated/graphql";
import useGlobalStore from "@/store/global";
import moment from "moment";
import Link from "next/link";
import { getClickableUrlLink } from "@/util/utils";

const targetOptions = [
  { value: EmailCampaignTargetTypes.Waitlist, label: "Waitlist Users" },
  { value: EmailCampaignTargetTypes.Users, label: "Restaurant User" },
  { value: EmailCampaignTargetTypes.Admins, label: "Internal Users" },
  { value: EmailCampaignTargetTypes.Csv, label: "CSV" },
];

interface EmailCampaignInterface {
  _id: string;
  campaignName: string;
  emailSubject: string;
  emailTemplate: string;
  status: string;
  target: string;
  usersCount: number;
  scheduleType: string;
  scheduleTime: string;
  mailsSent: number;
  mailsDelivered: number;
  mailsOpened: number;
  mailsClicked: number;
  logUrl: string;
  csvDataUrl: string;
  createdByName: string;
  updatedByName: string;
}

const EmailCampaign: React.FC = () => {
  const { control, handleSubmit } = useForm<{
    dynamicLink: string;
    name: string;
    scheduleType: string;
    subject: string;
    target: string;
    template: string;
    scheduleTime: string;
  }>();
  const { setToastData } = useGlobalStore();
  const { isLoading, setLoading } = useGlobalLoaderStore();
  const [emailCampaigns, setEmailCampaigns] = useState<
    EmailCampaignInterface[]
  >([]);
  const [emailTemplates, setEmailTemplates] = useState<
    { label: string; value: string; content: string }[]
  >([]);
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
  const [usersCount, setUsersCount] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchEmailTemplates = async () => {
      setLoading(true);
      try {
        const { getAllEmailTemplates } = await sdk.GetAllEmailTemplates();
        setEmailTemplates(
          getAllEmailTemplates.map((el) => ({
            label: el.title.toString().trim(),
            value: el._id.toString(),
            content: el.content,
          }))
        );
      } catch (error) {
        console.error("Error fetching email templates:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchEmailCampaigns = async () => {
      setLoading(true);
      try {
        const { getAllEmailCampaigns } = await sdk.GetAllEmailCampaigns();
        setEmailCampaigns(
          getAllEmailCampaigns.map((el) => {
            const openedArr = el.stats?.mailsOpened ?? [];
            const clickedArr = el.stats?.mailsClicked ?? [];

            const openCount = new Set(openedArr.map((e) => e.email)).size;
            const clickedCount = new Set(clickedArr.map((e) => e.email)).size;

            return {
              _id: el._id,
              campaignName: el.campaignName,
              emailSubject: el.emailSubject,
              emailTemplate: el.emailTemplate?.title ?? "",
              target: el.target,
              usersCount: el.usersCount,
              scheduleType: el.scheduleType,
              scheduleTime: el.scheduleTime
                ? moment(el.scheduleTime).format("HH:mm DD/MM/YYYY")
                : "N/A",
              status: el.status,
              mailsSent: el.stats?.mailsSent ?? 0,
              mailsDelivered: el.stats?.mailsDelivered ?? 0,
              mailsClicked: clickedCount,
              mailsOpened: openCount,
              csvDataUrl: el.csvDataUrl ?? "N/A",
              logUrl: el.logUrl ?? "N/A",
              createdByName: el.createdBy?.name ?? "",
              updatedByName: el.updatedBy?.name ?? "",
              createdAt: el.createdAt,
              updatedAt: el.updatedAt,
            };
          })
        );
        await fetchEmailTemplates();
      } catch (error) {
        console.error("Error fetching email campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailCampaigns();
  }, [setLoading, counter]);

  useEffect(() => {
    const fetchCount = async () => {
      setLoading(true);
      try {
        const { getUsersForTarget } = await sdk.GetUsersForTarget({
          target: (selectedTarget?.value ?? "") as EmailCampaignTargetTypes,
        });
        setUsersCount(getUsersForTarget);
      } catch (error) {
        console.error("Error fetching users count:", error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedTarget) {
      fetchCount();
    }
  }, [selectedTarget, setLoading]);

  const handleCreateClick = () => {
    setCreateEmailCampaignModalOpen(true);
  };

  const mainActions = [
    {
      label: "Create",
      onClick: handleCreateClick,
    },
  ];

  const isValidUrl = (urlString: string): boolean => {
    try {
      return (
        urlString.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        ) !== null
      );
    } catch (e) {
      return false;
    }
  };

  const validations = (data: {
    dynamicLink: string;
    name: string;
    scheduleType: string;
    subject: string;
    target: string;
    template: string;
  }): boolean => {
    if (data.name === "" || data.name === undefined || data.name === null) {
      setLoading(false);
      setToastData({
        type: "error",
        message: "Please provide campaign name to continue",
      });
      return false;
    }

    if (
      data.subject === "" ||
      data.subject === undefined ||
      data.subject === null
    ) {
      setLoading(false);
      setToastData({
        type: "error",
        message: "Please provide email subject to continue",
      });
      return false;
    }

    if (selectedTemplate === null) {
      setLoading(false);
      setToastData({
        type: "error",
        message: "Please select an email template to continue",
      });
      return false;
    }

    if (selectedTemplate !== null) {
      const content =
        emailTemplates.find((el) => selectedTemplate.value === el.value)
          ?.content ?? "";
      if (content.includes("emailLink") && data.dynamicLink === "") {
        setLoading(false);
        setToastData({
          type: "error",
          message: "Please provide dynamic link for your email to continue",
        });
        return false;
      }
    }

    if (selectedTemplate !== null) {
      const content =
        emailTemplates.find((el) => selectedTemplate.value === el.value)
          ?.content ?? "";
      if (
        content.includes("{{emailLink}}") &&
        data.dynamicLink !== "" &&
        !isValidUrl(getClickableUrlLink(data.dynamicLink))
      ) {
        setLoading(false);
        setToastData({
          type: "error",
          message: "Please provide a valid link to continue",
        });
        return false;
      }
    }

    if (selectedTarget === null) {
      setLoading(false);
      setToastData({
        type: "error",
        message: "Please select a target to continue",
      });
      return false;
    }

    if (
      selectedTarget.value === EmailCampaignTargetTypes.Csv &&
      csvFile === null
    ) {
      setLoading(false);
      setToastData({
        type: "error",
        message: "Please select a CSV file to continue",
      });
      return false;
    }

    if (selectedScheduleType === null) {
      setLoading(false);
      setToastData({
        type: "error",
        message: "Please select campaign schedule to continue",
      });
      return false;
    }

    if (
      selectedScheduleType === EmailCampaignScheduleTypes.Later &&
      scheduleTime === null
    ) {
      setLoading(false);
      setToastData({
        type: "error",
        message: "Please select schedule date & time to continue",
      });
      return false;
    }

    if (usersCount <= 0) {
      setLoading(false);
      setToastData({
        type: "error",
        message: "Email campaign cannot be created with 0 users",
      });
      return false;
    }

    return true;
  };

  const onSubmit: SubmitHandler<{
    dynamicLink: string;
    name: string;
    scheduleType: string;
    subject: string;
    target: string;
    template: string;
  }> = async (data) => {
    try {
      const check = validations(data);
      if (check === false) {
        return;
      }

      setLoading(true);

      // If CSV then Save File
      let csvFileUrl: string | null = null;

      if (
        selectedTarget?.value === EmailCampaignTargetTypes.Csv &&
        csvFile !== null
      ) {
        const formData: FormData = new FormData();
        const fileName = `csv_user_data_${Math.round(Date.now() / 1000)}`;
        formData.append("file", csvFile);
        formData.append("upload_preset", "csv-data");
        formData.append("public_id", fileName);
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/choose-pos/raw/upload",
          { method: "POST", body: formData }
        ).then((r) => r.json());

        const cloudinaryUrl = response?.secure_url;
        csvFileUrl = cloudinaryUrl;
      }

      const response = await sdk.CreateEmailCampaign({
        input: {
          campaignName: data.name.toString().trim(),
          emailSubject: data.subject.toString().trim(),
          target: (selectedTarget?.value ?? "") as EmailCampaignTargetTypes,
          scheduleType: (selectedScheduleType ??
            "") as EmailCampaignScheduleTypes,
          csvDataUrl: csvFileUrl,
          emailTemplate: selectedTemplate?.value ?? "",
          scheduleTime: scheduleTime,
          customLink:
            data.dynamicLink === null
              ? null
              : getClickableUrlLink(data.dynamicLink),
        },
      });

      setLoading(false);

      if (response.createEmailCampaign === false) {
        setToastData({
          type: "error",
          message:
            "Something went wrong while creating the email campaign, please try again later!",
        });
        return;
      }

      setCounter((prev) => prev + 1);
      setToastData({
        type: "success",
        message: "Email campaign created successfully!",
      });
      setCreateEmailCampaignModalOpen(false);
    } catch (error: any) {
      setLoading(false);
      setToastData({
        type: "error",
        message:
          error?.toString() ?? "Something went wrong, please try again later!",
      });
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
    try {
      const file = event.target.files?.[0];

      if (file) {
        if (!file.name.endsWith(".csv")) {
          setToastData({
            type: "error",
            message: "Please select a CSV file only",
          });
          return;
        }

        const reader = new FileReader();

        reader.onload = () => {
          const csvContent = reader.result as string;
          // Validate header columns
          const lines = csvContent.split("\n");
          const headerColumns = lines[0].trim().split(",");

          if (
            headerColumns.length < 2 ||
            headerColumns[0].toLowerCase() !== "email" ||
            headerColumns[1].toLowerCase() !== "name"
          ) {
            setToastData({
              type: "error",
              message:
                "Invalid CSV, make sure the first header is 'Email' and second one is 'Name'.",
            });
            return;
          }
          setUsersCount(lines.length - 1);
          setCsvFile(file);
        };

        reader.readAsText(file);
      }
    } catch (error) {}
  };

  const headings = [
    { dataKey: "campaignName", title: "Campaign Name" },
    { dataKey: "emailSubject", title: "Email Subject" },
    { dataKey: "emailTemplate", title: "Template Name" },
    { dataKey: "status", title: "Status" },
    { dataKey: "target", title: "Target" },
    { dataKey: "usersCount", title: "Filtered Users Count" },
    { dataKey: "scheduleType", title: "Schedule Type" },
    { dataKey: "scheduleTime", title: "Scheduled At" },
    { dataKey: "mailsSent", title: "Mails Sent" },
    { dataKey: "mailsDelivered", title: "Mails Delivered" },
    { dataKey: "mailsOpened", title: "Mails Opened" },
    { dataKey: "mailsClicked", title: "Mails Clicked" },
    {
      dataKey: "logUrl",
      title: "Summary",
      render: (data: EmailCampaignInterface) => {
        if (data.logUrl !== "N/A") {
          return (
            <Link
              className="text-primary"
              href={getClickableUrlLink(data.logUrl)}
              target="_blank"
            >
              Open Link
            </Link>
          );
        }

        return <p>{data.logUrl}</p>;
      },
    },
    {
      dataKey: "csvDataUrl",
      title: "CSV Data Users",
      render: (data: EmailCampaignInterface) => {
        if (data.csvDataUrl !== "N/A") {
          return (
            <Link
              className="text-primary"
              href={getClickableUrlLink(data.csvDataUrl)}
              target="_blank"
            >
              Open Link
            </Link>
          );
        }

        return <p>{data.csvDataUrl}</p>;
      },
    },
    { dataKey: "createdByName", title: "Created By" },
    { dataKey: "updatedByName", title: "Updated By" },
  ];

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
          <div>
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
            <Controller
              name="template"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={emailTemplates}
                  value={selectedTemplate}
                  onChange={(value) => setSelectedTemplate(value)}
                  className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
                  classNamePrefix="react-select"
                  placeholder="Select Template"
                />
              )}
            />
          </div>
          {selectedTemplate !== null &&
          emailTemplates
            .find((el) => selectedTemplate.value === el.value)
            ?.content.includes("emailLink") ? (
            <div>
              <Controller
                name="dynamicLink"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter dynamic link"
                    type="text"
                    maxLength={60}
                    className="input input-primary"
                  />
                )}
              />
              <p className="text-gray-400 text-xs">
                *Enter dynamic link for email template
              </p>
            </div>
          ) : null}
          <div>
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
          {selectedTarget?.value === EmailCampaignTargetTypes.Csv && (
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
            <Controller
              name="scheduleType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: EmailCampaignScheduleTypes.Now, label: "Now" },
                    { value: EmailCampaignScheduleTypes.Later, label: "Later" },
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
                  onChange={(value) =>
                    handleScheduleTypeChange(value?.value ?? "")
                  }
                  className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
                  classNamePrefix="react-select"
                  placeholder="Select Schedule Type"
                />
              )}
            />
          </div>
          {selectedScheduleType === "later" && (
            <div>
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
                    className="input input-primary w-full"
                    wrapperClassName="w-full"
                  />
                )}
              />
              <p className="text-gray-400 text-xs">
                *Pick your desired time (YYYY-MM-DD HH:mm)
              </p>
            </div>
          )}

          <p className="text-black">Count: {usersCount}</p>

          <div className="flex justify-end space-x-2">
            <button
              className={`btn ${
                isLoading
                  ? "btn-primary !opacity-60 !cursor-not-allowed"
                  : "btn-primary"
              }`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default EmailCampaign;
