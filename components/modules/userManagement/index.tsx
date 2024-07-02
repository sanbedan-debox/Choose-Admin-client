import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/util/graphqlClient";
import Switch from "react-switch";
import useGlobalLoaderStore from "@/store/loader";
import Loading from "@/components/common/Loader/Loader";
import ReusableModal from "@/components/common/modal/modal"; // Import your reusable modal

const Reports: React.FC = () => {
  const [restaurantUsers, setRestaurantUsers] = useState<any[]>([]);
  const { isLoading, setLoading } = useGlobalLoaderStore();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userIdToBlock, setUserIdToBlock] = useState<string>("");

  useEffect(() => {
    fetchRestaurantUsers();
  }, []);

  const fetchRestaurantUsers = async () => {
    setLoading(true);
    try {
      const response = await sdk.GetAllRestaurantUsers();
      if (response && response.getAllRestaurantUsers) {
        const formattedUsers = response.getAllRestaurantUsers.map((user) => ({
          ...user,
          createdAt: formatDate(user.createdAt),
          updatedAt: formatDate(user.updatedAt),
        }));
        setRestaurantUsers(formattedUsers);
      }
    } catch (error) {
      console.error("Failed to fetch restaurant users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSwitch = (rowData: { status: string; _id: string }) => {
    setShowConfirmationModal(true);
    setUserIdToBlock(rowData._id);
  };

  const handleConfirmation = async () => {
    setShowConfirmationModal(false);
    try {
      const response = await sdk.changeUserStatus({ id: userIdToBlock });
      if (response && response.changeUserStatus) {
        fetchRestaurantUsers();
      }
    } catch (error) {
      console.error("Failed to change user status:", error);
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setUserIdToBlock("");
  };

  const renderSwitch = (rowData: { status: string; _id: string }) => (
    <Switch
      onChange={() => handleToggleSwitch(rowData)}
      checked={rowData.status !== "blocked"}
      onColor="#162CF1"
      onHandleColor="#162CF1"
      handleDiameter={20}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      height={12}
      width={30}
      className="react-switch"
      id="material-switch"
    />
  );

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

  const headings = [
    { title: "Toggle Status", dataKey: "status", render: renderSwitch },
    { title: "First Name", dataKey: "firstName" },
    { title: "Email", dataKey: "email" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    { title: "Status", dataKey: "status" },
  ];

  return (
    <div className="container mx-auto px-2">
      {isLoading && <Loading />}
      <RoopTable
        data={restaurantUsers}
        itemsPerPage={10}
        headings={headings}
        hovered
        csvExport
        filterable
      />

      {/* Confirmation Modal */}
      <ReusableModal
        isOpen={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        title="Are you sure you want to block the user?"
      >
        <div className="flex justify-end space-x-4">
          <button
            className="btn btn-outlined-confirmation"
            onClick={handleConfirmation}
          >
            Yes
          </button>
        </div>
      </ReusableModal>
    </div>
  );
};

export default Reports;
