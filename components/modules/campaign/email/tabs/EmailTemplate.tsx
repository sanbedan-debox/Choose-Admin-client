import React, { useState, useEffect } from "react";
import RoopTable from "@/components/common/customTableR/table";
import useGlobalStore from "@/store/global";
import { sdk } from "@/util/graphqlClient";
import Loading from "@/components/common/Loader/Loader"; // Import your loading component
import useGlobalLoaderStore from "@/store/loader";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { extractErrorMessage, formatDateString } from "@/util/utils";
import ReusableModal from "@/components/common/modal/modal";
import { GraphQLError } from "graphql";

const EmailTemplate: React.FC = () => {
  const { setEmailBuilderOpen, setEmailPreivewState, setToastData } =
    useGlobalStore();
  const { isLoading, setLoading } = useGlobalLoaderStore(); // Use global loader store
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState<
    {
      id: string;
      title: string;
      content: string;
      designJson: string;
      createdAt: string;
      updatedAt: string;
      createdBy: string;
    }[]
  >([]);
  const [counter, setCounter] = useState(0);

  const handleDeleteClick = (id: string) => {
    setShowDeleteConfirmModal(true);
    setSelectedTemplateId(id);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteConfirmModal(false);
    setSelectedTemplateId("");
  };

  const handleDeleteConfirm = async () => {
    if (selectedTemplateId === "") {
      setToastData({
        type: "error",
        message: "Something went wrong, please try again later!",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await sdk.DeleteEmailTemplate({
        id: selectedTemplateId,
      });
      setLoading(false);

      if (!response.deleteEmailTemplate) {
        setToastData({
          type: "error",
          message: "Something went wrong, please try again later!",
        });
        return;
      }

      setCounter((prev) => prev + 1);
      handleDeleteModalClose();
      setToastData({
        type: "success",
        message: "Email templated deleted successfully!",
      });
    } catch (error: any) {
      setLoading(false);
      const errorJson = JSON.parse(JSON.stringify(error));
      if (
        errorJson &&
        errorJson.response &&
        errorJson.response.errors &&
        errorJson.response.errors[0].message
      ) {
        setToastData({
          type: "error",
          message: errorJson.response.errors[0].message
            .toString()
            .replace("Error: ", ""),
        });
      } else {
        setToastData({
          type: "error",
          message: error.toString(),
        });
      }
    }
  };

  useEffect(() => {
    const fetchEmailTemplates = async () => {
      setLoading(true);
      try {
        const { getAllEmailTemplates } = await sdk.GetAllEmailTemplates();
        setEmailTemplates(
          getAllEmailTemplates.map((el) => ({
            id: el._id.toString(),
            content: el.content,
            createdAt: formatDateString(el.createdAt),
            updatedAt: formatDateString(el.updatedAt),
            title: el.title,
            designJson: el.designJson,
            createdBy: el.createdBy?.name ?? "",
          }))
        );
      } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        setToastData({
          type: "error",
          message: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmailTemplates();
  }, [setLoading, counter]);

  const mainActions = [
    {
      label: "Add Email Template",
      onClick: () => setEmailBuilderOpen(true),
    },
  ];

  const renderActions = (rowData: { id: string }) => (
    <div className="flex space-x-3 justify-center items-center">
      <FaTrash
        className="text-red-500 cursor-pointer"
        onClick={() => {
          handleDeleteClick(rowData.id);
        }}
      />
      <FaEye
        className="text-green-500 cursor-pointer"
        onClick={() => {
          const item = emailTemplates.find((el) => el.id === rowData.id);
          if (item) {
            setEmailPreivewState({
              title: item.title,
              closeHandler: () => {
                setEmailPreivewState({
                  open: false,
                  closeHandler: () => {},
                  design: "",
                  title: "",
                });
              },
              design: item.designJson,
              open: true,
            });
          }
        }}
      />
    </div>
  );

  const headings = [
    { title: "Title", dataKey: "title" },
    { title: "Content", dataKey: "content" },
    { title: "Created By", dataKey: "createdBy" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    { title: "Actions", dataKey: "id", render: renderActions },
  ];

  return (
    <div className="bg-white h-full">
      <RoopTable
        data={emailTemplates}
        itemsPerPage={5}
        csvExport
        fullCsv
        csvFileName="email_templates_data.csv"
        headings={headings}
        mainActions={mainActions}
        hovered
      />

      {/* Modals */}
      {/* Delete Confirmation Modal */}
      <ReusableModal
        isOpen={showDeleteConfirmModal}
        onClose={handleDeleteModalClose}
        title="Are you sure ?"
        comments="This action will delete the selected email template premanently and cannot be restored."
      >
        <div className="flex justify-end space-x-4">
          <button
            className={`btn ${
              isLoading
                ? "btn-primary !opacity-60 !cursor-not-allowed"
                : "btn-primary"
            }`}
            onClick={handleDeleteConfirm}
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
              "Yes"
            )}
          </button>
        </div>
      </ReusableModal>
    </div>
  );
};

export default EmailTemplate;
