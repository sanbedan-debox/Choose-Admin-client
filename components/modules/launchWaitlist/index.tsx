import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/util/graphqlClient";
import { WaitlistInterface } from "./interface";
import useGlobalLoaderStore from "@/store/loader";
import useCampaignStore from "@/store/campaign";
import Loading from "@/components/common/Loader/Loader";
import useGlobalStore from "@/store/global";

const Admin: React.FC = () => {
  const [waitListUsers, setWaitListUsers] = useState<any>([]);
  const { isLoading, setLoading } = useGlobalLoaderStore();
  const { setSelectedModule } = useGlobalStore();
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
      label: "Create Email Campaign",
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
        mainActions={waitListUsers.length > 0 ? mainActions : undefined}
      />
    </div>
  );
};

export default Admin;
