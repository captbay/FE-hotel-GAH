"use client";

import { getTarifMusimById, updateTarifMusimById } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import React, { useEffect, useState } from "react";
import Input from "../../Input";
import { toast } from "react-toastify";
import ReactSelect from "react-select";

const ModalEditTarifMusim = ({ onClose, id, musimOptions }) => {
  const { token } = useGetCookie();
  const musim_idRef = React.useRef(null);
  const jenis_kamar_idRef = React.useRef(null);
  const hargaRef = React.useRef(null);
  const [TarifMusim, setTarifMusim] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTarifMusimById(token, id)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setTarifMusim(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleUpdate = (id, { musim_id, jenis_kamar_id, harga }) => {
    updateTarifMusimById(token, id, {
      musim_id,
      jenis_kamar_id,
      harga,
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast.success("Berhasil mengupdate TarifMusim");
          onClose();
          window.location.reload();
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
    const musim_id = musim_idRef.current.getValue()[0].value;
    const jenis_kamar_id = jenis_kamar_idRef.current.getValue()[0].value;
    const harga = hargaRef.current.value;

    handleUpdate(id, { musim_id, jenis_kamar_id, harga });
  };

  const kamarOptions = [
    { value: 1, label: "Superior - Double Bed" },
    { value: 2, label: "Superior - Twin Bed" },
    { value: 3, label: "Double Deluxe - Double Bed" },
    { value: 4, label: "Double Deluxe - Twin Bed" },
    { value: 5, label: "Executive Deluxe - King Bed" },
    { value: 6, label: "Junior Suite - King Bed" },
  ];

  if (loading) return <div>Loading...</div>;

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
                Edit TarifMusim
              </h3>
              <div>
                <label
                  for="nama"
                  class="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Nama Musim
                </label>
                <ReactSelect
                  options={musimOptions}
                  defaultValue={
                    musimOptions.find(
                      (option) => option.value == TarifMusim?.musim_id
                    ) || ""
                  }
                  ref={musim_idRef}
                />
              </div>
              <div>
                <label
                  for="jenis_kamar_id"
                  class="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Jenis Kamar
                </label>
                <ReactSelect
                  options={kamarOptions}
                  defaultValue={
                    kamarOptions.find(
                      (option) => option.value == TarifMusim?.jenis_kamar_id
                    ) || ""
                  }
                  ref={jenis_kamar_idRef}
                />
              </div>
              <div>
                <label
                  for="harga"
                  className="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Harga
                </label>
                <Input
                  id="harga"
                  ref={hargaRef}
                  placeholder="Harga TarifMusim"
                  defaultValue={TarifMusim.harga}
                />
              </div>

              <div className="flex">
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
  );
};

export default ModalEditTarifMusim;
