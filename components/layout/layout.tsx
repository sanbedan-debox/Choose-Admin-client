import AdminComponent from "@/pages/admin";
import CampaignComponent from "@/pages/campaign";
import EmailComponent from "@/pages/campaign/email";
import MessageComponent from "@/pages/campaign/message";
import RestaurantComponent from "@/pages/restaurant";
import UserComponent from "@/pages/user";
import WaitlistComponent from "@/pages/waitlist";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Routes: NextPage = () => {
  const router = useRouter();

  return (
    <div className="min-w-screen">
      {router.pathname === "/admin" && <AdminComponent />}
      {router.pathname === "/restaurant" && <RestaurantComponent />}
      {router.pathname === "/user" && <UserComponent />}
      {router.pathname === "/campaign" && <CampaignComponent />}
      {router.pathname === "/campaign/email" && <EmailComponent />}
      {router.pathname === "/campaign/message" && <MessageComponent />}
      {router.pathname === "/waitlist" && <WaitlistComponent />}
    </div>
  );
};

export default Routes;
