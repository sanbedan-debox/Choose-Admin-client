import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo1 from "../assets/logo/logoWhite.png";
import { sdk } from "@/util/graphqlClient";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import useGlobalStore from "@/store/global";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Login() {
  const router = useRouter();
  const { setToastData } = useGlobalStore();

  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const { email, password, persistent } = event.currentTarget.elements;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      console.error("Invalid email address");
      return;
    }

    try {
      const response = await sdk.AdminLogin({
        email: email.value,
        password: password.value,
      });

      if (response) {
        console.log("Login successful:", response);
        setToastData({ message: "Login Successful", type: "success" });

        router.replace("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setToastData({ message: "Login Failed", type: "error" });
    }
  };

  return (
    <section
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-dot-white/[0.12] md:bg-dot-white/[0.15] border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="relative z-10 flex items-center gap-16 justify-center">
              <Image className="mb-4" src={logo1} alt="Logo" width={200} />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-secondary bg-opacity-30 text-sm rounded-lg focus:ring-primary-600 focus:outline-none block w-full p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your Email Address"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-secondary bg-opacity-30 text-sm rounded-lg focus:ring-primary-600 focus:outline-none block w-full p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your Password"
                />
              </div>
              <div className="flex justify-end">
                <PrimaryButton>Sign In</PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
