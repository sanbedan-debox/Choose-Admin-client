import React, { useEffect, useState } from "react";
import Select from "react-select";
import RoopTable from "@/components/common/customTableR/table";
import Heading from "@/components/common/heading/Heading";
import { sdk } from "@/util/graphqlClient";
import useGlobalStore from "@/store/global";
import ReusableModal from "@/components/common/modal/modal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export enum AdminRole {
  Admin = "admin",
  Master = "master",
  Normal = "normal",
}

const Admin: React.FC = () => {
  const { setModalOpen, setModalData } = useGlobalStore((state) => ({
    setModalOpen: state.setModalOpen,
    setModalData: state.setModalData,
  }));
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AdminRole | null>(null);

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
      const input = { name, email, password, type: role?.value || "" };
      const response = await sdk.AddAdmin({ input });
      console.log("Admin added successfully:", response);
      setIsModalOpen(false);
      fetchAdmins();
    } catch (error) {
      console.error("Failed to add admin:", error);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this admin?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await sdk.DeleteAdmin({ id });
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

  const mainActions = [
    {
      label: "Add Admin",
      onClick: () => setIsModalOpen(true),
    },
  ];

  const actions = [
    {
      label: "Delete",
      onClick: (_id: string) => handleDeleteAdmin(_id),
    },
    {
      label: "Reset Password",
      onClick: (_id: string) => {
        alert(`Reset password for member ID: ${_id}`);
      },
    },
    {
      label: "Change Role",
      onClick: (_id: string) => {
        alert(`Role Changed for member ID: ${_id}`);
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

  const roleOptions = [
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="md"
      >
        <h2 className="text-xl font-bold mb-4 text-white">Add New Admin</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddAdmin();
          }}
        >
          <div className="mb-4">
            <label className="block text-white">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
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
              value={roleOptions.find((option) => option.value === role?.value)}
              onChange={(selectedOption) => setRole(selectedOption || null)}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Admin
            </button>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default Admin;
