"use client";

import { getMusimById, updateMusimById } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import React, { useEffect, useState } from "react";
import Input from "../../Input";
import { toast } from "react-toastify";

const ModalEditMusim = ({ onClose, id }) => {
  const { token } = useGetCookie();
  const nameRef = React.useRef(null);
  const start_dateRef = React.useRef(null);
  const end_dateRef = React.useRef(null);
  const [musim, setMusim] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMusimById(token, id)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setMusim(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleUpdate = (id, { name, start_date, end_date }) => {
    updateMusimById(token, id, {
      name,
      start_date,
      end_date,
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast.success("Berhasil mengupdate musim");
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
    const name = nameRef.current.value;
    const start_date = start_dateRef.current.value;
    const end_date = end_dateRef.current.value;

    handleUpdate(id, { name, start_date, end_date });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div class="max-w-2xl mx-auto">
      <div
        id="authentication-modal"
        aria-hidden="true"
        class="overflow-x-hidden overflow-y-auto fixed h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center"
      >
        <div class="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4 h-full md:h-auto">
          <div class="bg-white border rounded-lg shadow relative">
            <div class="flex justify-end p-2">
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="authentication-modal"
                onClick={onClose}
              >
                <svg
                  class="w-5 h-5"
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
              class="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
              onSubmit={handleSubmit}
            >
              <h3 class="text-xl font-medium text-gray-900">Edit Musim</h3>
              <div>
                <label
                  for="nama"
                  class="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Nama Musim
                </label>
                <Input
                  id="nama"
                  ref={nameRef}
                  placeholder="Nama musim"
                  defaultValue={musim.name}
                />
              </div>
              <div>
                <label
                  for="start_date"
                  class="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Tanggal Mulai Musim
                </label>
                <Input
                  id="start_date"
                  ref={start_dateRef}
                  placeholder="Tanggal mulai musim"
                  type="date"
                  defaultValue={musim.start_date}
                />
              </div>
              <div>
                <label
                  for="end_date"
                  class="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Tanggal Beakhir Musim
                </label>
                <Input
                  id="end_date"
                  ref={end_dateRef}
                  placeholder="Tanggal berakhir musim"
                  type="date"
                  defaultValue={musim.end_date}
                />
              </div>

              <div className="flex">
                <button
                  type="submit"
                  class="w-full text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Update
                </button>
                {/* cancel button */}
                <button
                  type="button"
                  class="w-full text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900 focus:z-10"
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

export default ModalEditMusim;
