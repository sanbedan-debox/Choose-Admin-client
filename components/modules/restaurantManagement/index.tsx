import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table"; // Adjust path as per your project structure
import { sdk } from "@/util/graphqlClient"; // Adjust path as per your project structure

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

  const headings = [
    { title: "id", dataKey: "_id" },
    // { title: "Address", dataKey: "address.value" },
    // { title: "Status", dataKey: "status" },
    // { title: "State", dataKey: "state.value" },
    // { title: "City", dataKey: "city.value" },
    // {
    //   title: "Restaurant User",
    //   dataKey: "restaurantUser",
    //   render: (restaurantUser: any) => (
    //     <div>
    //       <div>{restaurantUser.name}</div>
    //       <div>{restaurantUser.email}</div>
    //       <div>{restaurantUser.phone}</div>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="container mx-auto px-2">
      <RoopTable
        data={restaurants}
        itemsPerPage={10}
        headings={headings}
        hovered
        csvExport
      />
    </div>
  );
};

export default Reports;
