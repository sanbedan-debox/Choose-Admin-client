import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/util/graphqlClient";

import { WaitlistInterface } from "./interface";
import useGlobalStore from "@/store/global";
import useCampaignStore from "@/store/campaign";

const Admin: React.FC = () => {
  const [waitListUsers, setWaitListUsers] = useState<WaitlistInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedModule, setSelectedModule } = useGlobalStore();
  const { setCreateEmailCampaignModalOpen, setselectedTargetValue } =
    useCampaignStore();

  useEffect(() => {
    fetchWaitListUsers();
  }, []);

  const handleCreateCampaign = () => {
    setSelectedModule("Emails");
    setCreateEmailCampaignModalOpen(true);
    setselectedTargetValue("waitlistUsers");
  };

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
  const mainActions = [
    {
      label: "Create",
      onClick: handleCreateCampaign,
    },
  ];
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
          itemsPerPage={10}
          csvExport
          fullCsv
          csvFileName="admins_data.csv"
          headings={headings}
          hovered
          mainActions={mainActions}
        />
      )}
    </div>
  );
};

export default Admin;
