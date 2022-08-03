import { LockOutlined } from "@ant-design/icons";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const btnSecondary =
  "inline-block font-medium border border-solid text-center py-1 px-2 text-pink-600 bg-transparent border-pink-600 border-2 hover:bg-pink-600 hover:border-pink-700 hover:text-white";

const Layout: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Roundest Pokemon</title>
      </Head>
      <div className="h-screen w-screen flex flex-col justify-between align-center items-center">
        <div className="w-screen flex items-center py-1 md:py-8 px-6 static border-b-2 border-black">
          <div className="text-2xl mx-auto">
            <Link href="/">
              <a>Which Pokémon is Rounder?</a>
            </Link>
          </div>
          {/* <MenuOutlined className="bottom-12 right-8 md:bottom-4 md:right-12 bg-red-400 p-3 rounded-full absolute drop-shadow-xl transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300" /> */}
        </div>
        {children}
        <footer className="w-full text-xl text-center py-2 border-t-2 border-black">
          <a href="https://github.com/galortega/roundest-mon">Github</a>
          {" | "}
          <Link href="/results">
            <a>Results</a>
          </Link>
          {" | "}
          <Link href="/resultsByUser">
            <a>My Results</a>
          </Link>
        </footer>
      </div>
    </>
  );
};

export default Layout;
