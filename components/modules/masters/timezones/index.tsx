import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/util/graphqlClient";
import useGlobalLoaderStore from "@/store/loader";
import ReusableModal from "@/components/common/modal/modal"; // Import your reusable modal
import CustomSwitch from "@/components/common/customSwitch/customSwitch";
import {
  AddStateInput,
  AddTimezoneInput,
  PlatformStatus,
} from "@/generated/graphql";
import useGlobalStore from "@/store/global";
import { extractErrorMessage, formatDateString } from "@/util/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";

const MasterTimezones: React.FC = () => {
  const [restaurantUsers, setRestaurantUsers] = useState<any[]>([]);
  const { setLoading, isLoading } = useGlobalLoaderStore();
  const { setToastData } = useGlobalStore();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const [counter, setCounter] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<AddTimezoneInput>();
  useEffect(() => {
    const fetchMasterTimezones = async () => {
      setLoading(true);
      try {
        const response = await sdk.GetAllTimezones();
        if (response && response.getAllTimezones) {
          const formattedUsers = response.getAllTimezones.map((tz) => ({
            ...tz,
            createdAt: formatDateString(tz.createdAt),
            updatedAt: formatDateString(tz.updatedAt),
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

    fetchMasterTimezones();
  }, [counter, setLoading]);

  const handleToggleSwitch = (rowData: { status: boolean; _id: string }) => {
    setShowConfirmationModal(true);
    setSelectedUserId(rowData._id);
  };

  const handleConfirmation = async () => {
    setShowConfirmationModal(false);
    try {
      setBtnLoading(true);
      const response = await sdk.updateTimezoneStatus({ id: selectedUserId });
      if (response && response.updateTimezoneStatus) {
        setCounter((prev) => prev + 1);
      }
      setToastData({
        type: "success",
        message: "Status changed successfully",
      });
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
  const [btnLoading, setBtnLoading] = useState(false);

  const handleAddTImezone: SubmitHandler<AddTimezoneInput> = async (data) => {
    try {
      setBtnLoading(true);
      const input: AddTimezoneInput = {
        value: data.value,
        gmtOffset: data.gmtOffset,
      };

      const response = await sdk.AddTimezone({
        input: {
          value: input.value,
          gmtOffset: parseInt(input.gmtOffset.toString()),
        },
      });
      setIsAddModalOpen(false);
      setCounter((prev) => prev + 1);
      setToastData({ message: "TImezone Added successfully", type: "success" });
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

  const renderSwitch = (rowData: { status: boolean; _id: string }) => (
    <div>
      <CustomSwitch
        checked={rowData.status}
        onChange={() => handleToggleSwitch(rowData)}
        label={`Toggle switch for ${rowData._id}`}
      />
    </div>
  );

  const headings = [
    { title: "Toggle Status", dataKey: "status", render: renderSwitch },

    { title: "Name", dataKey: "value" },
    { title: "gmtOffset", dataKey: "gmtOffset" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    // { title: "Actions", dataKey: "status", render: renderActions },
  ];

  const mainActions = [
    {
      label: "Add Timezone",
      onClick: () => setIsAddModalOpen(true),
    },
  ];
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
        mainActions={mainActions}
        filterable
      />
      {/* STATUS BLOCK/UNBLOCK */}
      <ReusableModal
        isOpen={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        title="Are you sure ?"
        comments="By clicking yes the status of selected timezone will change."
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
        title="Add New Timezone"
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          reset();
        }}
        width="md"
      >
        <form onSubmit={handleSubmit(handleAddTImezone)}>
          <div className="mb-4">
            <label className="block text-black">Timezone</label>
            <input
              type="text"
              placeholder="Enter timezone name..."
              {...register("value", { required: "Timezone name is required" })}
              className="input input-primary"
            />
            {errors.value && (
              <p className="text-red-500 text-sm">{errors.value.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-black">GMT Offset</label>
            <input
              placeholder="Enter GMT Offset..."
              {...register("gmtOffset", {
                required: "GMT Offset is required",
              })}
              className="input input-primary"
            />
            <p className="block text-black text-opacity-60 text-xs mt-1">
              Add the offset in minutes. Example -3000
            </p>
            {errors.gmtOffset && (
              <p className="text-red-500 text-sm">{errors.gmtOffset.message}</p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <CButton
              loading={btnLoading}
              variant={ButtonType.Primary}
              className="btn btn-primary"
            >
              Add Timezone
            </CButton>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default MasterTimezones;
