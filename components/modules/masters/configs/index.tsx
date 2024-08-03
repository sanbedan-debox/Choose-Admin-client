import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import Select from "react-select";
import { sdk } from "@/util/graphqlClient";
import useGlobalLoaderStore from "@/store/loader";
import ReusableModal from "@/components/common/modal/modal"; // Import your reusable modal
import { AddConfigInput, ConfigTypeEnum } from "@/generated/graphql";
import useGlobalStore from "@/store/global";
import { extractErrorMessage, formatDateString } from "@/util/utils";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";
import { FaEdit } from "react-icons/fa";

const formatType = (type: ConfigTypeEnum): string => {
  switch (type) {
    case ConfigTypeEnum.MonthlySubscription:
      return "Monthly Subscription";
    case ConfigTypeEnum.ProcessingFee:
      return "Processing Fee";
    case ConfigTypeEnum.TrialDays:
      return "Trial Days";

    default:
      return "";
  }
};

interface FormInput {
  type: { value: ConfigTypeEnum; label: string };
  value: number;
}
interface FormEditInput {
  value: number;
}

const MasterConfigs: React.FC = () => {
  const [masterConfigs, setMasterConfigs] = useState<any[]>([]);
  const { setLoading, isLoading } = useGlobalLoaderStore();
  const { setToastData } = useGlobalStore();

  const [counter, setCounter] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormInput>();

  const {
    register: editRegister,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
    formState: { errors: editErrors },
    setValue: setEditValue,
    control: editControl,
  } = useForm<FormEditInput>();

  useEffect(() => {
    const fetchMasterConfigs = async () => {
      setLoading(true);
      try {
        const response = await sdk.GetAllConfigs();
        if (response && response.getAllConfigs) {
          const formattedUsers = response.getAllConfigs.map((tz) => ({
            ...tz,
            createdAt: formatDateString(tz.createdAt),
            updatedAt: formatDateString(tz.updatedAt),
          }));
          setMasterConfigs(formattedUsers);
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

    fetchMasterConfigs();
  }, [counter, setLoading, setToastData]);

  const [btnLoading, setBtnLoading] = useState(false);

  const typeOptions = [
    {
      value: ConfigTypeEnum.MonthlySubscription,
      label: "Monthly Subscription",
    },
    { value: ConfigTypeEnum.ProcessingFee, label: "Processing Fee" },
    { value: ConfigTypeEnum.TrialDays, label: "Trial Days" },
  ];

  const handleAddConfig: SubmitHandler<FormInput> = async (data) => {
    try {
      setBtnLoading(true);
      const input: AddConfigInput = {
        type: data.type.value,
        value: parseFloat(data.value.toString()),
      };

      const response = await sdk.AddConfig({
        input: {
          ...input,
        },
      });

      if (!response.addConfig) {
        setToastData({
          message: "Config cannot be added!",
          type: "error",
        });
        return;
      }

      reset();
      setIsAddModalOpen(false);
      setCounter((prev) => prev + 1);
      setToastData({
        message: "Config Added successfully",
        type: "success",
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
  const handleEditConfig: SubmitHandler<FormEditInput> = async (data) => {
    try {
      setBtnLoading(true);

      const response = await sdk.UpdateConfig({
        id: selectedAdminId || "",
        value: parseFloat(data.value.toString()),
      });

      if (!response.updateConfig) {
        setToastData({
          message: "Config cannot be updated!",
          type: "error",
        });
        return;
      }

      resetEdit();
      setIsChangeConfigs(false);
      setCounter((prev) => prev + 1);
      setToastData({
        message: "Config updated successfully",
        type: "success",
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

  const [isChangeConfigs, setIsChangeConfigs] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);

  const renderActions = (rowData: { _id: string }) => (
    <div className="flex space-x-3 justify-center items-center">
      <FaEdit
        className="text-blue-500 cursor-pointer"
        onClick={() => {
          setSelectedAdminId(rowData._id);
          setIsChangeConfigs(true);
        }}
      />
    </div>
  );
  const headings = [
    {
      title: "Type",
      dataKey: "type",
      render: (rowData: { type: ConfigTypeEnum }) => {
        return <p>{formatType(rowData.type)}</p>;
      },
    },
    {
      title: "Value",
      dataKey: "value",
    },
    { title: "Created By", dataKey: "createdBy.name" },
    { title: "Updated By", dataKey: "updatedBy.name" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    { title: "Actions", dataKey: "id", render: renderActions },
  ];

  const mainActions = [
    {
      label: "Add Config",
      onClick: () => setIsAddModalOpen(true),
    },
  ];
  return (
    <div className="w-full mx-auto px-2">
      {/* {isLoading && <Loading />} */}
      <RoopTable
        loading={isLoading}
        data={masterConfigs}
        itemsPerPage={10}
        headings={headings}
        hovered
        csvExport
        mainActions={mainActions}
        filterable
      />

      <ReusableModal
        title="Add New Config"
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          reset();
        }}
        width="md"
      >
        <form onSubmit={handleSubmit(handleAddConfig)}>
          <div className="mb-4">
            <Select
              classNames={{
                option: (state) =>
                  `!text-sm hover:!bg-primary hover:!text-white focus:!bg-transparent  ${
                    state.isSelected ? "!bg-primary text-white" : ""
                  }  `,
              }}
              {...register("type", {
                required: { value: true, message: "Type is required" },
              })}
              onChange={(newVal) => {
                if (newVal) {
                  setValue("type", newVal);
                }
              }}
              options={typeOptions}
              className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
              classNamePrefix="react-select"
              placeholder="Select Type"
            />
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("value", {
                required: { value: true, message: "Value is required" },
              })}
              placeholder="Enter value"
              className="input input-primary"
            />
            {errors.value && (
              <p className="text-red-500 text-sm">{errors.value.message}</p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <CButton
              loading={btnLoading}
              variant={ButtonType.Primary}
              className="btn btn-primary"
            >
              Add Config
            </CButton>
          </div>
        </form>
      </ReusableModal>
      <ReusableModal
        title="Change Config Value"
        comments="Are you sure you want to change the config value?"
        isOpen={isChangeConfigs}
        onClose={() => setIsChangeConfigs(false)}
        width="md"
      >
        <form onSubmit={handleEditSubmit(handleEditConfig)}>
          <div className="mb-4">
            <input
              {...editRegister("value", {
                required: { value: true, message: "Value is required" },
              })}
              placeholder="Enter value"
              className="input input-primary"
            />
            {editErrors.value && (
              <p className="text-red-500 text-sm">{editErrors.value.message}</p>
            )}
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <CButton variant={ButtonType.Primary} type="submit">
              Change Value
            </CButton>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default MasterConfigs;
