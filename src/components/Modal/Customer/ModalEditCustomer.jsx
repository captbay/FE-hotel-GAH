"use client";

import { updateCustomerById } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import React, { useEffect, useState } from "react";
import Input from "../../Input";
import { toast } from "react-toastify";

const ModalEditCustomer = ({ onClose, data }) => {
  const { token } = useGetCookie();
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const no_identitasRef = React.useRef(null);
  const no_phoneRef = React.useRef(null);
  const addressRef = React.useRef(null);
  const nama_insitusiRef = React.useRef(null);
  const id = data.id;

  const handleUpdate = (
    id,
    { name, email, no_identitas, no_phone, address, nama_insitusi }
  ) => {
    updateCustomerById(token, id, {
      name,
      email,
      no_identitas,
      no_phone,
      address,
      nama_insitusi,
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast.success("Berhasil mengupdate customer");
          onClose();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const no_identitas = no_identitasRef.current.value;
    const no_phone = no_phoneRef.current.value;
    const address = addressRef.current.value;
    const nama_insitusi = nama_insitusiRef.current.value;

    handleUpdate(id, {
      name,
      email,
      no_identitas,
      no_phone,
      address,
      nama_insitusi,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div
        id="authentication-modal"
        aria-hidden="true"
        className="bg-gray-500 bg-opacity-75 transition-opacity overflow-x-hidden overflow-y-auto fixed h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center"
      >
        <div className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4 h-full md:h-auto">
          <div className="bg-white border rounded-lg shadow relative">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-red-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="authentication-modal"
                onClick={onClose}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900">
                Edit Customer
              </h3>
              <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                {/* nama customer */}
                <div>
                  <label
                    for="name"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    ref={nameRef}
                    placeholder="Name Customer"
                    defaultValue={data.name}
                  />
                </div>
                {/* email */}
                <div>
                  <label
                    for="email"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    ref={emailRef}
                    placeholder="Email Customer"
                    defaultValue={data.email}
                  />
                </div>
                {/* no identitas */}
                <div>
                  <label
                    for="no_identitas"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    No Identitas
                  </label>
                  <Input
                    id="no_identitas"
                    ref={no_identitasRef}
                    placeholder="No Identitas Customer"
                    defaultValue={data.no_identitas}
                  />
                </div>
                {/* no phone */}
                <div>
                  <label
                    for="no_phone"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    No Phone
                  </label>
                  <Input
                    id="no_phone"
                    ref={no_phoneRef}
                    placeholder="087627321726 [depan (08) total 12/13 angka]"
                    defaultValue={data.no_phone}
                  />
                </div>
                {/* address */}
                <div>
                  <label
                    for="address"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Address
                  </label>
                  <Input
                    id="address"
                    ref={addressRef}
                    placeholder="Address Customer"
                    defaultValue={data.address}
                  />
                </div>
                {/* nama insitusi */}
                {data.nama_insitusi != null ? (
                  <div>
                    <label
                      for="nama_insitusi"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Nama Insitusi
                    </label>
                    <Input
                      id="nama_insitusi"
                      ref={nama_insitusiRef}
                      placeholder="Nama Insitusi Customer"
                      defaultValue={data.nama_insitusi}
                    />
                  </div>
                ) : (
                  <div>
                    <label
                      for="nama_insitusi"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Personal
                    </label>
                    <Input
                      id="nama_insitusi"
                      ref={nama_insitusiRef}
                      placeholder="Kamu adalah user tipe Personal"
                      defaultValue={null}
                      disabled
                    />
                  </div>
                )}

                <div className="flex gap-4 self-center">
                  <button
                    type="submit"
                    className="w-full text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Update
                  </button>
                  {/* cancel button */}
                  <button
                    type="button"
                    className="w-full text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900 focus:z-10"
                    onClick={onClose}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditCustomer;
