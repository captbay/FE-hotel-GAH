"use client";
import { getAllTarifMusim, getAllMusim } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import { useEffect, useState } from "react";
import { Edit2, Trash } from "lucide-react";
import ModalDeleteTarifMusim from "@/components/Modal/TarifMusim/ModalDeleteTarifMusim";
import ModalEditTarifMusim from "@/components/Modal/TarifMusim/ModalEditTarifMusim";
import ModalTambahTarifMusim from "@/components/Modal/TarifMusim/ModalTambahTarifMusim";

const TarifMusimPage = () => {
  const [TarifMusim, setTarifMusim] = useState([]);
  const { token } = useGetCookie();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  //
  const [Musim, setMusim] = useState([]);
  //
  const [modalTambah, setModalTambah] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedTarifMusim, setSelectedTarifMusim] = useState(null);
  const [modalEditTarifMusim, setModalEditTarifMusim] = useState(false);

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

  const handleOpenModalDelete = (index) => {
    setSelectedTarifMusim(TarifMusim[index]);
    setModalDelete(true);
  };

  const handleOpenModalEdit = (index) => {
    setSelectedTarifMusim(TarifMusim[index]);
    setModalEditTarifMusim(true);
  };

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
      })
      .finally(() => {
        setLoading(false); // Move this here
      });
  }, []);

  useEffect(() => {
    getAllMusim(token)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setMusim(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(Musim);

  const musimOptions = Musim.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  if (loading) {
    return <div>Loading Tarif Musim...</div>;
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Data Tarif Musim</h1>
          <button
            className="bg-orange-600 px-4 py-2 text-xs w-max text-white font-semibold rounded"
            onClick={() => setModalTambah(true)}
          >
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
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Jenis Kamar
                </th>
                <th scope="col" className="px-6 py-3">
                  Jenis Kasur
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Kasur
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Musim
                </th>
                <th scope="col" className="px-6 py-3">
                  Harga
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal Mulai
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTarifMusim.map((k, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {k.jenis_kamar.name}
                  </th>
                  <td className="px-6 py-4">{k.jenis_kamar.bed}</td>
                  <td className="px-6 py-4">{k.jenis_kamar.total_bed}</td>
                  <td className="px-6 py-4">{k.musim.name}</td>
                  <td className="px-6 py-4">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(k.harga)}
                  </td>
                  <td className="px-6 py-4">{k.musim.start_date}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-yellow-500 p-2 mr-4 rounded w-max"
                      onClick={() => handleOpenModalEdit(index)}
                    >
                      <Edit2 size={16} color="white" />
                    </button>
                    <button
                      className="bg-red-600 p-2 rounded w-max"
                      onClick={() => handleOpenModalDelete(index)}
                    >
                      <Trash size={16} color="white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalTambah && (
        <ModalTambahTarifMusim
          onClose={() => setModalTambah(false)}
          musimOptions={musimOptions}
        />
      )}
      {modalDelete && (
        <ModalDeleteTarifMusim
          onCloseModal={() => setModalDelete(false)}
          TarifMusim={selectedTarifMusim}
        />
      )}
      {modalEditTarifMusim && (
        <ModalEditTarifMusim
          onClose={() => setModalEditTarifMusim(false)}
          id={selectedTarifMusim.id}
          musimOptions={musimOptions}
        />
      )}
    </>
  );
};

export default TarifMusimPage;
