import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/util/graphqlClient";
import useGlobalLoaderStore from "@/store/loader";
import Loading from "@/components/common/Loader/Loader";
import ReusableModal from "@/components/common/modal/modal"; // Import your reusable modal
import CustomSwitch from "@/components/common/customSwitch/customSwitch";
import { PlatformStatus, UserStatus } from "@/generated/graphql";
import { Controller, useForm } from "react-hook-form";
import useGlobalStore from "@/store/global";
import { formatDateString } from "@/util/utils";

const Reports: React.FC = () => {
  const [restaurantUsers, setRestaurantUsers] = useState<any[]>([]);
  const { setLoading } = useGlobalLoaderStore();
  const { setToastData } = useGlobalStore();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [lastRectectedConfirmation, setLastRejectedConfirmation] =
    useState(false);
  const [reason, setreson] = useState<string>("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchRestaurantUsers = async () => {
      setLoading(true);
      try {
        const response = await sdk.GetAllRestaurantUsers();
        if (response && response.getAllRestaurantUsers) {
          const formattedUsers = response.getAllRestaurantUsers.map((user) => ({
            ...user,
            createdAt: formatDateString(user.createdAt),
            updatedAt: formatDateString(user.updatedAt),
          }));
          setRestaurantUsers(formattedUsers);
        }
      } catch (error) {
        console.error("Failed to fetch restaurant users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantUsers();
  }, [counter, setLoading]);

  const handleToggleSwitch = (rowData: { status: string; _id: string }) => {
    setShowConfirmationModal(true);
    setSelectedUserId(rowData._id);
  };

  const handleConfirmation = async () => {
    setShowConfirmationModal(false);
    try {
      const response = await sdk.changeUserStatus({ id: selectedUserId });
      if (response && response.changeUserStatus) {
        setCounter((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to change user status:", error);
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedUserId("");
  };

  const handleCloseApproveModal = () => {
    setShowApproveModal(false);
    setSelectedUserId("");
  };
  const handleCloseRejectConformation = () => {
    setLastRejectedConfirmation(false);
    setSelectedUserId("");
  };
  const handleApprovalConfirmation = async () => {
    setLoading(true);
    try {
      const response = await sdk.AdminUserDetailsVerification({
        id: selectedUserId,
      });
      if (response && response.adminUserDetailsVerification) {
        setToastData({
          message: "User status updated successfully !",
          type: "success",
        });
      }
      setShowApproveModal(false);
      setSelectedUserId("");
      setCounter((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to fetch restaurant users:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleRejectConfirmation = async () => {
    setLoading(true);
    try {
      const response = await sdk.AdminUserDetailsRejection({
        id: selectedUserId,
        content: reason,
      });
      if (response && response.adminUserDetailsRejection) {
        setToastData({
          message: "User status updated successfully !",
          type: "success",
        });
      }
      setLastRejectedConfirmation(false);
      setShowRejectModal(false);
      setSelectedUserId("");
      setCounter((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to fetch restaurant users:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCloseRejectConfirmation = () => {
    setShowRejectModal(false);
    setSelectedUserId("");
  };
  const handleApproveVerification = (_id: string) => {
    setShowApproveModal(true);
    setSelectedUserId(_id);
  };
  const handleRejectVerification = (_id: string) => {
    setShowRejectModal(true);
    setSelectedUserId(_id);
  };

  const renderSwitch = (rowData: { status: PlatformStatus; _id: string }) => (
    <div>
      <CustomSwitch
        checked={rowData.status !== PlatformStatus.Blocked}
        onChange={() => handleToggleSwitch(rowData)}
        label={`Toggle switch for ${rowData._id}`}
      />
    </div>
  );

  const renderVerification = (rowData: { _id: string; status: string }) => (
    <div className="flex flex-col space-y-1">
      {UserStatus.InternalVerificationPending === rowData.status ? (
        <>
          <p
            onClick={() => handleApproveVerification(rowData._id)}
            className="text-sm font-semibold text-primary cursor-pointer hover:scale-110"
          >
            Approve
          </p>
          <p
            onClick={() => handleRejectVerification(rowData._id)}
            className="text-sm font-semibold text-primary cursor-pointer hover:scale-110"
          >
            Reject
          </p>
        </>
      ) : (
        "N/A"
      )}
    </div>
  );

  const handleRejectUser = (data: RejectUserInput) => {
    setLastRejectedConfirmation(true);
    setreson(data.reason);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${padTwoDigits(date.getMonth() + 1)}/${padTwoDigits(
      date.getDate()
    )}/${date.getFullYear()} ${padTwoDigits(date.getHours())}:${padTwoDigits(
      date.getMinutes()
    )}`;
    return formattedDate;
  };

  const padTwoDigits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const headings = [
    { title: "Toggle Status", dataKey: "status", render: renderSwitch },
    { title: "Verification", dataKey: "status", render: renderVerification },
    { title: "Status", dataKey: "status" },
    { title: "First Name", dataKey: "firstName" },
    { title: "Last Name", dataKey: "lastName" },
    { title: "Email", dataKey: "email" },
    { title: "Phone", dataKey: "phone" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    { title: "Business Name", dataKey: "businessName" },
    { title: "Business Type", dataKey: "businessType" },
    { title: "EIN", dataKey: "ein" },
    { title: "SSN", dataKey: "ssn" },
    { title: "address", dataKey: "address.addressLine1.value" },
  ];

  interface RejectUserInput {
    reason: string;
  }

  const {
    handleSubmit: handleReason,
    formState: { errors: errorsPass },
    setValue: setValuePass,
    control: controlPass,
  } = useForm<RejectUserInput>();

  return (
    <div className="container mx-auto px-2">
      {/* {isLoading && <Loading />} */}
      <RoopTable
        data={restaurantUsers}
        itemsPerPage={10}
        headings={headings}
        hovered
        csvExport
        filterable
      />

      <ReusableModal
        isOpen={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        title="Are you sure ?"
        comments="are you sure you want to block the user."
      >
        <div className="flex justify-end space-x-4">
          <button className="btn btn-primary" onClick={handleConfirmation}>
            Yes
          </button>
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={showApproveModal}
        onClose={handleCloseApproveModal}
        title="Are you sure ?"
        comments="Are you sure you want to approve the selected user?"
      >
        <div className="flex justify-end space-x-4">
          <button
            className="btn btn-primary"
            onClick={handleApprovalConfirmation}
          >
            Yes
          </button>
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={lastRectectedConfirmation}
        onClose={handleCloseRejectConformation}
        title="Are you sure ?"
        comments="are you sure you want to Reject the user."
      >
        <div className="flex justify-end space-x-4">
          <button
            className="btn btn-primary"
            onClick={handleRejectConfirmation}
          >
            Yes
          </button>
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={showRejectModal}
        onClose={handleCloseRejectConfirmation}
        title="Reject User "
        comments="Please Provide the details to reject the User Details"
      >
        <form onSubmit={handleReason(handleRejectUser)}>
          <div className="mb-4">
            <Controller
              name="reason"
              control={controlPass}
              rules={{
                required: "Reason is required",
                minLength: {
                  value: 30,
                  message: "Reason must be at least 30 characters",
                },
                maxLength: {
                  value: 120,
                  message: "Reason cannot exceed 120 characters",
                },
              }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="input input-primary"
                  placeholder="Business description"
                />
              )}
            />
            {errorsPass.reason && (
              <p className="text-red-500 text-sm">
                {errorsPass.reason.message}
              </p>
            )}
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="btn btn-primary"
              onClick={handleReason(handleRejectUser)}
            >
              Reject User
            </button>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default Reports;
