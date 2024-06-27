import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
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
import Switch from "react-switch"; // Import react-switch component

const Admin: React.FC = () => {
  const [members, setMembers] = useState<AdminInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<
    string | number | null
  >(null);
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
        setMembers(response.getAdmins);
      }
    } catch (error) {
      console.error("Failed to fetch admin details:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleAddAdmin: SubmitHandler<AddAdminFormInputs> = async (data) => {
  //   try {
  //     const input = {
  //       name: data.name,
  //       email: data.email,
  //       password: data.password,
  //       type: data.role?.value || "",
  //     };
  //     const response = await sdk.AddAdmin({ input });
  //     console.log("Admin added successfully:", response);
  //     setIsAddModalOpen(false);
  //     fetchAdmins();
  //     setToastData({ message: "Admin added successfully", type: "success" });
  //   } catch (error) {
  //     console.error("Failed to add admin:", error);
  //     setToastData({ message: "Failed to add admin", type: "error" });
  //   }
  // };

  const handleChangePassword: SubmitHandler<ChangePasswordInputs> = async (
    data
  ) => {
    if (!selectedAdminId) return;
    const newPassword = data.newPassword || randomPassword;

    try {
      const response = await sdk.ResetPasswordAdmin({
        id: selectedAdminId,
        password: newPassword,
      });
      console.log("Password reset successfully:", response);
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
      console.log("Role changed successfully:", response);
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
      console.log("Admin deleted successfully:", response);
      setIsDeleteModalOpen(false);
      setAdminToDelete(null);
      fetchAdmins();
      setToastData({ message: "Admin deleted successfully", type: "success" });
    } catch (error) {
      console.error("Failed to delete admin:", error);
      setToastData({ message: "Failed to delete admin", type: "error" });
    }
  };

  const openDeleteModal = (id) => {
    setAdminToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const openChangePassModal = (adminId: string) => {
    setSelectedAdminId(adminId);
    setRandomPassword(generateRandomPassword());
    setValuePass("newPassword", randomPassword);
    setIsChangePassModalOpen(true);
  };

  const renderSwitch = (_id) => (
    <div className="">
      <Switch
        onChange={() => console.log(_id)}
        checked={true} // Replace with actual status from your data
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        handleDiameter={20}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={12}
        width={30}
        className="react-switch"
        // id={`status-switch-${admin._id}`}
      />
    </div>
  );

  const renderActions = (_id) => (
    <div className="flex space-x-2">
      <FaTrash
        className="text-red-500 cursor-pointer"
        onClick={() => openDeleteModal(_id)}
      />
      <FaEdit
        className="text-blue-500 cursor-pointer"
        // onClick={() => openChangeRoleModal(rowData._id)}
        onClick={() => {
          setSelectedAdminId(_id);
          console.log(selectedAdminId);
          setIsChangeRoleModalOpen(true);
        }}
      />
      <FaShieldAlt
        className="text-green-500 cursor-pointer"
        onClick={() => openChangePassModal(_id)}
      />
    </div>
  );

  // const mainActions = [
  //   {
  //     label: "Add Admin",
  //     onClick: () => setIsAddModalOpen(true),
  //   },
  // ];

  const headings = [
    { title: "Toggle Status", dataKey: "_id", render: renderSwitch },
    { title: "Name", dataKey: "name" },
    { title: "Email", dataKey: "email" },
    { title: "Role", dataKey: "role" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    { title: "Actions", dataKey: "_id", render: renderActions },
  ];

  return (
    <div className="container mx-auto px-2">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <RoopTable
          data={members}
          itemsPerPage={5}
          csvExport
          fullCsv
          csvFileName="admins_data.csv"
          headings={headings}
          hovered
        />
      )}
      {/* <ReusableModal
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
              className="mt-1 border bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-black focus:ring-primary-500 focus:border-transparent"
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
              className="mt-1 border bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-black focus:ring-primary-500 focus:border-transparent"
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
              className="mt-1 border bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-black focus:ring-primary-500 focus:border-transparent"
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
                  classNames={{
                    placeholder: () => "!text-gray-400",
                    control: () =>
                      "!bg-secondary !bg-opacity-30 !border-none !text-sm !rounded-lg !w-full transition duration-150 ease-in-out !shadow-none",
                    menu: () => "z-[100] !bg-[#142D5F]",
                    singleValue: () => "!text-black",
                    option: (state) =>
                      `!text-sm hover:!bg-white hover:!text-black focus:!bg-transparent ${
                        state.isFocused || state.isSelected
                          ? "!bg-transparent"
                          : ""
                      }`,
                  }}
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
            <CButton
              type={ButtonType.Outlined}
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </CButton>
            <CButton type={ButtonType.Confirm}>Add Admin</CButton>
          </div>
        </form>
      </ReusableModal> */}

      <ReusableModal
        title="Change Password"
        isOpen={isChangePassModalOpen}
        onClose={() => setIsChangePassModalOpen(false)}
        width="md"
      >
        <form onSubmit={handleSubmitPass(handleChangePassword)}>
          <div className="mb-4">
            <h3 className="font-bold mb-2 text-black">
              Generate or Enter New Password
            </h3>
            <Controller
              name="newPassword"
              control={controlPass}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter Password..."
                  type="text"
                  className="mt-1  bg-[#EFEFEF] text-sm rounded-lg w-full focus:outline-none block p-2.5  placeholder-gray-400 text-black "
                />
              )}
            />
            {errorsPass.newPassword && (
              <p className="text-red-500 text-sm">
                {errorsPass.newPassword.message}
              </p>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <CButton
              type={ButtonType.Outlined}
              onClick={(e) => {
                e.preventDefault();
                const newPassword = generateRandomPassword();
                setRandomPassword(newPassword);
                setValuePass("newPassword", newPassword);
              }}
            >
              Generate Password
            </CButton>
            <CButton
              type={ButtonType.Warning}
              onClick={() => setIsChangePassModalOpen(false)}
            >
              Cancel
            </CButton>
            <CButton
              type={ButtonType.Confirm}
              onClick={handleSubmitPass(handleChangePassword)}
            >
              Change Password
            </CButton>
          </div>
        </form>
      </ReusableModal>

      <ReusableModal
        title="Change Admin Role"
        isOpen={isChangeRoleModalOpen}
        onClose={() => setIsChangeRoleModalOpen(false)}
        width="md"
      >
        <form onSubmit={handleSubmitRole(handleChangeRole)}>
          <div className="mb-4">
            <label className="block text-black">Select Role</label>
            <Controller
              name="role"
              control={controlRole}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={roleOptions}
                  classNames={{
                    placeholder: () => "!text-gray-400",
                    control: () =>
                      "!bg-input !border-none !text-sm !rounded-lg !w-full transition duration-150 ease-in-out !shadow-none",
                    menu: () => "z-[100] !bg-white text-black",
                    singleValue: () => "!text-black",
                    option: (state) =>
                      `!text-sm hover:!bg-primary hover:!text-white  focus:!bg-transparent ${
                        state.isFocused || state.isSelected
                          ? "!bg-transparent !text-black"
                          : ""
                      }`,
                  }}
                  classNamePrefix="react-select"
                  placeholder="Select Role"
                />
              )}
            />
            {errorsRole.role && (
              <p className="text-red-500 text-sm">{errorsRole.role.message}</p>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <CButton
              type={ButtonType.Warning}
              onClick={() => setIsChangeRoleModalOpen(false)}
            >
              Cancel
            </CButton>
            <CButton type={ButtonType.Confirm}>Change Role</CButton>
          </div>
        </form>
      </ReusableModal>

      <ReusableModal
        title="Confirm Deletion"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        width="md"
      >
        <p className="text-black mb-4">
          Are you sure you want to delete this admin?
        </p>
        <div className="flex justify-end mt-4">
          <CButton
            type={ButtonType.Outlined}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            No
          </CButton>
          <CButton type={ButtonType.Warning} onClick={handleDeleteAdmin}>
            Yes
          </CButton>
        </div>
      </ReusableModal>
    </div>
  );
};

export default Admin;
