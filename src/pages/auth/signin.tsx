import React from "react";
import { Provider } from "next-auth/providers";
import { GetServerSideProps, GetStaticProps } from "next";
import { getProviders, getSession, signIn } from "next-auth/react";
import {
  FacebookOutlined,
  GoogleOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import Head from "next/head";

const Providers: React.FC<{ providers: Provider[] }> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            aria-label="Continue with google"
            role="button"
            className="hover:outline-none hover:ring-2 hover:ring-offset-1 hover:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: `${window.location.origin}/`,
              })
            }
          >
            <div className="flex items-center">
              {provider.id === "google" ? (
                <GoogleOutlined className="text-2xl " />
              ) : (
                <FacebookOutlined className="text-2xl " />
              )}
              <p className="text-base font-medium ml-4 text-gray-400">
                Continue with {provider.name}
              </p>
            </div>
          </button>
        </div>
      ))}
    </>
  );
};

const SignInPage: React.FC<{ providers: Provider[] }> = ({ providers }) => {
  if (!providers) return <div>Loading</div>;
  return (
    <>
      <Head>Roundest Mon</Head>
      <div className="h-screen w-full py-16 px-4">
        <div className="flex flex-col items-center justify-center">
          <LoginOutlined className="text-8xl drop-shadow-2xl" />
          <p className="tracking-widest p-6 text-2xl drop-shadow-2xl">Roundest Mon</p>
          <div className="bg-white shadow-2xl border-black border-2 rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
            <p className="focus:outline-none text-2xl font-extrabold leading-6 ">
              Login to your account
            </p>
            <p className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">
              Dont have account?{" "}
              <button
                onClick={() => signIn()}
                className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none   cursor-pointer"
              >
                {" "}
                Sign up here
              </button>
            </p>
            <Providers providers={providers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;

export const getStaticProps: GetServerSideProps = async () => {
  return {
    props: { providers: await getProviders() },
  };
};
