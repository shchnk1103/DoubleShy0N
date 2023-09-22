import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar/NavBar";
import Tags from "@/components/Tags";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <NavBar />

      <div className="flex justify-start items-center w-full my-8">
        <span className="mr-4 blue_gradient font-semibold text-2xl">Tags:</span>
        <Tags />
      </div>

      {children}

      <Footer />
    </>
  );
};

export default layout;
