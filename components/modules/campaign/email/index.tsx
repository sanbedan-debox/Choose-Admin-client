"use client";

import { Tabs } from "@/components/common/tabs/tabs";
import EmailTemplate from "./tabs/EmailTemplate";
import EmailCampaign from "./tabs/EmailCampaigns";

export function Emails() {
  const tabs = [
    {
      title: "Campaign",
      value: "campaign",
      content: (
        <div className="bg-white rounded-md">
          <EmailCampaign />
        </div>
      ),
    },
    {
      title: "Email Template",
      value: "emailTemplate",
      content: (
        <div className="bg-white rounded-md">
          <EmailTemplate />
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto ">
      <div className="h-[20rem] md:h-[35rem] [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full  items-start justify-start  ">
        <Tabs
          activeTabClassName="text-white"
          tabClassName="text-black"
          tabs={tabs}
        />
      </div>
    </div>
  );
}
