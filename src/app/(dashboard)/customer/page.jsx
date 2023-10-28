"use client";
import { getAllCustomer } from "@/api/api";
import HotelCard from "@/components/HotelCard";
import useGetCookie from "@/hooks/useGetCookie";
import { useEffect, useState } from "react";

const CustomerPage = () => {
  const [Customer, setCustomer] = useState([]);
  const { token } = useGetCookie();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredCustomer = Customer.filter((k) => {
    return (
      k.name.toLowerCase().includes(query.toLowerCase()) ||
      k.email.toLowerCase().includes(query.toLowerCase()) ||
      k.no_identitas.toLowerCase().includes(query.toLowerCase()) ||
      k.nama_insitusi.toLowerCase().includes(query.toLowerCase())
    );
  });

  useEffect(() => {
    setLoading(true);
    getAllCustomer(token)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setCustomer(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading Customer...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Data Customer</h1>
        <button className="bg-orange-600 px-4 py-2 text-xs w-max text-white font-semibold rounded">
          Tambah Customer
        </button>
      </div>
      {/* search */}
      <div className="flex items-center mb-4 gap-8">
        <input
          type="text"
          className="border border-gray-600 rounded-lg px-4 py-2 w-full max-w-lg"
          placeholder="Cari Customer"
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
                Nama Customer
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                No Identitas
              </th>
              <th scope="col" class="px-6 py-3">
                Nama Insitusi
              </th>
              <th scope="col" class="px-6 py-3">
                Tipe Customer
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomer.map((k, index) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">{index + 1}</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {k.name}
                </th>
                <td class="px-6 py-4">{k.email}</td>
                <td class="px-6 py-4">{k.no_identitas}</td>
                <td class="px-6 py-4">
                  {k.nama_insitusi == null ? "Tidak ada" : k.nama_insitusi}
                </td>
                <td class="px-6 py-4">
                  {" "}
                  {k.nama_insitusi == null ? "Personal" : "Grup"}
                </td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Detail
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

export default CustomerPage;
