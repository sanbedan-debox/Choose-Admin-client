import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo1 from "../assets/logo/logoWhite.png";
import { sdk } from "@/util/graphqlClient";
import useGlobalStore from "@/store/global";
import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";
import { useForm, SubmitHandler } from "react-hook-form";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

interface IFormInput {
  email: string;
  password: string;
  persistent: boolean;
}

export default function Login() {
  const router = useRouter();
  const { setToastData } = useGlobalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;

    try {
      const response = await sdk.AdminLogin({
        email,
        password,
      });

      if (response) {
        setToastData({ message: "Login Successful", type: "success" });

        router.replace("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setToastData({ message: "Login Failed", type: "error" });
    }
  };

  return (
    <section className=" bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-dot-white/[0.12] md:bg-dot-white/[0.15] border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="relative z-10 flex items-center gap-16 justify-center">
              <Image className="mb-4" src={logo1} alt="Logo" width={200} />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-black">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  id="email"
                  className="input input-primary"
                  placeholder="Enter your Email Address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  id="password"
                  className="input input-primary"
                  placeholder="Enter your Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button className="btn btn-primary">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies.accessToken;

  if (!token) {
    return {
      props: {},
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
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    return {
      props: {},
    };
  }
};
