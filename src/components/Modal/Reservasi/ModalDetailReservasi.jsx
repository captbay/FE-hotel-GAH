"use client";

import React from "react";
import Input from "../../Input";

const ModalDetailReservasi = ({ onCloseModal, Reservasi }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        id="authentication-modal"
        aria-hidden="true"
        className="overflow-x-hidden bg-gray-500 bg-opacity-75 transition-opacity overflow-y-auto fixed h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center"
      >
        <div className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4 h-full md:h-auto">
          <div className="bg-white border rounded-lg shadow relative">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="authentication-modal"
                onClick={onCloseModal}
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
                Detail Reservasi
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label
                    for="nama"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    No Booking
                  </label>
                  <Input
                    id="nama"
                    defaultValue={Reservasi.kode_booking}
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="nama"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Nama Customer
                  </label>
                  <Input
                    id="nama"
                    defaultValue={Reservasi.customer.name}
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="nama"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Tipe Reservasi
                  </label>
                  <Input
                    id="nama"
                    defaultValue={
                      Reservasi.customer.nama_insitusi == null
                        ? "Personal"
                        : "Grup" + " - " + Reservasi.customer.nama_insitusi
                    }
                    disabled
                  />
                </div>
                {Reservasi.transaksi_kamar.map((item, index) => (
                  <div>
                    <label
                      for="nama"
                      className="text-sm font-medium text-blue-900 block mb-2 "
                    >
                      Detail kamar {index + 1}
                    </label>
                    <Input
                      id="nama"
                      defaultValue={
                        item.kamar.no_kamar +
                        " - " +
                        item.kamar.jenis_kamar.name
                      }
                      disabled
                    />
                  </div>
                ))}
                {Reservasi.transaksi_fasilitas_tambahan.map((item, index) => (
                  <div>
                    <label
                      for="nama"
                      className="text-sm font-medium text-yellow-900 block mb-2 "
                    >
                      Detail Fasilitas Tambahan {index + 1}
                    </label>
                    <Input
                      id="nama"
                      defaultValue={
                        item.jumlah + " - " + item.fasilitas_tambahan.name
                      }
                      disabled
                    />
                  </div>
                ))}
                <div>
                  <label
                    for="nama"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Tanggal Reservasi
                  </label>
                  <Input
                    id="nama"
                    defaultValue={Reservasi.tanggal_reservasi}
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="nama"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Tanggal & Waktu Cekin
                  </label>
                  <Input id="nama" defaultValue={Reservasi.check_in} disabled />
                </div>
                <div>
                  <label
                    for="nama"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Tanggal & Waktu Cek Out
                  </label>
                  <Input
                    id="nama"
                    defaultValue={Reservasi.check_out}
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="nama"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Status Reservasi
                  </label>
                  <Input id="nama" defaultValue={Reservasi.status} disabled />
                </div>
                <div>
                  <label
                    for="nama"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Total orang
                  </label>
                  <Input
                    id="nama"
                    defaultValue={
                      parseInt(Reservasi.dewasa) + parseInt(Reservasi.anak)
                    }
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="nama"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Total Jaminan
                  </label>
                  <Input
                    id="nama"
                    defaultValue={new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(Reservasi.total_jaminan)}
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="nama"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Total Deposit
                  </label>
                  <Input
                    id="nama"
                    defaultValue={new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(Reservasi.total_deposit)}
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="nama"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Total Harga
                  </label>
                  <Input
                    id="nama"
                    defaultValue={new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(Reservasi.total_harga)}
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="nama"
                    className="text-sm font-medium text-gray-900 block mb-2 "
                  >
                    Tanggal Pembayaran Lunas
                  </label>
                  <Input
                    id="nama"
                    defaultValue={Reservasi.tanggal_pembayaran_lunas}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailReservasi;
