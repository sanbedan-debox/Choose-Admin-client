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
import ReusableModal from "@/components/common/modal/modal";
import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";

const formatCategoryArray = (categories: string[]): string => {
  let arr = [];
  for (let i = 0; i < categories.length; i++) {
    const cate = categories[i];
    switch (cate) {
      case "CloudKitchen":
        arr.push("Cloud Kitchen");
        break;
      case "DineIn":
        arr.push("Dine-In");
        break;
      case "PremiumDineIn":
        arr.push("Premium Dine-In");
        break;
      case "QSR":
        arr.push("QSR");
        break;
      case "Takeout":
        arr.push("Takeout");
        break;

      default:
        break;
    }
  }
  return arr.join(", ");
};

const formatFoodTypeArray = (foodTypes: string[]): string => {
  let arr = [];
  for (let i = 0; i < foodTypes.length; i++) {
    const item = foodTypes[i];
    switch (item) {
      case "NonVegetarian":
        arr.push("Non-Vegetarian");
        break;
      case "Vegetarian":
        arr.push("Vegetarian");
        break;
      case "Vegan":
        arr.push("Vegan");
        break;

      default:
        break;
    }
  }
  return arr.join(", ");
};

const Reports: React.FC = () => {
  const { isLoading, setLoading } = useGlobalLoaderStore();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("");
  const [btnLoading, setBtnLoading] = useState(false);
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
    setShowConfirmationModal(true);
    setSelectedRestaurantId(rowData._id);
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

  const handleConfirmation = async () => {
    setShowConfirmationModal(false);
    try {
      setBtnLoading(true);
      const response = await sdk.changeRestaurantStatus({
        id: selectedRestaurantId,
      });
      if (response && response.changeRestaurantStatus) {
        setCounter((prev) => prev + 1);
      }
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedRestaurantId("");
  };

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
      render: (rowData: { category: string[] }) => {
        return <p>{formatCategoryArray(rowData.category)}</p>;
      },
    },
    {
      title: "Restaurant Type",
      dataKey: "type",
    },
    {
      title: "Food Type",
      dataKey: "foodType",
      render: (rowData: { foodType: string[] }) => {
        return <p>{formatFoodTypeArray(rowData.foodType)}</p>;
      },
    },
    { title: "Meat Type", dataKey: "meatType" },
    { title: "Address", dataKey: "address.place.displayName" },
    { title: "City", dataKey: "address.city.value" },
    { title: "State", dataKey: "address.state.value" },
    { title: "Timezone", dataKey: "timezone.value" },
    { title: "Zipcode", dataKey: "address.postcode.value" },
  ];
  return (
    <div className="w-full mx-auto px-2">
      <ReusableModal
        isOpen={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        title="Are you sure ?"
        comments="Are you sure you want to update the selected restaurant's status?"
      >
        <div className="flex justify-end space-x-4">
          <CButton
            loading={btnLoading}
            variant={ButtonType.Primary}
            onClick={handleConfirmation}
          >
            Yes
          </CButton>
        </div>
      </ReusableModal>
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
