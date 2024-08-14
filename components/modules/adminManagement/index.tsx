import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/util/graphqlClient";
import ReusableModal from "@/components/common/modal/modal";
import {
  AdminRowType,
  AddAdminFormInputs,
  ChangeRoleInputs,
  roleOptions,
} from "./interface";
import useGlobalStore from "@/store/global";
import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { FaTrash, FaEdit, FaShieldAlt } from "react-icons/fa";
import CustomSwitch from "@/components/common/customSwitch/customSwitch";
import useAuthStore from "@/store/auth";
import { extractErrorMessage } from "@/util/utils";
import { AdminStatus } from "@/generated/graphql";

const Admin: React.FC = () => {
  const [members, setMembers] = useState<AdminRowType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedAdminStatus, setSelectedAdminStatus] = useState("");

  const { userId } = useAuthStore();
  const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null);
  const { setToastData } = useGlobalStore();
  const [counter, setCounter] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<AddAdminFormInputs>();

  const {
    register: registerRole,
    handleSubmit: handleSubmitRole,
    reset: resetRole,
    formState: { errors: errorsRole },
    control: controlRole,
  } = useForm<ChangeRoleInputs>();

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${padTwoDigits(date.getMonth() + 1)}/${padTwoDigits(
      date.getDate()
    )}/${date.getFullYear()} ${padTwoDigits(date.getHours())}:${padTwoDigits(
      date.getMinutes()
    )}`;
    return formattedDate;
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await sdk.GetAdmins();
        if (response && response.getAdmins) {
          const formattedUsers = response.getAdmins.map((user) => ({
            ...user,
            createdAt: formatDate(user.createdAt),
            updatedAt: formatDate(user.updatedAt),
          }));

          setMembers(
            formattedUsers.map((el) => ({
              id: el._id,
              name: el.name,
              email: el.email,
              createdAt: el.createdAt,
              updatedAt: el.updatedAt,
              role: el.role,
              status: el.status,
            }))
          );
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
    fetch();
  }, [formatDate, counter]);

  const padTwoDigits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const handleAddAdmin: SubmitHandler<AddAdminFormInputs> = async (data) => {
    try {
      const input: AddAdminFormInputs = {
        name: data.name,
        email: data.email,
        role: data.role,
      };
      if (!input.role?.value) {
        return;
      }

      const response = await sdk.addAdmin({
        input: {
          email: input.email,
          name: input.name,
          role: input.role?.value,
        },
      });
      setIsAddModalOpen(false);
      setCounter((prev) => prev + 1);
      setToastData({ message: "Admin added successfully", type: "success" });
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    }
  };
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChangeRole: SubmitHandler<ChangeRoleInputs> = async (data) => {
    if (!selectedAdminId || !data.role) return;

    try {
      sdk.ChangeRole({
        id: selectedAdminId,
        role: data.role.value,
      });
      setIsChangeRoleModalOpen(false);
      setCounter((prev) => prev + 1);
      setToastData({ message: "Role changed successfully", type: "success" });
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    }
  };

  const openDeleteModal = (id: any) => {
    // console.log(id);
    setAdminToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleToggleSwitch = (rowData: { status: AdminStatus; id: string }) => {
    setSelectedAdminId(rowData.id);
    setSelectedAdminStatus(rowData.status);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = async () => {
    if (!selectedAdminId) return;
    setShowConfirmationModal(false);
    try {
      setBtnLoading(true);
      const newStatus: AdminStatus =
        selectedAdminStatus === AdminStatus.Blocked
          ? AdminStatus.Active
          : AdminStatus.Blocked;
      const response = await sdk.blockAdmin({
        id: selectedAdminId,
        updateStatus: newStatus,
      });
      setCounter((prev) => prev + 1);
      setToastData({
        message: `Admin status changed to ${newStatus}`,
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

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedAdminId(null);
  };

  const renderSwitch = (rowData: { status: AdminStatus; id: string }) => (
    <div>
      {userId !== rowData.id ? (
        <CustomSwitch
          checked={rowData.status !== AdminStatus.Blocked}
          onChange={() => handleToggleSwitch(rowData)}
          label={`Toggle switch for ${rowData.id}`}
        />
      ) : (
        "N/A"
      )}
    </div>
  );

  const renderActions = (rowData: { id: string }) => (
    <div className="flex space-x-3 justify-center items-center">
      {userId !== rowData.id && (
        <>
          <FaTrash
            className="text-red-500 cursor-pointer"
            onClick={() => openDeleteModal(rowData.id)}
          />
        </>
      )}
      <FaEdit
        className="text-blue-500 cursor-pointer"
        onClick={() => {
          setSelectedAdminId(rowData.id);
          setIsChangeRoleModalOpen(true);
        }}
      />
    </div>
  );

  const mainActions = [
    {
      label: "Add Admin",
      onClick: () => setIsAddModalOpen(true),
    },
  ];

  const headings = [
    { title: "Toggle Status", dataKey: "status", render: renderSwitch },
    { title: "Name", dataKey: "name" },
    { title: "Email", dataKey: "email" },
    { title: "Role", dataKey: "role" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    { title: "status", dataKey: "status" },
    { title: "Actions", dataKey: "id", render: renderActions },
  ];

  return (
    <div className="w-full mx-auto px-2">
      <RoopTable
        loading={loading}
        data={members}
        itemsPerPage={10}
        csvExport
        fullCsv
        csvFileName="admins_data.csv"
        headings={headings}
        hovered
        filterable
        mainActions={mainActions}
      />

      <ReusableModal
        title="Add New Admin"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        width="md"
      >
        <form onSubmit={handleSubmit(handleAddAdmin)}>
          <div className="mb-4">
            <label className="block text-black">Name</label>
            <input
              type="text"
              placeholder="Enter Name..."
              {...register("name", { required: "Name is required" })}
              className="input input-primary"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-black">Email</label>
            <input
              placeholder="Enter Email..."
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="input input-primary"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-black">Role</label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={roleOptions}
                  // classNames={{
                  //   placeholder: () => "!text-gray-400",
                  //   control: () =>
                  //     "!bg-input !border-none !text-sm !rounded-lg !w-full transition duration-150 ease-in-out !shadow-none",
                  //   menu: () => "z-[100] !bg-white text-black",
                  //   singleValue: () => "!text-black",
                  //   option: (state) =>
                  //     `!text-sm hover:!bg-primary hover:!text-white  focus:!bg-transparent ${
                  //       state.isFocused || state.isSelected
                  //         ? "!bg-transparent !text-black"
                  //         : ""
                  //     }`,
                  // }}
                  classNames={{
                    option: (state) =>
                      `!text-sm hover:!bg-primary hover:!text-white focus:!bg-transparent  ${
                        state.isSelected ? "!bg-primary text-white" : ""
                      }  `,
                  }}
                  className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
                  classNamePrefix="react-select"
                  placeholder="Select Role"
                />
              )}
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <CButton variant={ButtonType.Primary}>Add Admin</CButton>
          </div>
        </form>
      </ReusableModal>

      <ReusableModal
        title="Change Admin Role"
        comments="Are you sure you want to change Admins role ?"
        isOpen={isChangeRoleModalOpen}
        onClose={() => setIsChangeRoleModalOpen(false)}
        width="md"
      >
        <form onSubmit={handleSubmitRole(handleChangeRole)}>
          <div className="mb-4">
            <Controller
              name="role"
              control={controlRole}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select
                  classNames={{
                    option: (state) =>
                      `!text-sm hover:!bg-primary hover:!text-white focus:!bg-transparent  ${
                        state.isSelected ? "!bg-primary text-white" : ""
                      }  `,
                  }}
                  {...field}
                  options={roleOptions}
                  className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
                  classNamePrefix="react-select"
                  placeholder="Select Role"
                />
              )}
            />
            {errorsRole.role && (
              <p className="text-red-500 text-sm">{errorsRole.role.message}</p>
            )}
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <CButton variant={ButtonType.Primary}>Change Role</CButton>
          </div>
        </form>
      </ReusableModal>
      <ReusableModal
        title="Confirm Status Change"
        comments="Are you sure you want to change the admin's status ?"
        isOpen={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        width="sm"
      >
        <div className="flex justify-end mt-4">
          <CButton
            loading={btnLoading}
            variant={ButtonType.Primary}
            onClick={handleConfirmation}
          >
            Yes
          </CButton>
        </div>
      </ReusableModal>
    </div>
  );
};

export default Admin;
