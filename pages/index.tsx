import UnlayerEditor from "@/components/modules/campaign/email/unlayer/editor";
import Layout from "@/components/navigation/layout";
import useGlobalStore from "@/store/global";
import React, { useEffect } from "react";
import { sdk } from "@/util/graphqlClient";
import useAuthStore from "@/store/auth";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { parseCookies } from "nookies";

type HomePageProps = {
  repo: {
    name: string;
    role: string;
    _id: string;
  };
};

const HomePage: React.FC<HomePageProps> = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { EmailBuilderOpen } = useGlobalStore();
  const { setUserRole, setUserName, setUserId } = useAuthStore();

  useEffect(() => {
    setUserName(repo.name);
    setUserRole(repo.role);
    setUserId(repo._id);
  }, [repo, setUserId, setUserName, setUserRole]);

  return (
    <div className="bg-white">
      {EmailBuilderOpen ? <UnlayerEditor /> : <Layout />}
    </div>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  const cookies = parseCookies(context);
  const token = cookies.accessToken;
  if (!token) {
    console.error("No authentication token found");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await sdk.Me(
      {},
      {
        cookie: context.req.headers.cookie?.toString() ?? "",
      }
    );
    if (response && response.me) {
      const { name, role, _id } = response.me;
      return {
        props: {
          repo: {
            name,
            role,
            _id,
          },
        },
      };
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error("Failed to fetch admin details:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
