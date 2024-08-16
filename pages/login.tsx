import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";
import ReusableModal from "@/components/common/modal/modal";
import useGlobalStore from "@/store/global";
import { sdk } from "@/util/graphqlClient";
import { extractErrorMessage } from "@/util/utils";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import logo1 from "../assets/logo/logoDark.png";

interface IFormInput {
  email: string;
  persistent: boolean;
}

export default function Login() {
  const router = useRouter();
  const { setToastData } = useGlobalStore();
  const [showOTPModal, setShowOTPModal] = React.useState<boolean>(false);
  const [otp, setOtp] = React.useState<string>("");
  const [userEmail, setUserEmail] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [btnLoading, setBtnLoading] = React.useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email } = data;
    try {
      setBtnLoading(true);
      const response = await sdk.AdminLogin({ email });

      if (response && response.adminLogin) {
        setUserEmail(email);
        setShowOTPModal(true);
        setToastData({ message: "OTP sent to your email", type: "success" });
      }
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <section className=" bg-neutral-100 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white md:mt-0 sm:max-w-md xl:p-0">
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
                  Email
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

              <div className="flex justify-end mt-6">
                <CButton
                  loading={btnLoading}
                  variant={ButtonType.Primary}
                  className="w-full"
                >
                  Sign In
                </CButton>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ReusableModal
        title="Enter OTP"
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setBtnLoading(true);
              const response = await sdk.verifyAdminLogin({
                email: userEmail,
                otp,
              });

              if (response) {
                setToastData({ message: "Login Successful", type: "success" });
                router.replace("/");
              }
            } catch (error: any) {
              const errorMessage = extractErrorMessage(error);
              setToastData({
                type: "error",
                message: errorMessage,
              });
            } finally {
              setBtnLoading(false);
            }
          }}
        >
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input input-primary"
            placeholder="Enter your OTP"
            required
          />
          <CButton
            loading={btnLoading}
            variant={ButtonType.Primary}
            className="w-full mt-4"
          >
            Verify OTP
          </CButton>
        </form>
      </ReusableModal>
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
