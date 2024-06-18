import React from "react";
import { useRouter } from "next/router";
import { sdk } from "@/util/graphqlClient";
import PrimaryButton from "../button/PrimaryButton";

interface HeadingProps {
  title?: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await sdk.AdminLogout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%) ",
      }}
      className="justify-between items-center px-6 flex  py-3"
    >
      <h1 className="text-xl md:text-xl sm:text-xl lg:text-2xl  font-semibold">
        {title && <>{title} </>}
      </h1>
      <PrimaryButton onClick={handleLogout}>Log Out</PrimaryButton>
    </div>
  );
};

export default Heading;
