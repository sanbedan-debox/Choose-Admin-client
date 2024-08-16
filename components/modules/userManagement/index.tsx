import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";
import CustomSwitch from "@/components/common/customSwitch/customSwitch";
import RoopTable from "@/components/common/customTableR/table";
import ReusableModal from "@/components/common/modal/modal"; // Import your reusable modal
import {
  BusinessTypeEnum,
  EstimatedRevenueEnum,
  StaffCountEnum,
  UserStatus,
} from "@/generated/graphql";
import useGlobalStore from "@/store/global";
import useGlobalLoaderStore from "@/store/loader";
import { sdk } from "@/util/graphqlClient";
import { extractErrorMessage, formatDateString } from "@/util/utils";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Reports: React.FC = () => {
  const [restaurantUsers, setRestaurantUsers] = useState<any[]>([]);
  const { setLoading, isLoading } = useGlobalLoaderStore();
  const { setToastData } = useGlobalStore();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<boolean>(false);
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

    fetchRestaurantUsers();
  }, [counter, setLoading]);

  const handleToggleSwitch = (rowData: { status: string; _id: string }) => {
    setShowConfirmationModal(true);
    setSelectedUserId(rowData._id);
    setSelectedStatus(rowData.status === UserStatus.Active ? true : false);
  };
  const [btnLoading, setBtnLoading] = useState(false);

  const handleConfirmation = async () => {
    setShowConfirmationModal(false);
    try {
      const response = await sdk.changeUserStatus({
        input: {
          block: selectedStatus,
          id: selectedUserId,
        },
      });
      if (response && response.changeUserStatus) {
        setCounter((prev) => prev + 1);
      }
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setBtnLoading(false);
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
    try {
      setLoading(true);
      setBtnLoading(true);
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
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
      setBtnLoading(false);
    }
  };
  const handleRejectConfirmation = async () => {
    try {
      setBtnLoading(true);
      setLoading(true);
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
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setBtnLoading(false);
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

  const renderSwitch = (rowData: { status: UserStatus; _id: string }) => (
    <div>
      <CustomSwitch
        checked={rowData.status !== UserStatus.Blocked}
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

  const formatEstimatedRevinue = (role: string): string => {
    console.log(role);
    switch (role) {
      case EstimatedRevenueEnum.Above1M:
        return "Above 1M";
      case EstimatedRevenueEnum.From0to50K:
        return "$0 to $50K";
      case EstimatedRevenueEnum.From200Kto500K:
        return "$200K to $500K";
      case EstimatedRevenueEnum.From500Kto1M:
        return "$500K to $1M";
      case EstimatedRevenueEnum.From50Kto200K:
        return "$50K to $200K";

      default:
        return "";
    }
  };
  const formatStaffCountEnum = (value: StaffCountEnum) => {
    switch (value) {
      case StaffCountEnum.From0To10:
        return "0 to 10";
      case StaffCountEnum.From11to25:
        return "11 to 25";
      case StaffCountEnum.From26to40:
        return "26 to 40";
      case StaffCountEnum.Above40:
        return "Above 41";
      default:
        return "";
    }
  };

  const formatBusinessTypeEnum = (value: BusinessTypeEnum) => {
    switch (value) {
      case BusinessTypeEnum.Lp:
        return "LP";
      case BusinessTypeEnum.Llp:
        return "LLP";
      case BusinessTypeEnum.Llc:
        return "LLC";
      case BusinessTypeEnum.Corporation:
        return "Corporation";
      case BusinessTypeEnum.SoleProprietor:
        return "Sole Proprietor";
      default:
        return "";
    }
  };
  const headings = [
    { title: "Toggle Status", dataKey: "status", render: renderSwitch },
    { title: "Verification", dataKey: "status", render: renderVerification },
    { title: "Status", dataKey: "status" },
    { title: "First Name", dataKey: "firstName" },
    { title: "Last Name", dataKey: "lastName" },
    { title: "Email", dataKey: "email" },
    { title: "Phone", dataKey: "phone" },
    {
      title: "Business Name",
      dataKey: "businessInfo",
      render: (rowData: { businessInfo: { businessName: string } }) => {
        return <p>{rowData?.businessInfo?.businessName}</p>;
      },
    },
    {
      title: "Estimated Revenue",
      dataKey: "estimatedRevenue",
      render: (rowData: { businessInfo: { estimatedRevenue: string } }) => {
        return (
          <p>{formatEstimatedRevinue(rowData.businessInfo.estimatedRevenue)}</p>
        );
      },
    },
    {
      title: "Employee Size",
      dataKey: "Employee Size",
      render: (rowData: { businessInfo: { employeeSize: StaffCountEnum } }) => {
        return <p>{formatStaffCountEnum(rowData.businessInfo.employeeSize)}</p>;
      },
    },
    {
      title: "BusinessType",
      dataKey: "bussinessType",
      render: (rowData: {
        businessInfo: { businessType: BusinessTypeEnum };
      }) => {
        return (
          <p>{formatBusinessTypeEnum(rowData.businessInfo.businessType)}</p>
        );
      },
    },
    { title: "Address", dataKey: "businessInfo.address.place.displayName" },
    { title: "City", dataKey: "businessInfo.address.city" },
    { title: "State", dataKey: "businessInfo.address.state.stateName" },
    { title: "Zipcode", dataKey: "businessInfo.address.zipcode" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
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
    <div className="w-full mx-auto px-2">
      {/* {isLoading && <Loading />} */}
      <RoopTable
        loading={isLoading}
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
        comments="Are you sure you want to update the selected user's status?"
      >
        <div className="flex justify-end space-x-4">
          <CButton
            loading={btnLoading}
            variant={ButtonType.Primary}
            onClick={handleConfirmation}
          >
            Yes
          </CButton>
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={showApproveModal}
        onClose={handleCloseApproveModal}
        title="Are you sure ?"
        comments="Are you sure you want to approve the selected user?"
      >
        <div className="flex justify-end space-x-4">
          <CButton
            loading={btnLoading}
            variant={ButtonType.Primary}
            onClick={handleApprovalConfirmation}
          >
            Yes
          </CButton>
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={lastRectectedConfirmation}
        onClose={handleCloseRejectConformation}
        title="Are you sure ?"
        comments="are you sure you want to Reject the user."
      >
        <div className="flex justify-end space-x-4">
          <CButton
            loading={btnLoading}
            variant={ButtonType.Primary}
            onClick={handleRejectConfirmation}
          >
            Yes
          </CButton>
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
            <CButton
              loading={btnLoading}
              variant={ButtonType.Primary}
              onClick={handleReason(handleRejectUser)}
            >
              Reject User
            </CButton>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default Reports;
