"use client";

import { createFasilitasTambahan } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import React from "react";
import Input from "../../Input";
import { toast } from "react-toastify";

const ModalTambahFasilitasTambahan = ({ onClose }) => {
  const { token } = useGetCookie();
  const nameRef = React.useRef(null);
  const hargaRef = React.useRef(null);

  const handleAdd = ({ name, harga }) => {
    createFasilitasTambahan(token, { name, harga })
      .then((res) => {
        console.log(res);

        if (res.status === 200 || res.status === 201) {
          toast.success("Berhasil menambahkan FasilitasTambahan");
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
    const harga = hargaRef.current.value;

    handleAdd({ name, harga });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div
        id="authentication-modal"
        aria-hidden="true"
        className="bg-gray-500 bg-opacity-75 transition-opacity overflow-x-hidden overflow-y-auto fixed h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center"
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
                Tambah FasilitasTambahan
              </h3>
              <div>
                <label
                  for="nama"
                  className="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Nama FasilitasTambahan
                </label>
                <Input
                  id="nama"
                  ref={nameRef}
                  placeholder="Nama FasilitasTambahan"
                />
              </div>
              <div>
                <label
                  for="harga"
                  className="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Harga FasilitasTambahan
                </label>
                <Input
                  id="harga"
                  ref={hargaRef}
                  placeholder="Tanggal mulai FasilitasTambahan"
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

export default ModalTambahFasilitasTambahan;
