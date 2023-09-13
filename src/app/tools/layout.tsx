import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar/NavBar";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <NavBar />

      {children}

      <Footer />
    </>
  );
};

export default layout;
