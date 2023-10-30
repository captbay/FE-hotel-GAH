"use client";
import Sidebar from "@/components/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 overflow-x-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
