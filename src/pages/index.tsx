import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <>
        <div className="hidden md:flex relative bg-white shadow-2xl shadow-black border-2 border-black justify-between items-center max-w-2xl flex-row animate-fade-in p-5">
          <div className="absolute -right-2 -bottom-2 bg-black h-full w-full -z-50" />
          Hello world!
        </div>
      </>
      )
    </>
  );
};

export default Home;
