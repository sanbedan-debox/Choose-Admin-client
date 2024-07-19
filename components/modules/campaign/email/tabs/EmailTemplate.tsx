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
import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";

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
  const [btnLoading, setBtnLoading] = useState(false);

  const handleDeleteConfirm = async () => {
    if (selectedTemplateId === "") {
      setToastData({
        type: "error",
        message: "Something went wrong, please try again later!",
      });
      return;
    }
    try {
      setBtnLoading(true);

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
    } finally {
      setBtnLoading(false);
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
        loading={isLoading}
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
          <CButton
            loading={btnLoading}
            variant={ButtonType.Primary}
            onClick={handleDeleteConfirm}
          >
            Yes
          </CButton>
        </div>
      </ReusableModal>
    </div>
  );
};

export default EmailTemplate;
