import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/util/graphqlClient";
import { WaitlistInterface } from "./interface";
import useGlobalLoaderStore from "@/store/loader"; // Adjust path as per your project structure
import useCampaignStore from "@/store/campaign"; // Adjust path as per your project structure
import Loading from "@/components/common/Loader/Loader"; // Adjust path as per your project structure
import useGlobalStore from "@/store/global";

const Admin: React.FC = () => {
  const [waitListUsers, setWaitListUsers] = useState<WaitlistInterface[]>([]);
  const { isLoading, setLoading } = useGlobalLoaderStore(); // Zustand hook for loading state
  const { setSelectedModule } = useGlobalStore(); // Adjust according to your global store usage
  const { setCreateEmailCampaignModalOpen, setselectedTargetValue } =
    useCampaignStore(); // Adjust according to your campaign store usage

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
      {isLoading && <Loading />}
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
    </div>
  );
};

export default Admin;
