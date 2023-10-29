"use client";
import Sidebar from "@/components/Sidebar";
import React from "react";
// import useGetCookie from "@/hooks/useGetCookie";
// import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }) => {
  // const { token } = useGetCookie();
  // const router = useRouter();

  // // if token not set
  // if (!token) {
  //   router.push("/login");
  // }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 overflow-x-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
