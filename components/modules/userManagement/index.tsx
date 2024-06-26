import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table"; // Adjust path as per your project structure
import { sdk } from "@/util/graphqlClient"; // Adjust path as per your project structure
import { FaEdit, FaTrash } from "react-icons/fa";

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
        setRestaurantUsers(response.getAllRestaurantUsers);
      }
    } catch (error) {
      console.error("Failed to fetch restaurant users:", error);
    } finally {
      setLoading(false);
    }
  };

  const headings = [
    { title: "Name", dataKey: "name" },
    { title: "Email", dataKey: "email" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    { title: "Status", dataKey: "status" },
  ];

  return (
    <div className="container mx-auto px-2">
      <RoopTable
        data={restaurantUsers}
        itemsPerPage={5}
        headings={headings}
        hovered
        csvExport
        filterable
      />
    </div>
  );
};

export default Reports;
