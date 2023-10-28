"use client";
import { getCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";

const useGetCookie = () => {
  const [cookie, setCookie] = useState(null);
  const cookieData = getCookie("token");
  useEffect(() => {
    const { token, role, name } = cookieData
      ? JSON.parse(cookieData)
      : { token: null, role: null, name: null };
    setCookie({ token, role, name });
  }, [cookieData]);

  const clearCookie = () => {
    deleteCookie("token");
  };

  return {
    role: cookie?.role,
    token: cookie?.token || JSON?.parse(cookieData)?.token,
    name: cookie?.name,
    clearCookie,
  };
};

export default useGetCookie;
