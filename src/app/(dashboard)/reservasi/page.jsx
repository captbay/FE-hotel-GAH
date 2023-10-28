"use client";
import { getAllReservasi } from "@/api/api";
import HotelCard from "@/components/HotelCard";
import useGetCookie from "@/hooks/useGetCookie";
import { useEffect, useState } from "react";

const ReservasiPage = () => {
  const [Reservasi, setReservasi] = useState([]);
  const { token } = useGetCookie();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

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
    getAllReservasi(token)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setReservasi(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading Reservasi...</div>;
  }

  return (
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
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                No Booking
              </th>
              <th scope="col" class="px-6 py-3">
                Nama Customer
              </th>
              <th scope="col" class="px-6 py-3">
                Tanggal Reservasi
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Total Jaminan
              </th>
              <th scope="col" class="px-6 py-3">
                Total Deposit
              </th>
              <th scope="col" class="px-6 py-3">
                Total Harga
              </th>
              <th scope="col" class="px-6 py-3">
                Tanggal Pembayaran
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReservasi.map((k) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">{k.kode_booking}</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {k.customer.name}
                </th>
                <td class="px-6 py-4">{k.tanggal_reservasi}</td>
                <td class="px-6 py-4">{k.status}</td>
                <td class="px-6 py-4">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(k.total_jaminan)}
                </td>
                <td class="px-6 py-4">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(k.total_deposit)}
                </td>
                <td class="px-6 py-4">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(k.total_harga)}
                </td>
                <td class="px-6 py-4">{k.tanggal_pembayaran_lunas}</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservasiPage;
