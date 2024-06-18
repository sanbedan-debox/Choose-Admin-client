import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Select, { SingleValue } from "react-select";
import RoopTable from "@/components/common/customTableR/table";
import Heading from "@/components/common/heading/Heading";
import { sdk } from "@/util/graphqlClient";
import ReusableModal from "@/components/common/modal/modal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import RoundedButton from "@/components/common/button/RoundedButton";
import { AdminInterface, AdminRole, RoleOption } from "./interface";
import { generateRandomPassword } from "@/util/generatePassword";

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

  const handleAddAdmin = async () => {
    try {
      const input = { name, email, password, type: role || "" };
      const response = await sdk.AddAdmin({ input });
      console.log("Admin added successfully:", response);
      setIsAddModalOpen(false);
      fetchAdmins();
    } catch (error) {
      console.error("Failed to add admin:", error);
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
    } catch (error) {
      console.error("Failed to change role:", error);
      setIsChangeRoleModalOpen(false);
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
    } catch (error) {
      console.error("Failed to reset password:", error);
    }
  };

  const handleDeleteAdmin = async (admin: AdminInterface) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this admin?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await sdk.DeleteAdmin({ id: admin._id });
              console.log("Admin deleted successfully:", response);
              fetchAdmins();
            } catch (error) {
              console.error("Failed to delete admin:", error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
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

  const actions = [
    {
      label: "Delete",
      onClick: (member: AdminInterface) => handleDeleteAdmin(member),
    },
    {
      label: "Reset Password",
      onClick: (member: AdminInterface) => openChangePassModal(member._id),
    },
    {
      label: "Change Role",
      onClick: (member: AdminInterface) => {
        setSelectedAdminId(member._id);
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
    { title: "ID", dataKey: "_id" },
  ];

  const roleOptions: RoleOption[] = [
    { value: AdminRole.Admin, label: "Admin" },
    { value: AdminRole.Master, label: "Master" },
    { value: AdminRole.Normal, label: "Normal" },
  ];

  return (
    <div className="container mx-auto px-2">
      <Heading highlight="Admin Panel" />
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <RoopTable
          data={members}
          itemsPerPage={5}
          actions={actions}
          csvExport
          fullCsv
          csvFileName="admins_data.csv"
          headings={headings}
          mainActions={mainActions}
          hovered
        />
      )}
      <ReusableModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        width="md"
      >
        <h2 className="text-xl font-bold mb-4 text-white">Add New Admin</h2>
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
              type="email"
              value={email}
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
            <RoundedButton
              type="button"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </RoundedButton>
            <RoundedButton type="submit">Add Admin</RoundedButton>
          </div>
        </form>
      </ReusableModal>
      <ReusableModal
        isOpen={isChangePassModalOpen}
        onClose={() => setIsChangePassModalOpen(false)}
        width="lg"
      >
        <>
          <h2 className="text-xl font-bold mb-4 text-white">Change Password</h2>
          <div className="flex justify-between items-center">
            <div className="w-1/2 flex flex-col bg-secondary bg-opacity-30 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">
                Randomly Generated Password
              </h3>
              <p className="text-white break-words">{randomPassword}</p>
            </div>
            <div className="w-px h-full bg-white mx-4"></div>
            <div className="w-1/2 flex flex-col">
              <h3 className="text-lg font-bold mb-2 text-white">
                Enter Your Desired Password
              </h3>
              <form
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  handleChangePassword();
                }}
              >
                <div className="mb-4">
                  <label className="block text-white">Password</label>
                  <input
                    type="password"
                    value={changePass}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setChangePassword(e.target.value)
                    }
                    className="mt-1 border bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <RoundedButton
                    type="button"
                    onClick={() => setIsChangePassModalOpen(false)}
                  >
                    Cancel
                  </RoundedButton>
                  <RoundedButton type="submit">Change Password</RoundedButton>
                </div>
              </form>
            </div>
          </div>
        </>
      </ReusableModal>
      <ReusableModal
        isOpen={isChangeRoleModalOpen}
        onClose={() => setIsChangeRoleModalOpen(false)}
        width="md"
      >
        <h2 className="text-xl font-bold mb-4 text-white">Change Admin Role</h2>
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
          <RoundedButton
            type="button"
            onClick={() => setIsChangeRoleModalOpen(false)}
          >
            Cancel
          </RoundedButton>
          <RoundedButton type="button" onClick={handleChangeRole}>
            Change Role
          </RoundedButton>
        </div>
      </ReusableModal>
    </div>
  );
};

export default Admin;
