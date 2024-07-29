import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import { sdk } from "@/util/graphqlClient";
import useGlobalLoaderStore from "@/store/loader";
import useCampaignStore from "@/store/campaign";
import Loading from "@/components/common/Loader/Loader";
import useGlobalStore from "@/store/global";
import {
  extractErrorMessage,
  formatDateString,
  getClickableUrlLink,
} from "@/util/utils";
import Link from "next/link";
import { WaitlistInterface } from "./interface";

const Admin: React.FC = () => {
  const [waitListUsers, setWaitListUsers] = useState<WaitlistInterface[]>([]);
  const { isLoading, setLoading } = useGlobalLoaderStore();
  const { setSelectedModule, setToastData } = useGlobalStore();
  const { setCreateEmailCampaignModalOpen, setselectedTargetValue } =
    useCampaignStore();

  useEffect(() => {
    const fetchWaitListUsers = async () => {
      setLoading(true);
      try {
        const response = await sdk.GetWaitListUsers();
        if (response && response.getWaitListUsers) {
          setWaitListUsers(
            response.getWaitListUsers.map((el) => ({
              _id: el._id ?? "",
              createdAt: formatDateString(el.createdAt ?? ""),
              email: el.email ?? "",
              name: el.name ?? "",
              number: el.number,
              restaurantName: el.restaurantName ?? "",
              software: el.software ?? "",
              website: el.website ?? "",
            }))
          );
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

    fetchWaitListUsers();
  }, [setLoading]);

  const handleCreateCampaign = () => {
    setSelectedModule("Emails");
    setCreateEmailCampaignModalOpen(true);
    setselectedTargetValue("waitlistUsers");
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
    { title: "Mobile", dataKey: "number" },
    { title: "Restaurant", dataKey: "restaurantName" },
    {
      title: "Website",
      dataKey: "website",
      render: (data: WaitlistInterface) => {
        return (
          <Link
            className="text-primary"
            href={getClickableUrlLink(data.website)}
            target="_blank"
          >
            {data.website}
          </Link>
        );
      },
    },
    { title: "Software", dataKey: "software" },
    { title: "Created At", dataKey: "createdAt" },
  ];

  return (
    <div className="w-full mx-auto px-2">
      <RoopTable
        loading={isLoading}
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
