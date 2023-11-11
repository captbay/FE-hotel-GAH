"use client";
import { getAllReservasi, getAllReservasiForCustomer } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import { useEffect, useState } from "react";
import ModalDetailReservasi from "@/components/Modal/Reservasi/ModalDetailReservasi";
import ModalTTR from "@/components/Modal/Reservasi/ModalTTR";
import ModalCancel from "@/components/Modal/Reservasi/ModalCancel";
import { useReservasiStore } from "@/store/useReservasi";
import { useRouter } from "next/navigation";

const ReservasiPage = () => {
  const [Reservasi, setReservasi] = useState([]);
  const { token, role } = useGetCookie();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [modalDetail, setModalDetail] = useState(false);
  const [modalTTR, setModalTTR] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);
  const [selectedReservasi, setSelectedReservasi] = useState(null);
  const [selectedID, setSelectedID] = useState(null);

  const setIdReservasi = useReservasiStore((state) => state.setIdReservasi);

  const filteredReservasi = Reservasi.filter((k) => {
    return (
      k.kode_booking.toLowerCase().includes(query.toLowerCase()) ||
      k.customer.name.toLowerCase().includes(query.toLowerCase()) ||
      k.tanggal_reservasi.toLowerCase().includes(query.toLowerCase()) ||
      k.status.toLowerCase().includes(query.toLowerCase()) ||
      k.total_jaminan.toString().includes(query.toString()) ||
      k.total_deposit.toString().includes(query.toString()) ||
      k.total_harga.toString().includes(query.toString()) ||
      k.tanggal_pembayaran_lunas.toLowerCase().includes(query.toLowerCase())
    );
  });

  useEffect(() => {
    setLoading(true);

    if (!role) return;

    if (role != "Customer") {
      getAllReservasi(token)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setReservasi(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false); // Move this here
        });
    } else {
      getAllReservasiForCustomer(token)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setReservasi(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false); // Move this here
        });
    }
  }, [role]);

  const handleOpenModalDetail = (index) => {
    setSelectedReservasi(Reservasi[index]);
    setModalDetail(true);
  };

  const handleOpenModalPDF = (index) => {
    setSelectedID(Reservasi[index].id);
    setModalTTR(true);
  };

  const handleOpenModalCancel = (index) => {
    setSelectedID(Reservasi[index].id);
    setModalCancel(true);
  };

  const handleOpenModalBayar = (index) => {
    setIdReservasi(Reservasi[index].id);
    router.push("/resume-reservasi");
  };

  if (loading) {
    return <div>Loading Reservasi...</div>;
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Data Reservasi</h1>
        </div>
        {/* search */}
        <div className="flex items-center mb-4 gap-8">
          <input
            type="text"
            className="border border-gray-600 rounded-lg px-4 py-2 w-full max-w-lg"
            placeholder="Cari Reservasi"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No Booking
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal Reservasi
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Jaminan
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Deposit
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Harga
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal Pembayaran
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReservasi.map((k, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{k.kode_booking}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {k.customer.name}
                  </th>
                  <td className="px-6 py-4">{k.tanggal_reservasi}</td>
                  <td className="px-6 py-4">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(k.total_jaminan)}
                  </td>
                  <td className="px-6 py-4">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(k.total_deposit)}
                  </td>
                  <td className="px-6 py-4">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(k.total_harga)}
                  </td>
                  <td className="px-6 py-4">
                    {k.tanggal_pembayaran_lunas == null
                      ? "belum bayar"
                      : k.tanggal_pembayaran_lunas}
                  </td>
                  {/* belum cekin, belum bayar jaminan, sudah cekin, cancel, selesai */}
                  {k.status === "belum cekin" ? (
                    <td className="px-6 py-4">
                      <span className="text-orange-500">Belum Cekin</span>
                    </td>
                  ) : k.status === "belum bayar jaminan" ? (
                    <td className="px-6 py-4">
                      <span className="text-yellow-500">
                        Belum Bayar Jaminan
                      </span>
                    </td>
                  ) : k.status === "sudah cekin" ? (
                    <td className="px-6 py-4">
                      <span className="text-green-200">Sudah Cekin</span>
                    </td>
                  ) : k.status === "cancel" ? (
                    <td className="px-6 py-4">
                      <span className="text-red-500">Cancel</span>
                    </td>
                  ) : k.status === "selesai" ? (
                    <td className="px-6 py-4">
                      <span className="text-green-500">Selesai</span>
                    </td>
                  ) : null}
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-500 text-white p-2 rounded w-max"
                      onClick={() => handleOpenModalDetail(index)}
                    >
                      Show detail
                    </button>
                    {k.status != "belum bayar jaminan" &&
                    k.status != "cancel" &&
                    k.status != "selesai" ? (
                      <button
                        className="bg-yellow-500 text-white p-2 rounded mt-1"
                        onClick={() => handleOpenModalPDF(index)}
                      >
                        Cetak Tanda Terima
                      </button>
                    ) : null}
                    {k.status == "belum bayar jaminan" ? (
                      <button
                        className="bg-orange-500 text-white p-2 rounded mt-1"
                        onClick={() => handleOpenModalBayar(index)}
                      >
                        Bayar Reservasi
                      </button>
                    ) : null}
                    {k.status == "belum cekin" ||
                    k.status == "belum bayar jaminan" ? (
                      <button
                        className="bg-red-500 text-white p-2 rounded mt-1"
                        onClick={() => handleOpenModalCancel(index)}
                      >
                        Batal Reservasi
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalDetail && (
        <ModalDetailReservasi
          onCloseModal={() => setModalDetail(false)}
          Reservasi={selectedReservasi}
        />
      )}
      {modalTTR && (
        <ModalTTR
          onCloseModal={() => setModalTTR(false)}
          id={selectedID}
          message={"Yakin ingin mencetak Tanda Terima?"}
        />
      )}
      {modalCancel && (
        <ModalCancel
          onCloseModal={() => setModalCancel(false)}
          id={selectedID}
        />
      )}
    </>
  );
};

export default ReservasiPage;
