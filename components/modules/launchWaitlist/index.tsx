import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/util/graphqlClient";

import { WaitlistInterface } from "./interface";

const Admin: React.FC = () => {
  const [waitListUsers, setWaitListUsers] = useState<WaitlistInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWaitListUsers();
  }, []);

  const fetchWaitListUsers = async () => {
    setLoading(true);
    try {
      const response = await sdk.GetWaitListUsers();
      if (response && response.getWaitListUsers) {
        setWaitListUsers(response.getWaitListUsers);
      }
    } catch (error) {
      console.error("Failed to fetch admin details:", error);
    } finally {
      setLoading(false);
    }
  };

  const headings = [
    { title: "Name", dataKey: "name" },
    { title: "Email", dataKey: "email" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
  ];

  return (
    <div className="container mx-auto px-2">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <RoopTable
          data={waitListUsers}
          itemsPerPage={5}
          csvExport
          fullCsv
          csvFileName="admins_data.csv"
          headings={headings}
          hovered
        />
      )}
    </div>
  );
};

export default Admin;
