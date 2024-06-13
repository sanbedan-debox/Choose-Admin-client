import * as React from "react";
import Image from "next/image";
import logo1 from "../assets/logo/logoWhite.png";
import Link from "next/link";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function JoySignInSideTemplate() {
  const handleSubmit = (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const { email, password, persistent } = event.currentTarget.elements;
    // Add your form submission logic here
    console.log({
      email: email.value,
      password: password.value,
      persistent: persistent.checked,
    });
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
        <div className="relative z-10 flex items-center gap-16">
          <Image className="mb-4" src={logo1} alt="Logo" width={200} />
        </div>
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-dot-white/[0.12] md:bg-dot-white/[0.15] border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
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
                  className="bg-secondary bg-opacity-30 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:outline-none focus:border-transparent block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-transparent"
                  placeholder="Enter your Email Address"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-secondary bg-opacity-30 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:outline-none focus:border-transparent block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-transparent"
                  placeholder="Enter your Password"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`h-10 px-4 py-2 m-1 mb-10 text-white transition-colors duration-300 transform rounded-full focus:outline-none md:w-auto w-32 flex items-center justify-center ${"bg-primary hover:bg-white hover:text-primary"}`}
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
