import React, { useEffect, useState } from "react";
import Select from "react-select";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/util/graphqlClient";
import ReusableModal from "@/components/common/modal/modal";
import {
  AddAdminFormInputs,
  AdminInterface,
  ChangePasswordInputs,
  ChangeRoleInputs,
  roleOptions,
} from "./interface";
import { generateRandomPassword } from "@/util/generatePassword";
import useGlobalStore from "@/store/global";
import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { FaTrash, FaEdit, FaShieldAlt } from "react-icons/fa";
import Switch from "react-switch";
import { PlatformStatus } from "@/generated/graphql";
import Loading from "@/components/common/Loader/Loader";
import CustomSwitch from "@/components/common/customSwitch/customSwitch";

const Admin: React.FC = () => {
  const [members, setMembers] = useState<AdminInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<any>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedAdminStatus, setSelectedAdminStatus] = useState("");
  const [randomPassword, setRandomPassword] = useState(
    generateRandomPassword()
  );
  const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<AdminInterface | null>(
    null
  );
  const { setToastData } = useGlobalStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<AddAdminFormInputs>();

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    reset: resetPass,
    formState: { errors: errorsPass },
    setValue: setValuePass,
    control: controlPass,
  } = useForm<ChangePasswordInputs>();
  const {
    register: registerRole,
    handleSubmit: handleSubmitRole,
    reset: resetRole,
    formState: { errors: errorsRole },
    control: controlRole,
  } = useForm<ChangeRoleInputs>();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await sdk.GetAdmins();
      if (response && response.getAdmins) {
        const formattedUsers = response.getAdmins.map((user) => ({
          ...user,
          createdAt: formatDate(user.createdAt),
          updatedAt: formatDate(user.updatedAt),
        }));

        setMembers(formattedUsers);
      }
    } catch (error) {
      console.error("Failed to fetch admin details:", error);
    } finally {
      setLoading(false);
    }
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

  const handleAddAdmin: SubmitHandler<AddAdminFormInputs> = async (data) => {
    try {
      const input: AddAdminFormInputs = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role?.value || "",
      };
      const response = await sdk.addAdmin({ input });
      setIsAddModalOpen(false);
      fetchAdmins();
      setToastData({ message: "Admin added successfully", type: "success" });
    } catch (error) {
      console.error("Failed to add admin:", error);
      setToastData({ message: "Failed to add admin", type: "error" });
    }
  };

  const handleChangePassword: SubmitHandler<ChangePasswordInputs> = async (
    data
  ) => {
    if (!selectedAdminId) return;
    const newPassword = data.newPassword || randomPassword;

    try {
      const response = await sdk.resetPasswordAdmin({
        id: selectedAdminId,
        password: newPassword,
      });
      setIsChangePassModalOpen(false);
      fetchAdmins();
      setToastData({ message: "Password reset successfully", type: "success" });
    } catch (error) {
      console.error("Failed to reset password:", error);
      setToastData({ message: "Failed to reset password", type: "error" });
    }
  };

  const handleChangeRole: SubmitHandler<ChangeRoleInputs> = async (data) => {
    if (!selectedAdminId || !data.role) return;

    try {
      const response = await sdk.ChangeRole({
        id: selectedAdminId,
        role: data.role.value,
      });
      setIsChangeRoleModalOpen(false);
      fetchAdmins();
      setToastData({ message: "Role changed successfully", type: "success" });
    } catch (error) {
      console.error("Failed to change role:", error);
      setToastData({ message: "Failed to change role", type: "error" });
    }
  };

  const handleDeleteAdmin = async () => {
    if (!adminToDelete) return;

    try {
      const response = await sdk.DeleteAdmin({ id: adminToDelete });
      setIsDeleteModalOpen(false);
      setAdminToDelete(null);
      fetchAdmins();
      setToastData({ message: "Admin deleted successfully", type: "success" });
    } catch (error) {
      console.error("Failed to delete admin:", error);
      setToastData({ message: "Failed to delete admin", type: "error" });
    }
  };

  const openDeleteModal = (id: any) => {
    setAdminToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const openChangePassModal = (adminId: string) => {
    setSelectedAdminId(adminId);
    setRandomPassword(generateRandomPassword());
    setValuePass("newPassword", randomPassword);
    setIsChangePassModalOpen(true);
  };

  const handleToggleSwitch = (rowData: {
    status: PlatformStatus;
    _id: string;
  }) => {
    setSelectedAdminId(rowData._id);
    setSelectedAdminStatus(rowData.status);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = async () => {
    setShowConfirmationModal(false);
    try {
      const newStatus: PlatformStatus =
        selectedAdminStatus === PlatformStatus.Blocked
          ? PlatformStatus.Active
          : PlatformStatus.Blocked;
      const response = await sdk.blockAdmin({
        id: selectedAdminId,
        updateStatus: newStatus,
      });
      fetchAdmins();
      setToastData({
        message: `Admin status changed to ${newStatus}`,
        type: "success",
      });
    } catch (error) {
      console.error("Failed to update admin status:", error);
      setToastData({ message: "Failed to update admin status", type: "error" });
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedAdminId(null);
  };

  // const renderSwitch = (rowData: { status: PlatformStatus; _id: string }) => (
  //   <div>
  //     <Switch
  //       onChange={() => handleToggleSwitch(rowData)}
  //       checked={rowData.status !== PlatformStatus.Blocked}
  //       onColor="#162CF1"
  //       onHandleColor="#162CF1"
  //       handleDiameter={20}
  //       uncheckedIcon={false}
  //       checkedIcon={false}
  //       boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
  //       activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
  //       height={12}
  //       width={30}
  //       className="react-switch"
  //     />
  //   </div>
  // );

  const renderSwitch = (rowData: { status: PlatformStatus; _id: string }) => (
    <div>
      <CustomSwitch
        checked={rowData.status !== PlatformStatus.Blocked}
        onChange={() => handleToggleSwitch(rowData)}
        label={`Toggle switch for ${rowData._id}`}
      />
    </div>
  );

  const renderActions = (rowData: { _id: string }) => (
    <div className="flex space-x-3">
      <FaTrash
        className="text-red-500 cursor-pointer"
        onClick={() => openDeleteModal(rowData._id)}
      />
      <FaEdit
        className="text-blue-500 cursor-pointer"
        onClick={() => {
          setSelectedAdminId(rowData._id);
          setIsChangeRoleModalOpen(true);
        }}
      />
      <FaShieldAlt
        className="text-green-500 cursor-pointer"
        onClick={() => openChangePassModal(rowData._id)}
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
    { title: "Actions", dataKey: "_id", render: renderActions },
  ];

  return (
    <div className="container mx-auto px-2">
      {loading && <Loading />}
      <RoopTable
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
      )
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
            <label className="block text-black">Password</label>
            <input
              type="password"
              placeholder="Enter Password..."
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="input input-primary"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
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
            <button className="btn btn-primary">Add Admin</button>
          </div>
        </form>
      </ReusableModal>
      <ReusableModal
        title="Change Password"
        comments="Are you sure you want to change user's password ?"
        isOpen={isChangePassModalOpen}
        onClose={() => setIsChangePassModalOpen(false)}
        width="md"
      >
        <form onSubmit={handleSubmitPass(handleChangePassword)}>
          <div className="mb-4">
            <Controller
              name="newPassword"
              control={controlPass}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter Password..."
                  type="text"
                  className="input input-primary"
                />
              )}
            />
            {errorsPass.newPassword && (
              <p className="text-red-500 text-sm">
                {errorsPass.newPassword.message}
              </p>
            )}
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="btn btn-outlined"
              onClick={(e) => {
                e.preventDefault();
                const newPassword = generateRandomPassword();
                setRandomPassword(newPassword);
                setValuePass("newPassword", newPassword);
              }}
            >
              Generate Password
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSubmitPass(handleChangePassword)}
            >
              Change Password
            </button>
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
            <button className="btn btn-primary">Change Role</button>
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
          <button className="btn btn-primary" onClick={handleConfirmation}>
            Yes
          </button>
        </div>
      </ReusableModal>
      <ReusableModal
        title="Confirm Deletion"
        comments="Are you sure you want to delete this admin?"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        width="md"
      >
        <div className="flex justify-end mt-4">
          <button className="btn btn-primary" onClick={handleDeleteAdmin}>
            Yes
          </button>
        </div>
      </ReusableModal>
    </div>
  );
};

export default Admin;
