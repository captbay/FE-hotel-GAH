"use client";

import React, { useState, useEffect } from "react";
import { getCustomerById } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import ModalEditCustomer from "@/components/Modal/Customer/ModalEditCustomer";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const { token, id } = useGetCookie();
  const [modalEdit, setModalEdit] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getCustomerById(token, id)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setProfileData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {loading ? (
          <div>Loading profile...</div>
        ) : (
          <div className="max-w-4xl w-full my-0 mx-5 p-5 bg-white shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Data Profile</h1>
              <button
                className="bg-orange-600 px-4 py-2 text-xs w-max text-white font-semibold rounded"
                onClick={() => setModalEdit(true)}
              >
                Edit Profile
              </button>
            </div>
            <div className="flex flex-col items-center my-10">
              <img
                className="w-28 h-28 border mb-4"
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                alt="Profile Avatar"
              />
              <h1 className="text-2xl mb-2">{profileData.name}</h1>
              <p className="text-lg">{profileData.email}</p>
            </div>
            <div className="flex flex-col md:flex-row mx-5 ">
              <div className="flex-1">
                <h2 className="text-2xl mb-2">About Me</h2>
                <p className="text-lg mb-1">
                  No Identitas : {profileData.no_identitas}
                </p>
                <p className="text-lg mb-1">
                  No Phone : {profileData.no_phone}
                </p>
              </div>
              <div className="flex-1 mt-6 md:mt-0">
                <h2 className="text-2xl mb-2">More Information</h2>
                {profileData.nama_insitusi == null ? null : (
                  <p className="text-lg">
                    Nama Insitusi : {profileData.nama_insitusi}
                  </p>
                )}
                <p className="text-lg">Alamat : {profileData.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {modalEdit && (
        <ModalEditCustomer
          onClose={() => setModalEdit(false)}
          data={profileData}
        />
      )}
    </>
  );
};

export default ProfilePage;
