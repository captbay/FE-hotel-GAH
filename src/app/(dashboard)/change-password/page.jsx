"use client";

import { changePassword } from "@/api/api";
import Input from "@/components/Input";
import React, { useState } from "react";
import useGetCookie from "@/hooks/useGetCookie";
import { toast } from "react-toastify";

const ChangePasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const { token, username } = useGetCookie();

  const handleChangePass = ({ new_password }) => {
    changePassword(token, { username, new_password })
      .then((res) => {
        console.log(res);

        if (res.status === 200 || res.status === 201) {
          toast.success("Berhasil Ganti Password");
        }
      })
      .catch((error) => {
        console.log(error);

        if (Array.isArray(error?.response?.data?.message)) {
          error?.response?.data?.message.map((err) => {
            toast.error(err);
          });
        } else {
          toast.error(error?.response?.data?.message);
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleChangePass({ new_password: newPassword }); // Pass an object with new_password

    setNewPassword(""); // Clear the newPassword field after submitting
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border rounded-lg shadow relative">
        <form
          className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
          onSubmit={handleSubmit}
        >
          <h3 className="mt-4 text-xl font-medium text-gray-900">
            Change Password
          </h3>
          <div>
            <label
              htmlFor="nama" // Use "htmlFor" instead of "for"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Password Baru
            </label>
            <Input
              id="nama"
              value={newPassword} // Use "value" to bind input to state
              onChange={(e) => setNewPassword(e.target.value)} // Handle input change
              placeholder="New Password"
              type="password"
            />
          </div>

          <div className="flex">
            <button
              type="submit"
              className="w-full text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
