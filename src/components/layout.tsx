import { LockOutlined } from "@ant-design/icons";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const btnSecondary =
  "inline-block font-medium border border-solid text-center py-1 px-2 text-pink-600 bg-transparent border-pink-600 border-2 hover:bg-pink-600 hover:border-pink-700 hover:text-white";

const Layout: React.FC<{
  session: Session | null | undefined;
  children: React.ReactChild;
}> = ({ children, session }) => {
  return (
    <>
      <Head>
        <title>Roundest Pokemon</title>
      </Head>
      <div className="h-screen w-screen flex flex-col justify-between align-center items-center">
        <div className="w-screen flex items-center py-1 md:py-8 px-6 static border-b-2 border-black">
          {session && (
            <div className="hidden md:inline object-cover mr-2 absolute">
              <Image
                className="rounded-full"
                src={`${session?.user?.image}`}
                alt="Profile image"
                layout="fixed"
                height={42}
                width={42}
              />
            </div>
          )}
          <div className="text-2xl mx-auto">
            <Link href="/">
              <a>Which Pokémon is Rounder?</a>
            </Link>
          </div>
          <button
            className={`hidden md:inline-block absolute right-12 ${btnSecondary}`}
            onClick={() => (!session ? signIn() : signOut())}
          >
            <div className="flex items-center">
              <LockOutlined className="mr-2" />
              {session ? "Sign Out" : "Sign In"}
            </div>
          </button>
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
          <span className="md:hidden">
            {" | "}
            <button
              className={btnSecondary}
              onClick={() => (!session ? signIn() : signOut())}
            >
              <div className="flex items-center text-xs">
                {session ? (
                  <div className="inline mr-2">
                    <Image
                      className="object-cover rounded-full"
                      src={`${session?.user?.image}`}
                      alt="Profile image"
                      height={18}
                      width={18}
                    />
                  </div>
                ) : (
                  <LockOutlined className="mr-1" />
                )}
                {session ? "Sign Out" : "Sign In"}
              </div>
            </button>
          </span>
        </footer>
      </div>
    </>
  );
};

export default Layout;
