import React from "react";
import { useRouter } from "next/router";
import { sdk } from "@/util/graphqlClient";
import useGlobalStore from "@/store/global";
import CButton from "../button/button";
import { ButtonType } from "../button/interface";

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
    } catch (error) {
      setToastData({
        message: "Please enter a valid email address",
        type: "error",
      });
    }
  };

  return (
    <div className="justify-between items-center px-6 flex  py-3 ">
      <h1 className="text-xl md:text-xl sm:text-xl lg:text-2xl text-black  font-semibold">
        {title && <>{title} </>}
      </h1>
      <CButton type={ButtonType.Primary} onClick={handleLogout}>
        Log Out
      </CButton>
    </div>
  );
};

export default Heading;
