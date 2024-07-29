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
    <div className="w-full mx-auto p-2">
      <div className="h-auto [perspective:1000px] relative flex flex-col mx-auto w-full items-start justify-start">
        <Tabs
          activeTabClassName="text-white"
          tabClassName="text-black"
          tabs={tabs}
        />
      </div>
    </div>
  );
}
