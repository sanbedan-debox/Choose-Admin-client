// src/pages/Reports.tsx
import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table"; // Adjust path as per your project structure
import { sdk } from "@/util/graphqlClient"; // Adjust path as per your project structure
import Switch from "react-switch";
import useGlobalLoaderStore from "@/store/loader";
import Loading from "@/components/common/Loader/Loader";
import CustomSwitch from "@/components/common/customSwitch/customSwitch";
import { PlatformStatus } from "@/generated/graphql";
import { extractErrorMessage, getClickableUrlLink } from "@/util/utils";
import useGlobalStore from "@/store/global";
import Link from "next/link";

const Reports: React.FC = () => {
  const { isLoading, setLoading } = useGlobalLoaderStore();
  const [restaurants, setRestaurants] = React.useState<any[]>([]);
  const [counter, setCounter] = useState(0);
  const { setToastData } = useGlobalStore();

  React.useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const response = await sdk.GetAllRestaurants();
        if (response && response.getAllRestaurants) {
          setRestaurants(response.getAllRestaurants);
        }
      } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        setToastData({
          type: "error",
          message: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [setLoading, counter]);

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

  // const headings = [
  //   { title: "Toggle Status", dataKey: "rowData", render: renderSwitch },
  //   { title: "id", dataKey: "_id" },
  //   { title: "status", dataKey: "status" },
  // ];

  const headings = [
    { title: "Toggle Status", dataKey: "status", render: renderSwitch },
    { title: "Status", dataKey: "status" },
    { title: "Name", dataKey: "name.value" },
    {
      title: "Website",
      dataKey: "website",
      render: (rowData: { website: string }) => {
        rowData.website = rowData.website ? rowData.website : "";

        return (
          <Link
            className="text-primary"
            href={getClickableUrlLink(rowData.website)}
            target="_blank"
          >
            {rowData.website}
          </Link>
        );
      },
    },
    {
      title: "Category",
      dataKey: "category",
      render: (rowData: { category: [] }) => {
        return <div>{rowData.category.join(", ")}</div>;
      },
    },
    {
      title: "Restaurant Type",
      dataKey: "type",
    },
    { title: "Food Type", dataKey: "foodType" },
    { title: "Meat Type", dataKey: "meatType" },
    { title: "Address", dataKey: "address.place.displayName" },
    { title: "City", dataKey: "address.city.value" },
    // { title: "State", dataKey: "address.state.value" },
    { title: "Zipcode", dataKey: "address.postcode.value" },
  ];
  return (
    <div className="container mx-auto px-2">
      <RoopTable
        loading={isLoading}
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
