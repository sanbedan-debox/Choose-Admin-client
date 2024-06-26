import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table"; // Adjust path as per your project structure
import { sdk } from "@/util/graphqlClient"; // Adjust path as per your project structure
import Switch from "react-switch";

const Reports: React.FC = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const response = await sdk.GetAllRestaurants();
      if (response && response.getAllRestaurants) {
        setRestaurants(response.getAllRestaurants);
      }
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = (rowData: { status: string; _id: string }) => {
    console.log(`Toggling status for ID: ${rowData.status} ${rowData._id}`);
  };

  const renderActions = (rowData: { status: string; _id: string }) => (
    <Switch
      onChange={() => toggleStatus(rowData)}
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

  const headings = [
    { title: "Toggle Status", dataKey: "rowData", render: renderActions },
    { title: "id", dataKey: "_id" },
    { title: "status", dataKey: "status" },
  ];

  return (
    <div className="container mx-auto px-2">
      <RoopTable
        data={restaurants}
        itemsPerPage={10}
        headings={headings}
        hovered
        csvExport
        filterable
      />
    </div>
  );
};

export default Reports;
