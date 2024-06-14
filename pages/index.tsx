import UnlayerEditor from "@/components/modules/campaign/email/unlayer/editor";
import Layout from "@/components/navigation/layout";
import useGlobalStore from "@/store/global";
import React from "react";

const HomePage: React.FC = () => {
  const { EmailBuilderOpen } = useGlobalStore();

  return <div>{EmailBuilderOpen ? <UnlayerEditor /> : <Layout />}</div>;
};

export default HomePage;
