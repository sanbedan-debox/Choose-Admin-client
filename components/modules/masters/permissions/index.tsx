import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import Select from "react-select";
import { sdk } from "@/util/graphqlClient";
import useGlobalLoaderStore from "@/store/loader";
import ReusableModal from "@/components/common/modal/modal";
import {
  AddPermissionInput,
  PermissionTypeEnum,
  UserRole,
} from "@/generated/graphql";
import useGlobalStore from "@/store/global";
import { extractErrorMessage, formatDateString } from "@/util/utils";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";
import CustomSwitch from "@/components/common/customSwitch/customSwitch";
import { FaEdit } from "react-icons/fa";

const formatPreselectArray = (preselect: UserRole[]): string => {
  let arr = [];
  for (let i = 0; i < preselect.length; i++) {
    const cate = preselect[i];
    switch (cate) {
      case UserRole.Owner:
        arr.push("Owner");
        break;
      case UserRole.Accountant:
        arr.push("Accountant");
        break;
      case UserRole.Manager:
        arr.push("Manager");
        break;
      case UserRole.MarketingPartner:
        arr.push("Marketing Partner");
        break;

      default:
        break;
    }
  }
  return arr.join(", ");
};

const formatType = (type: PermissionTypeEnum): string => {
  switch (type) {
    case PermissionTypeEnum.AddRestaurant:
      return "Add Restaurant";
    case PermissionTypeEnum.UpdateRestaurant:
      return "Update Restaurant";
    case PermissionTypeEnum.UpdateBusiness:
      return "Update Business";
    case PermissionTypeEnum.UpdateTax:
      return "Update Tax";
    case PermissionTypeEnum.PaymentManagement:
      return "Payment Management";
    case PermissionTypeEnum.UserManagement:
      return "User Management";
    case PermissionTypeEnum.Rewards:
      return "Rewards";
    case PermissionTypeEnum.Menu:
      return "Menu";
    case PermissionTypeEnum.Offers:
      return "Offers";
    case PermissionTypeEnum.Reports:
      return "Reports";
    case PermissionTypeEnum.Dashboard:
      return "Dashboard";
    case PermissionTypeEnum.Integrations:
      return "Integrations";
    case PermissionTypeEnum.Cms:
      return "CMS";
    case PermissionTypeEnum.Customers:
      return "Customers";
    case PermissionTypeEnum.Orders:
      return "Orders";
    case PermissionTypeEnum.Marketing:
      return "Marketing";

    default:
      return "";
  }
};

interface FormInput {
  type: { value: PermissionTypeEnum; label: string };
  preselect: { value: UserRole; label: string }[];
  isFunction: boolean;
}

interface EditFormInput {
  preselect: { value: UserRole; label: string }[];
}

