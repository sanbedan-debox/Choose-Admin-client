import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/util/graphqlClient";
import Switch from "react-switch";

const Reports: React.FC = () => {
  const [restaurantUsers, setRestaurantUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleStatusChange = async (id: string) => {
    try {
      const response = await sdk.changeUserStatus({ id });
      if (response && response.changeUserStatus) {
        fetchRestaurantUsers();
      }
    } catch (error) {
      console.error("Failed to change user status:", error);
    }
  };

  const renderSwitch = (rowData: { status: string; _id: string }) => (
    <Switch
      onChange={() => handleStatusChange(rowData._id)}
      checked={rowData.status !== "blocked"}
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
      {loading ? (
        <div className="flex items-center justify-center h-64 text-black text-2xl">
          Loading...
        </div>
      ) : (
        <RoopTable
          data={restaurantUsers}
          itemsPerPage={10}
          headings={headings}
          hovered
          csvExport
          filterable
        />
      )}
    </div>
  );
};

export default Reports;
