import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";
import CustomSwitch from "@/components/common/customSwitch/customSwitch";
import RoopTable from "@/components/common/customTableR/table";
import ReusableModal from "@/components/common/modal/modal"; // Import your reusable modal
import { AddCuisineInput } from "@/generated/graphql";
import useGlobalStore from "@/store/global";
import useGlobalLoaderStore from "@/store/loader";
import { sdk } from "@/util/graphqlClient";
import { extractErrorMessage, formatDateString } from "@/util/utils";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const MasterCuisines: React.FC = () => {
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
  } = useForm<AddCuisineInput>();
  useEffect(() => {
    const fetchMasterCuisines = async () => {
      setLoading(true);
      try {
        const response = await sdk.getAllCuisines();
        if (response && response.getAllCuisines) {
          const formattedUsers = response.getAllCuisines.map((ci) => ({
            ...ci,
            createdAt: formatDateString(ci.createdAt),
            updatedAt: formatDateString(ci.updatedAt),
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

    fetchMasterCuisines();
  }, [counter, setLoading]);

  const handleToggleSwitch = (rowData: { status: boolean; _id: string }) => {
    setShowConfirmationModal(true);
    setSelectedUserId(rowData._id);
  };

  const handleConfirmation = async () => {
    setShowConfirmationModal(false);
    try {
      setBtnLoading(true);
      const response = await sdk.UpdateCuisineStatus({ id: selectedUserId });
      if (response && response.updateCuisineStatus) {
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

  const handleAddTImezone: SubmitHandler<AddCuisineInput> = async (data) => {
    try {
      setBtnLoading(true);
      const input: AddCuisineInput = {
        value: data.value,
        description: data.description,
      };

      const response = await sdk.AddCuisine({
        input: {
          value: input.value,
          description: input.description,
        },
      });
      setIsAddModalOpen(false);
      setCounter((prev) => prev + 1);
      setToastData({ message: "Cuisine Added successfully", type: "success" });
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
    { title: "description", dataKey: "description" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    // { title: "Actions", dataKey: "status", render: renderActions },
  ];

  const mainActions = [
    {
      label: "Add Cuisines",
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
        comments="are you sure you want to block the user."
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
        title="Add New Cuisine"
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          reset();
        }}
        width="md"
      >
        <form onSubmit={handleSubmit(handleAddTImezone)}>
          <div className="mb-4">
            <label className="block text-black">Cuisine name</label>
            <input
              type="text"
              placeholder="Enter cuisine name..."
              {...register("value", { required: "Cuisine name is required" })}
              className="input input-primary"
            />
            {errors.value && (
              <p className="text-red-500 text-sm">{errors.value.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-black">Description</label>
            <textarea
              placeholder="Enter description..."
              {...register("description", {
                required: "Cuisine description is required",
              })}
              className="input input-primary"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <CButton loading={btnLoading} variant={ButtonType.Primary}>
              Add Cuisine
            </CButton>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default MasterCuisines;