const MasterPermissions: React.FC = () => {
  const [masterPermissions, setMasterPermissions] = useState<any[]>([]);
  const { setLoading, isLoading } = useGlobalLoaderStore();
  const { setToastData } = useGlobalStore();

  const [counter, setCounter] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
  } = useForm<EditFormInput>();

  useEffect(() => {
    const fetchMasterPermissions = async () => {
      setLoading(true);
      try {
        const response = await sdk.GetAllPermissions();
        if (response && response.getAllPermissions) {
          const formattedUsers = response.getAllPermissions.map((tz) => ({
            ...tz,
            createdAt: formatDateString(tz.createdAt),
            updatedAt: formatDateString(tz.updatedAt),
          }));
          setMasterPermissions(formattedUsers);
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

    fetchMasterPermissions();
  }, [counter, setLoading, setToastData]);

  const [btnLoading, setBtnLoading] = useState(false);

  const roleOptions = [
    { value: UserRole.Owner, label: "Owner" },
    { value: UserRole.Manager, label: "Manager" },
    { value: UserRole.Staff, label: "Staff" },
    { value: UserRole.MarketingPartner, label: "Marketing Partner" },
    { value: UserRole.Accountant, label: "Accountant" },
  ];

  const typeOptions = [
    { value: PermissionTypeEnum.AddRestaurant, label: "Add Restaurant" },
    { value: PermissionTypeEnum.UpdateRestaurant, label: "Update Restaurant" },
    {
      value: PermissionTypeEnum.UpdateBusiness,
      label: "Update Business",
    },
    { value: PermissionTypeEnum.UpdateTax, label: "Update Tax" },
    {
      value: PermissionTypeEnum.PaymentManagement,
      label: "Payment Management",
    },
    { value: PermissionTypeEnum.UserManagement, label: "User Management" },
    { value: PermissionTypeEnum.Rewards, label: "Rewards" },
    { value: PermissionTypeEnum.Menu, label: "Menu" },
    { value: PermissionTypeEnum.Offers, label: "Offers" },
    { value: PermissionTypeEnum.Reports, label: "Reports" },
    { value: PermissionTypeEnum.Dashboard, label: "Dashboard" },
    { value: PermissionTypeEnum.Integrations, label: "Integrations" },
    { value: PermissionTypeEnum.Cms, label: "CMS" },
    { value: PermissionTypeEnum.Customers, label: "Customers" },
    { value: PermissionTypeEnum.Orders, label: "Orders" },
    { value: PermissionTypeEnum.Marketing, label: "Marketing" },
  ];

  const handleAddPermission: SubmitHandler<FormInput> = async (data) => {
    try {
      setBtnLoading(true);
      const input: AddPermissionInput = {
        type: data.type.value,
        preselect: data.preselect.map((el) => el.value),
        isFunction: data.isFunction,
      };

      const response = await sdk.AddPermission({
        input: {
          ...input,
        },
      });
      if (!response.addPermission) {
        setToastData({
          message: "Permission cannot be added!",
          type: "error",
        });
        return;
      }

      reset();
      setIsAddModalOpen(false);
      setCounter((prev) => prev + 1);
      setToastData({
        message: "Permission Added successfully",
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

  const handleEditPermission: SubmitHandler<EditFormInput> = async (data) => {
    try {
      setBtnLoading(true);

      const response = await sdk.UpdatePermissionPreselect({
        id: selectedAdminId || "",
        preselect: data.preselect.map((el) => el.value),
      });

      if (!response.updatePermissionPreselect) {
        setToastData({
          message: "Permission cannot be updated!",
          type: "error",
        });
        return;
      }

      resetEdit();
      setIsEditModalOpen(false);
      setCounter((prev) => prev + 1);
      setToastData({
        message: "Permission updated successfully",
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

  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);

  const renderActions = (rowData: { _id: string }) => (
    <div className="flex space-x-3 justify-center items-center">
      <FaEdit
        className="text-blue-500 cursor-pointer"
        onClick={() => {
          setSelectedAdminId(rowData._id);
          setIsEditModalOpen(true);
        }}
      />
    </div>
  );

  const headings = [
    {
      title: "Type",
      dataKey: "type",
      render: (rowData: { type: PermissionTypeEnum }) => {
        return <p>{formatType(rowData.type)}</p>;
      },
    },
    {
      title: "Preselect",
      dataKey: "preselect",
      render: (rowData: { preselect: UserRole[] }) => {
        return <p>{formatPreselectArray(rowData.preselect)}</p>;
      },
    },
    {
      title: "Function",
      dataKey: "isFunction",
      render: (rowData: { isFunction: boolean }) => {
        return rowData.isFunction ? "Yes" : "No";
      },
    },
    { title: "Created By", dataKey: "createdBy.name" },
    { title: "Updated By", dataKey: "updatedBy.name" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    { title: "Actions", dataKey: "actions", render: renderActions },
  ];

  const mainActions = [
    {
      label: "Add Permission",
      onClick: () => setIsAddModalOpen(true),
    },
  ];

  return (
    <div className="w-full mx-auto px-2">
      <RoopTable
        loading={isLoading}
        data={masterPermissions}
        itemsPerPage={10}
        headings={headings}
        hovered
        csvExport
        mainActions={mainActions}
        filterable
      />

      <ReusableModal
        title="Add New Permission"
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          reset();
        }}
        width="md"
      >
        <form onSubmit={handleSubmit(handleAddPermission)}>
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
            <Select
              classNames={{
                option: (state) =>
                  `!text-sm hover:!bg-primary hover:!text-white focus:!bg-transparent  ${
                    state.isSelected ? "!bg-primary text-white" : ""
                  }  `,
              }}
              {...register("preselect", {
                required: {
                  value: true,
                  message: "Atleast one role is required",
                },
              })}
              onChange={(newVal) => {
                setValue(
                  "preselect",
                  newVal.map((el) => ({ label: el.label, value: el.value }))
                );
              }}
              options={roleOptions}
              isMulti
              className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
              classNamePrefix="react-select"
              placeholder="Select Role"
            />
            {errors.preselect && (
              <p className="text-red-500 text-sm">{errors.preselect.message}</p>
            )}
          </div>
          <div className="mb-4">
            <Controller
              name="isFunction"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col items-start justify-start space-y-2">
                  <p className="text-sm font-semibold text-black">
                    Is a Function?
                  </p>
                  <CustomSwitch
                    checked={field.value}
                    onChange={() => {
                      setValue("isFunction", !field.value);
                    }}
                    label={"Is A Function"}
                  />
                </div>
              )}
            />
            {errors.isFunction && (
              <p className="text-red-500 text-sm">
                {errors.isFunction.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <CButton
              loading={btnLoading}
              variant={ButtonType.Primary}
              className="btn btn-primary"
            >
              Add Permission
            </CButton>
          </div>
        </form>
      </ReusableModal>

      <ReusableModal
        title="Edit Permission"
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetEdit();
        }}
        width="md"
      >
        <form onSubmit={handleEditSubmit(handleEditPermission)}>
          <div className="mb-4">
            <Select
              classNames={{
                option: (state) =>
                  `!text-sm hover:!bg-primary hover:!text-white focus:!bg-transparent  ${
                    state.isSelected ? "!bg-primary text-white" : ""
                  }  `,
              }}
              {...editRegister("preselect", {
                required: {
                  value: true,
                  message: "Atleast one role is required",
                },
              })}
              onChange={(newVal) => {
                setEditValue(
                  "preselect",
                  newVal.map((el) => ({ label: el.label, value: el.value }))
                );
              }}
              options={roleOptions}
              isMulti
              className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
              classNamePrefix="react-select"
              placeholder="Select Role"
            />
            {editErrors.preselect && (
              <p className="text-red-500 text-sm">
                {editErrors.preselect.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <CButton
              loading={btnLoading}
              variant={ButtonType.Primary}
              className="btn btn-primary"
            >
              Update Permission
            </CButton>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default MasterPermissions;
