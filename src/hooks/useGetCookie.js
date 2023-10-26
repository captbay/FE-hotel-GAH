import { getCookie, deleteCookie } from "cookies-next";

const useGetCookie = () => {
  const cookie = getCookie("token");
  const { token, role } = cookie
    ? JSON.parse(cookie)
    : { token: null, role: null };

  const clearCookie = () => {
    deleteCookie("token");
  };

  return { token, role, clearCookie };
};

export default useGetCookie;
