"use client";
import { getAllTarifMusim } from "@/api/api";
import HotelCard from "@/components/HotelCard";
import useGetCookie from "@/hooks/useGetCookie";
import { useEffect, useState } from "react";

const TarifMusimPage = () => {
  const [TarifMusim, setTarifMusim] = useState([]);
  const { token } = useGetCookie();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredTarifMusim = TarifMusim.filter((k) => {
    return (
      k.harga.toString().includes(query.toString()) ||
      k.jenis_kamar.name.toLowerCase().includes(query.toLowerCase()) ||
      k.jenis_kamar.bed.toLowerCase().includes(query.toLowerCase()) ||
      k.jenis_kamar.total_bed.toString().includes(query.toString()) ||
      k.musim.name.toLowerCase().includes(query.toLowerCase()) ||
      k.musim.start_date.toLowerCase().includes(query.toLowerCase()) ||
      k.musim.end_date.toLowerCase().includes(query.toLowerCase())
    );
  });

  useEffect(() => {
    setLoading(true);
    getAllTarifMusim(token)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setTarifMusim(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading Tarif Musim...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Data Tarif Musim</h1>
        <button className="bg-orange-600 px-4 py-2 text-xs w-max text-white font-semibold rounded">
          Tambah Tarif Musim
        </button>
      </div>
      {/* search */}
      <div className="flex items-center mb-4 gap-8">
        <input
          type="text"
          className="border border-gray-600 rounded-lg px-4 py-2 w-full max-w-lg"
          placeholder="Cari TarifMusim"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                No
              </th>
              <th scope="col" class="px-6 py-3">
                Jenis Kamar
              </th>
              <th scope="col" class="px-6 py-3">
                Jenis Kasur
              </th>
              <th scope="col" class="px-6 py-3">
                Total Kasur
              </th>
              <th scope="col" class="px-6 py-3">
                Nama Musim
              </th>
              <th scope="col" class="px-6 py-3">
                Harga
              </th>
              <th scope="col" class="px-6 py-3">
                Tanggal Mulai
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTarifMusim.map((k, index) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">{index + 1}</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {k.jenis_kamar.name}
                </th>
                <td class="px-6 py-4">{k.jenis_kamar.bed}</td>
                <td class="px-6 py-4">{k.jenis_kamar.total_bed}</td>
                <td class="px-6 py-4">{k.musim.name}</td>
                <td class="px-6 py-4">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(k.harga)}
                </td>
                <td class="px-6 py-4">{k.musim.start_date}</td>
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

export default TarifMusimPage;
