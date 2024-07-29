import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/util/graphqlClient";
import useGlobalLoaderStore from "@/store/loader";
import ReusableModal from "@/components/common/modal/modal"; // Import your reusable modal
import CustomSwitch from "@/components/common/customSwitch/customSwitch";
import { AddStateInput, PlatformStatus } from "@/generated/graphql";
import useGlobalStore from "@/store/global";
import { extractErrorMessage, formatDateString } from "@/util/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { ButtonType } from "@/components/common/button/interface";
import CButton from "@/components/common/button/button";

const MasterStates: React.FC = () => {
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
  } = useForm<AddStateInput>();
  useEffect(() => {
    const fetchMasterStates = async () => {
      setLoading(true);
      try {
        const response = await sdk.GetAllStates();
        if (response && response.getAllStates) {
          const formattedUsers = response.getAllStates.map((state) => ({
            ...state,
            createdAt: formatDateString(state.createdAt),
            updatedAt: formatDateString(state.updatedAt),
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

    fetchMasterStates();
  }, [counter, setLoading]);

  const handleToggleSwitch = (rowData: { status: boolean; _id: string }) => {
    setShowConfirmationModal(true);
    setSelectedUserId(rowData._id);
  };

  const handleConfirmation = async () => {
    setShowConfirmationModal(false);
    try {
      setBtnLoading(true);
      const response = await sdk.updateStateStatus({ id: selectedUserId });
      if (response && response.updateStateStatus) {
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

  const handleAddState: SubmitHandler<AddStateInput> = async (data) => {
    try {
      setBtnLoading(true);
      const input: AddStateInput = {
        value: data.value,
        abbreviation: data.abbreviation,
      };

      const response = await sdk.addState({
        input: {
          value: input.value,
          abbreviation: input.abbreviation,
        },
      });
      setIsAddModalOpen(false);
      setCounter((prev) => prev + 1);
      setToastData({ message: "State Added successfully", type: "success" });
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
    { title: "Abbreviation", dataKey: "abbreviation" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    // { title: "Actions", dataKey: "status", render: renderActions },
  ];

  const mainActions = [
    {
      label: "Add State",
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
        title="Add New State"
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          reset();
        }}
        width="md"
      >
        <form onSubmit={handleSubmit(handleAddState)}>
          <div className="mb-4">
            <label className="block text-black">Name</label>
            <input
              type="text"
              placeholder="Enter name..."
              {...register("value", { required: "Name is required" })}
              className="input input-primary"
            />
            {errors.value && (
              <p className="text-red-500 text-sm">{errors.value.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-black">Abbreviation</label>
            <input
              placeholder="Enter abbreviation..."
              {...register("abbreviation", {
                required: "Abbreviation is required",
              })}
              className="input input-primary"
            />
            {errors.abbreviation && (
              <p className="text-red-500 text-sm">
                {errors.abbreviation.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <CButton loading={btnLoading} variant={ButtonType.Primary}>
              Add State
            </CButton>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default MasterStates;
