import { NextPage } from "next";
import { useRouter } from "next/router";
import { getUserRole } from "@/util/auth";
import Routes from "@/components/layout/layout";

const Home: NextPage = () => {
  const router = useRouter();
  const userRole = getUserRole();

  return <Routes />;
};

export default Home;
