"use client";

import { createKamar } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import React from "react";

import ReactSelect from "react-select";
import { toast } from "react-toastify";

const ModalTambahKamar = ({ onClose }) => {
  const { token } = useGetCookie();
  const jenisKamarRef = React.useRef(null);
  const statusKamarRef = React.useRef(null);

  const handleAdd = ({ jenis_kamar_id, status }) => {
    createKamar(token, { jenis_kamar_id, status })
      .then((res) => {
        console.log(res);

        if (res.status === 200 || res.status === 201) {
          toast.success("Berhasil menambahkan kamar");
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

  const statusOptions = [
    { value: "available", label: "Available" },
    { value: "unvailable", label: "Unavailable" },
  ];

  const kamarOptions = [
    { value: 1, label: "Superior - Double Bed" },
    { value: 2, label: "Superior - Twin Bed" },
    { value: 3, label: "Double Deluxe - Double Bed" },
    { value: 4, label: "Double Deluxe - Twin Bed" },
    { value: 5, label: "Executive Deluxe - King Bed" },
    { value: 6, label: "Junior Suite - King Bed" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const jenis_kamar_id = jenisKamarRef.current.getValue()[0].value;
    const status = statusKamarRef.current.getValue()[0].value;

    handleAdd({ jenis_kamar_id, status });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div
        id="authentication-modal"
        aria-hidden="true"
        className="overflow-x-hidden overflow-y-auto fixed h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center"
      >
        <div className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4 h-full md:h-auto">
          <div className="bg-white border rounded-lg shadow relative">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
            <form
              className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
              onSubmit={handleSubmit}
            >
              <h3 className="text-xl font-medium text-gray-900">
                Tambah Kamar
              </h3>
              <div>
                <label
                  for="email"
                  className="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Jenis Kamar
                </label>
                <ReactSelect
                  options={kamarOptions}
                  defaultValue={kamarOptions[0]}
                  className="w-full"
                  ref={jenisKamarRef}
                />
              </div>
              <div>
                <label
                  for="password"
                  className="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Status Kamar
                </label>
                <ReactSelect
                  options={statusOptions}
                  defaultValue={statusOptions[0]}
                  className="w-full"
                  ref={statusKamarRef}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Tambah
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
  );
};

export default ModalTambahKamar;
