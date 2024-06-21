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
      title: "Message Template",
      value: "messageTemplate",
      content: (
        <div className="bg-black max-w-7xl">
          <MssgTemplate />
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-2">
      <div className="h-[20rem] md:h-[35rem] [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full  items-start justify-start ">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
