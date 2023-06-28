"use client";

import { config } from "../../../../sanity.config";

import { NextStudio } from "next-sanity/studio";

const AdminPage = () => {
  return (
    <div className="w-full">
      <NextStudio config={config}></NextStudio>
    </div>
  );
};

export default AdminPage;
