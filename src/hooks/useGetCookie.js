"use client";
import { getCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";

const useGetCookie = () => {
  const [cookie, setCookie] = useState(null);
  const cookieData = getCookie("token");

  const { token, role, name, id, username } = cookieData
    ? JSON.parse(cookieData)
    : { token: null, role: null, name: null, id: null, username: null };
  useEffect(() => {
    setCookie({ token, role, name, id, username });
  }, [token, role, name, id, username, cookieData, setCookie]);

  const clearCookie = () => {
    deleteCookie("token");
  };

  return {
    role: cookie?.role,
    token: cookie?.token || (cookieData && JSON.parse(cookieData)?.token),
    name: cookie?.name,
    id: cookie?.id,
    username: cookie?.username,
    clearCookie,
  };
};

export default useGetCookie;
