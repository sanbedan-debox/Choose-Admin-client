import React from "react";
import { useRouter } from "next/router";
import { sdk } from "@/util/graphqlClient";
import useGlobalStore from "@/store/global";
import CButton from "../button/button";
import { ButtonType } from "../button/interface";
import { extractErrorMessage } from "@/util/utils";

interface HeadingProps {
  title?: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  const { setToastData } = useGlobalStore();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await sdk.AdminLogout();
      router.replace("/login");
      setToastData({
        message: "Sucessfully Logged Out",
        type: "success",
      });
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    }
  };

  return (
    <div className="justify-between items-center px-6 flex  py-3 bg-white flex-1">
      <h1 className="text-xl md:text-xl sm:text-xl lg:text-2xl text-black  font-semibold">
        {title && <>{title} </>}
      </h1>
      <button className="btn btn-primary" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Heading;
