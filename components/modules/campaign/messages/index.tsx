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
        <div className="bg-white rounded-md">
          <MssgCampaign />
        </div>
      ),
    },
    {
      title: "Message Template",
      value: "messageTemplate",
      content: (
        <div className="bg-white max-w-7xl rounded-md">
          <MssgTemplate />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full mx-auto px-2">
      <div className="h-[20rem] md:h-[35rem] [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full  items-start justify-start ">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
