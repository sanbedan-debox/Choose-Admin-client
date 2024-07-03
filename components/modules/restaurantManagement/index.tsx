// src/pages/Reports.tsx
import React, { useEffect } from "react";
import RoopTable from "@/components/common/customTableR/table"; // Adjust path as per your project structure
import { sdk } from "@/util/graphqlClient"; // Adjust path as per your project structure
import Switch from "react-switch";
import useGlobalLoaderStore from "@/store/loader";
import Loading from "@/components/common/Loader/Loader";
import CustomSwitch from "@/components/common/customSwitch/customSwitch";
import { PlatformStatus } from "@/generated/graphql";

const Reports: React.FC = () => {
  const { isLoading, setLoading } = useGlobalLoaderStore();
  const [restaurants, setRestaurants] = React.useState<any[]>([]);

  React.useEffect(() => {
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

  const renderSwitch = (rowData: { status: PlatformStatus; _id: string }) => (
    <div>
      <CustomSwitch
        checked={rowData.status !== PlatformStatus.Blocked}
        onChange={() => toggleStatus(rowData)}
        label={`Toggle switch for ${rowData._id}`}
      />
    </div>
  );

  const headings = [
    { title: "Toggle Status", dataKey: "rowData", render: renderSwitch },
    { title: "id", dataKey: "_id" },
    { title: "status", dataKey: "status" },
  ];

  return (
    <div className="container mx-auto px-2">
      {isLoading && <Loading />}

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
