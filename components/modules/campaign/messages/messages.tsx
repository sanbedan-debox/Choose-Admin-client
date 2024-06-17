"use client";

import { Tabs } from "@/components/common/tabs/tabs";
import MssgCampaign from "./tabs/MssgCampaigns";
import MssgTemplate from "./tabs/MssgTemplates";
import Heading from "@/components/common/Headings/Heading";

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
      <Heading highlight="Messages" />
      <div className="h-[20rem] md:h-[35rem] [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full  items-start justify-start mt-5">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
