"use client";
import { getDashboard } from "@/api/api";
import ModalDetailKamar from "@/components/Modal/Dashboard/ModalDetailKamar";
import React, { useState, useEffect } from "react";
import useGetCookie from "@/hooks/useGetCookie";
import { getRoomImage } from "@/utils/helper";
import Image from "next/image";
import { toast } from "react-toastify";
// reservasi
import { useReservasiStore } from "@/store/useReservasi";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [kamar, setKamar] = useState([]);
  const start_dateRef = React.useRef(null);
  const { token } = useGetCookie();
  const end_dateRef = React.useRef(null);
  const [selectedKamar, setSelectedKamar] = useState(null);
  const [modalDetailKamar, setModalDetailKamar] = useState(false);

  // reservasi
  const cart = useReservasiStore((state) => state.cart);
  const setCart = useReservasiStore((state) => state.setCart);
  const addToCart = useReservasiStore((state) => state.addToCart);
  const setStartDate = useReservasiStore((state) => state.setStartDate);
  const setEndDate = useReservasiStore((state) => state.setEndDate);
  const startDate = useReservasiStore((state) => state.startDate);
  const endDate = useReservasiStore((state) => state.endDate);

  const handleAddCart = (kamar, res) => {
    // find if item already in cart
    const item = cart.find((item) => item.id === kamar.id);
    if (item) {
      toast.error("Kamar sudah ada di list reservasi");
      return;
    }
    addToCart({
      ...kamar,
      ...res,
    });
    toast.success("Kamar berhasil masuk list reservasi");
  };

  const handleListReservasi = () => {
    router.push("/list-reservasi");
  };

  const handleOpenModalDetailKamar = (index) => {
    setSelectedKamar(kamar[index]);
    setModalDetailKamar(true);
  };

  const handleDashboard = (start_date, end_date) => {
    getDashboard(token, start_date, end_date)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setKamar(res.data.data);
          setStartDate(start_dateRef.current.value);
          setEndDate(end_dateRef.current.value);
          setCart([]);
          toast.success("Berhasil mendapatkan data kamar, list di reset");
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

  // if back from list, dont need search again
  useEffect(() => {
    if (startDate != null && endDate != null) {
      getDashboard(token, startDate, endDate)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setKamar(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [startDate, endDate]);

  const handleSearch = (e) => {
    e.preventDefault();
    const start_date = start_dateRef.current.value;
    const end_date = end_dateRef.current.value;

    handleDashboard(start_date, end_date);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Data Kamar Available</h1>
          <button
            className="bg-orange-600 px-4 py-2 text-xs w-max text-white font-semibold rounded"
            onClick={() => handleListReservasi()}
          >
            Lihat List Reservasi Booking Anda
          </button>
        </div>
        {/* search date*/}
        <div className="flex flex-col md:flex-row items-center mb-4 gap-8">
          {/* input start date */}
          <div className="flex items-center gap-8">
            <label htmlFor="start-date" className="text-gray-700">
              Start Date:
            </label>
            <input
              id="start-date"
              type="date"
              ref={start_dateRef}
              defaultValue={
                startDate == null
                  ? new Date().toISOString().slice(0, 10)
                  : startDate
              }
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* input end date */}
          <div className="flex items-center gap-8">
            <label htmlFor="end-date" className="text-gray-700">
              End Date:
            </label>
            <input
              id="end-date"
              type="date"
              ref={end_dateRef}
              // defauktValue add 1 day
              defaultValue={
                endDate == null
                  ? new Date(new Date().setDate(new Date().getDate() + 1))
                      .toISOString()
                      .slice(0, 10)
                  : endDate
              }
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* button search */}
          <button
            className="bg-blue-500 px-4 py-2 text-xs w-max text-white font-semibold rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="flex justify-center flex-col">
          <div>
            {kamar?.length != 0 ? (
              kamar?.map((res, index) => {
                return (
                  <div
                    className="card w-full border mb-4"
                    key={index}
                    style={{ zIndex: 0, position: "unset" }}
                  >
                    <figure
                      onClick={() => {
                        handleOpenModalDetailKamar(index);
                      }}
                      className="cursor-pointer"
                    >
                      <Image
                        src={getRoomImage(res.nama_kamar)}
                        alt={res.nama_kamar}
                        width={400}
                        height={300}
                        className="w-full h-64 object-center rounded-t"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title uppercase">
                        {res.nama_kamar} - {res.total_bed} /{" "}
                        <span className="uppercase text-blue-500 font-medium">
                          {res.tipe_bed}
                        </span>
                      </h2>
                      <h6>
                        Harga:{" "}
                        <span className="font-bold">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(res.harga)}{" "}
                          / malam /{" "}
                        </span>
                        <span className="uppercase text-yellow-600 font-medium">
                          {res.nama_musim}
                        </span>
                      </h6>
                      <div className="flex">
                        <p>
                          Ketersediaan: <span>{res.ketersediaan} kamar</span>
                        </p>
                      </div>
                      <div className="collapse">
                        <input type="checkbox" />
                        <div className="collapse-title text-xs btn py-1 btn-circle text-left font-medium text-white bg-blue-500">
                          Lihat Kamar Tersedia
                        </div>
                        <div className="collapse-content mt-2">
                          {res.data_kamar?.map((kamar, index) => {
                            return (
                              <div className="flex py-2 border-b-2" key={index}>
                                <p>No Kamar: {kamar.no_kamar}</p>
                                {/* button check and uncheck*/}
                                <button
                                  className=" cursor-pointer bg-blue-500 px-4 py-2 text-xs w-max text-white font-semibold rounded"
                                  onClick={() => {
                                    handleAddCart(kamar, res);
                                  }}
                                >
                                  Add to Reservasi List
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="card w-full border mb-4" style={{ zIndex: -10 }}>
                <div className="card-body">
                  <h2 className="card-title uppercase text-center">
                    Silahkan cari kamar terlebih dahulu
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {modalDetailKamar && (
        <ModalDetailKamar
          onClose={() => setModalDetailKamar(false)}
          data={selectedKamar}
        />
      )}
    </>
  );
};

export default Dashboard;
