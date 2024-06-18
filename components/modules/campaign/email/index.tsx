"use client";

import { Tabs } from "@/components/common/tabs/tabs";
import EmailTemplate from "./tabs/EmailTemplate";
import EmailCampaign from "./tabs/EmailCampaigns";
import Heading from "@/components/common/heading/Heading";

export function Emails() {
  const tabs = [
    {
      title: "Campaign",
      value: "campaign",
      content: (
        <div className="bg-black">
          <EmailCampaign />
        </div>
      ),
    },
    {
      title: "Email Template",
      value: "emailTemplate",
      content: (
        <div className="bg-black max-w-7xl">
          <EmailTemplate />
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-2">
      <div className="h-[20rem] md:h-[35rem] [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full  items-start justify-start mt-5">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
