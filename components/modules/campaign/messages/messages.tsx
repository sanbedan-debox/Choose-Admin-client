"use client";

import { Tabs } from "@/components/common/tabs/tabs";
import MssgCampaign from "./tabs/MssgCampaigns";
import MssgTemplate from "./tabs/MssgTemplates";

export function Message() {
  const tabs = [
    {
      title: "Campaign",
      value: "campaign",
      content: (
        <div className="bg-black">
          <MssgCampaign />
        </div>
      ),
    },
    {
      title: "Email Template",
      value: "emailTemplate",
      content: (
        <div className="bg-black max-w-7xl">
          <MssgTemplate />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[35rem] [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full  items-start justify-start mt-5">
      <Tabs tabs={tabs} />
    </div>
  );
}
