import ax from "axios";

export const axios = ax.create({
  baseURL: "http://hotel-api.test/api",
  // baseURL: "https://hotel-api.ppcdeveloper.com/api",
});

// TODO: kalo tiba tiba 401 terus pake yang dibawah

// import ax from "axios";
// import { getCookie } from "cookies-next";

// const tokenCookie = getCookie("token");
// const { token } = JSON.parse(tokenCookie);

// export const axios = ax.create({
//   baseURL: "http://hotel-api.test/api",
//   // baseURL: "https://hotel-api.ppcdeveloper.com/api",
//   headers: {
//     Authorization: `Bearer ${token}`, // Replace with your actual access token
//     "Content-Type": "application/json",
//   },
// });
