import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Select, { SingleValue } from "react-select";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/util/graphqlClient";
import ReusableModal from "@/components/common/modal/modal";
import { AdminInterface, RoleOption, roleOptions } from "./interface";
import { generateRandomPassword } from "@/util/generatePassword";
import { AdminRole } from "@/generated/graphql";

import useGlobalStore from "@/store/global";
import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";

const Admin: React.FC = () => {
  const [members, setMembers] = useState<AdminInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changePass, setChangePassword] = useState("");
  const [randomPassword, setRandomPassword] = useState(
    generateRandomPassword()
  );
  const [role, setRole] = useState<AdminRole | null>(null);
  const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<AdminInterface | null>(
    null
  );
  const { setToastData } = useGlobalStore(); // Import this from where you manage global state

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setChangePassword("");
    setRole(null);
  }, [
    isChangeRoleModalOpen,
    isDeleteModalOpen,
    isChangePassModalOpen,
    isAddModalOpen,
  ]);

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

  useEffect(() => {
    fetchAdmins();
  }, []);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password || !role) {
      setToastData({ message: "Please fill in all fields", type: "error" });
      return false;
    }

    if (!emailRegex.test(email)) {
      setToastData({
        message: "Please enter a valid email address",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleAddAdmin = async () => {
    if (!validateForm()) return;

    try {
      const input = { name, email, password, type: role || "" };
      const response = await sdk.AddAdmin({ input });
      console.log("Admin added successfully:", response);
      setIsAddModalOpen(false);
      fetchAdmins();
      setToastData({ message: "Admin added successfully", type: "success" });
    } catch (error) {
      console.error("Failed to add admin:", error);
      setToastData({ message: "Failed to add admin", type: "error" });
    }
  };

  const handleChangeRole = async () => {
    if (!selectedAdminId || !role) return;

    try {
      const response = await sdk.ChangeRole({
        id: selectedAdminId,
        role: role,
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

  const handleChangePassword = async () => {
    if (!selectedAdminId) return;

    const newPassword = changePass || randomPassword;
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

  const handleDeleteAdmin = async () => {
    if (!adminToDelete) return;

    try {
      const response = await sdk.DeleteAdmin({ id: adminToDelete._id });
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

  const openDeleteModal = (admin: AdminInterface) => {
    setAdminToDelete(admin);
    setIsDeleteModalOpen(true);
  };

  const openChangePassModal = (adminId: string) => {
    setSelectedAdminId(adminId);
    setRandomPassword(generateRandomPassword());
    setIsChangePassModalOpen(true);
  };

  const mainActions = [
    {
      label: "Add Admin",
      onClick: () => setIsAddModalOpen(true),
    },
  ];

  const Actions = [
    {
      label: "Delete",
      onClick: (data: AdminInterface) => openDeleteModal(data),
    },
    {
      label: "Change Password",
      onClick: (data: AdminInterface) => openChangePassModal(data._id),
    },
    {
      label: "Change Role",
      onClick: (data: AdminInterface) => {
        setSelectedAdminId(data._id);
        setIsChangeRoleModalOpen(true);
      },
    },
  ];

  const headings = [
    { title: "Name", dataKey: "name" },
    { title: "Email", dataKey: "email" },
    { title: "Role", dataKey: "type" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
  ];

  return (
    <div className="container mx-auto px-2">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <RoopTable
          data={members}
          itemsPerPage={5}
          actions={Actions}
          csvExport
          fullCsv
          csvFileName="admins_data.csv"
          headings={headings}
          mainActions={mainActions}
          hovered
        />
      )}
      <ReusableModal
        title="Add New Admin"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        width="md"
      >
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleAddAdmin();
          }}
        >
          <div className="mb-4">
            <label className="block text-white">Name</label>
            <input
              type="text"
              placeholder="Enter Name..."
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              className="mt-1 border bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Email</label>
            <input
              value={email}
              placeholder="Enter Email..."
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="mt-1 border bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              placeholder="Enter Password..."
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="mt-1 border bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Role</label>
            <Select
              classNames={{
                placeholder: () => "!text-gray-400",
                control: () =>
                  "!bg-secondary !bg-opacity-30 !border-none !text-sm !rounded-lg !w-full transition duration-150 ease-in-out !shadow-none ",
                menu: () => "z-[100] !bg-[#142D5F]",
                singleValue: () => "!text-white",
                option: (state) =>
                  `!text-sm hover:!bg-white hover:!text-black focus:!bg-transparent ${
                    state.isFocused || state.isSelected ? "!bg-transparent" : ""
                  }`,
              }}
              classNamePrefix="react-select"
              options={roleOptions}
              value={roleOptions.find((option) => option.value === role)}
              onChange={(selectedOption: SingleValue<RoleOption>) =>
                setRole(selectedOption?.value || null)
              }
            />
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
      </ReusableModal>

      <ReusableModal
        title="Change Password"
        isOpen={isChangePassModalOpen}
        onClose={() => setIsChangePassModalOpen(false)}
        width="md"
      >
        <>
          <div className="mb-4">
            <h3 className="font-bold mb-2 text-white">
              Generate or Enter New Password
            </h3>
            <input
              placeholder="Enter Password..."
              type="text"
              value={changePass}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setChangePassword(e.target.value)
              }
              className="mt-1 border bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-end mt-4">
            <CButton
              type={ButtonType.Outlined}
              onClick={() => setChangePassword(generateRandomPassword())}
            >
              Generate Password
            </CButton>

            <CButton
              type={ButtonType.Outlined}
              onClick={() => setIsChangePassModalOpen(false)}
            >
              Cancel
            </CButton>
            <CButton type={ButtonType.Confirm} onClick={handleChangePassword}>
              Change Password
            </CButton>
          </div>
        </>
      </ReusableModal>

      <ReusableModal
        title="Change Admin Role"
        isOpen={isChangeRoleModalOpen}
        onClose={() => setIsChangeRoleModalOpen(false)}
        width="md"
      >
        <div className="mb-4">
          <label className="block text-white">Select Role</label>
          <Select
            classNames={{
              placeholder: () => "!text-gray-400",
              control: () =>
                "!bg-secondary !bg-opacity-30 !border-none !text-sm !rounded-lg !w-full transition duration-150 ease-in-out !shadow-none ",
              menu: () => "z-[100] !bg-[#142D5F]",
              singleValue: () => "!text-white",
              option: (state) =>
                `!text-sm hover:!bg-white hover:!text-black focus:!bg-transparent ${
                  state.isFocused || state.isSelected ? "!bg-transparent" : ""
                }`,
            }}
            classNamePrefix="react-select"
            options={roleOptions}
            value={roleOptions.find((option) => option.value === role)}
            onChange={(selectedOption: SingleValue<RoleOption>) =>
              setRole(selectedOption?.value || null)
            }
          />
        </div>
        <div className="flex justify-end mt-4">
          <CButton
            type={ButtonType.Primary}
            onClick={() => setIsChangeRoleModalOpen(false)}
          >
            Cancel
          </CButton>
          <CButton type={ButtonType.Primary} onClick={handleChangeRole}>
            Change Role
          </CButton>
        </div>
      </ReusableModal>
      <ReusableModal
        title="Confirm Deletion"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        width="md"
      >
        <p className="text-white mb-4">
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
