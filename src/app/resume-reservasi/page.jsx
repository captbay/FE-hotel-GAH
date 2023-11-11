"use client";
import React, { useEffect, useState } from "react";
import { getReservasiById, putUangJaminanGrup } from "@/api/api";

// reservasi
import { useReservasiStore } from "@/store/useReservasi";

// cookies
import useGetCookie from "@/hooks/useGetCookie";

import { useRouter } from "next/navigation";

import { convertDateToStringHuman } from "@/utils/helper";

import ModalConfirmReservasi from "@/components/Modal/Reservasi/ModalTTR";
import Input from "@/components/Input";
import { toast } from "react-toastify";

const page = () => {
  const { token, role } = useGetCookie();
  const router = useRouter();
  const [modalConfirmReservasi, setModalConfirmReservasi] = useState(false);
  const hargaRef = React.useRef(null);

  // pegawai
  const [resume, setResume] = useState([]);
  const [loading, setLoading] = useState(false);

  //   reservasi
  const idReservasi = useReservasiStore((state) => state.idReservasi);

  useEffect(() => {
    setLoading(true);
    getReservasiById(token, idReservasi)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setResume(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSudahBayar = () => {
    setModalConfirmReservasi(true);
  };

  const handleToBotoom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // TODO: Harusnya clik yes baru put uang jaminan

  const handleBayarJaminan = () => {
    putUangJaminanGrup(token, idReservasi, {
      uang_jaminan: hargaRef.current.value,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200 || res.status === 201) {
          // toast.success("Berhasil bayar jaminan");
          // router.push("/resume-reservasi");
          handleSudahBayar();
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

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     const confirmationMessage =
  //       "Are you sure you want to leave? Your changes may not be saved.";

  //     event.returnValue = confirmationMessage; // Standard-compliant browsers
  //     return confirmationMessage; // For older browsers
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     // Remove the event listener when the component is unmounted
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  if (loading) {
    return <div>Loading Reservasi...</div>;
  }

  return (
    <>
      <section className="bg-blue-100 min-w-max min-h-screen">
        <div className="container mx-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Resume Reservasi
            </h1>
          </div>

          <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <h3 className="text-xl font-medium text-gray-900 bg-gray-200 py-4 px-6">
              List Kamar
            </h3>

            <div className="flex flex-col gap-4 p-6">
              {resume?.transaksi_kamar?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-md"
                >
                  <div className="flex-1">
                    <h1 className="text-lg font-bold">
                      {item.kamar.no_kamar} - {item.kamar.jenis_kamar.name}
                    </h1>
                    <span className="uppercase text-sm">
                      {item.kamar.jenis_kamar.bed}
                    </span>
                    <p className="text-sm font-bold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item.total_harga)}
                    </p>
                  </div>
                </div>
              ))}
              {/* total harga */}
              <h1 className="text-lg font-bold text-end">
                Total Harga :{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(resume.total_harga)}
              </h1>
            </div>
          </div>

          <div className="max-w-7xl bg-white rounded-lg shadow-md overflow-hidden mb-8 mx-auto">
            <h2 className="text-xl font-semibold bg-gray-200 py-4 px-6">
              Detail Reservasi
            </h2>

            <div className="flex flex-col gap-4 p-6">
              <div className="flex items-center gap-8">
                <label htmlFor="kode_booking" className="text-gray-700">
                  Kode Booking
                </label>
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-gray-200 rounded-sm select-none">
                    {resume.kode_booking}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <label htmlFor="nama" className="text-gray-700">
                  Nama Customer
                </label>
                {/* Display customer details here */}
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-gray-200 rounded-sm select-none">
                    {resume.customer?.name}
                    {resume.customer?.nama_insitusi == null
                      ? ""
                      : ` - ${resume.customer?.nama_insitusi}`}
                  </div>
                </div>
              </div>
              {role === "SM" ? (
                <div className="flex items-center gap-8">
                  <label htmlFor="nama" className="text-gray-700">
                    Nama Pegawai
                  </label>
                  {/* Display customer details here */}
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-gray-200 rounded-sm select-none">
                      {resume.pegawai?.name}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Start date and end date */}
              <div className="flex items-center gap-8">
                <label htmlFor="startdate" className="text-gray-700">
                  Tanggal Mulai Reservasi
                </label>
                {/* Display start date details here */}
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-gray-200 rounded-sm select-none">
                    {convertDateToStringHuman(resume.tanggal_reservasi)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <label htmlFor="enddate" className="text-gray-700">
                  Tanggal Selesai Reservasi
                </label>
                {/* Display end date details here */}
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-gray-200 rounded-sm select-none">
                    {convertDateToStringHuman(resume.tanggal_end_reservasi)}
                  </div>
                </div>
              </div>

              {/* Dewasa and Anak */}
              <div className="flex items-center gap-8">
                <label htmlFor="dewasa" className="text-gray-700">
                  Dewasa
                </label>
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-gray-200 rounded-sm select-none">
                    {resume.dewasa}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <label htmlFor="anak" className="text-gray-700">
                  Anak
                </label>
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-gray-200 rounded-sm select-none">
                    {resume.anak}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <label htmlFor="note" className="text-gray-700">
                  Permintaan Khusus/fasilitas
                </label>
                {/* Display note details here */}
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-gray-200 rounded-sm select-none">
                    {resume.note == null ? "Tidak ada" : resume.note}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <h3 className="text-xl font-medium text-gray-900 bg-gray-200 py-4 px-6">
              Pembayaran Via Transfer
            </h3>
            <div className="flex flex-col gap-4 p-6">
              <h1 className="text-lg font-bold">
                770011770022{" "}
                <span
                  htmlFor="nama"
                  className="text-gray-700 text-sm font-medium"
                >
                  ( Bank Diamond atas nama PT Atma Jaya )
                </span>
              </h1>
            </div>
            {role == "Customer" ? (
              <>
                <div className="flex flex-col gap-4 pb-2 pl-6">
                  {/* total harga */}
                  <h1 className="text-lg font-bold">
                    Total Harga :{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(resume.total_jaminan)}
                  </h1>
                </div>
                <div className="flex flex-col gap-4 p-6">
                  {/* total harga */}
                  <button
                    className="btn btn-primary"
                    onClick={handleSudahBayar}
                  >
                    sudah bayar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-4 pb-2 pl-6">
                  {/* total harga */}
                  <label htmlFor="nama" className="text-gray-700">
                    Input Uang Jaminan (minimal 50% dari{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(resume.total_harga)}
                    )
                  </label>
                  <Input
                    id="harga"
                    ref={hargaRef}
                    placeholder="Harga TarifMusim"
                  />
                </div>
                <div className="flex flex-col gap-4 p-6">
                  {/* total harga */}
                  <button
                    className="btn btn-primary"
                    onClick={handleBayarJaminan}
                  >
                    Bayar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <button
          className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
          onClick={handleToBotoom}
        >
          Scroll to bottom
        </button>
      </section>
      {modalConfirmReservasi && (
        <ModalConfirmReservasi
          onCloseModal={() => setModalConfirmReservasi(false)}
          id={idReservasi}
          message={"Apakah anda yakin sudah membayar ?"}
          href={"dashboard"}
        />
      )}
    </>
  );
};

export default page;
