"use client";
import { Edit2, Trash } from "lucide-react";
import { getAllMusim } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import { useEffect, useState } from "react";
import ModalDeleteMusim from "@/components/Modal/Musim/ModalDeleteMusim";
import ModalEditMusim from "@/components/Modal/Musim/ModalEditMusim";
import ModalTambahMusim from "@/components/Modal/Musim/ModalTambahMusim";

const MusimPage = () => {
  const [Musim, setMusim] = useState([]);
  const { token } = useGetCookie();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalTambah, setModalTambah] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedMusim, setSelectedMusim] = useState(null);
  const [modalEditMusim, setModalEditMusim] = useState(false);

  const filteredMusim = Musim.filter((k) => {
    return (
      k.name.toLowerCase().includes(query.toLowerCase()) ||
      k.start_date.toLowerCase().includes(query.toLowerCase()) ||
      k.end_date.toLowerCase().includes(query.toLowerCase())
    );
  });

  const handleOpenModalDelete = (index) => {
    setSelectedMusim(Musim[index]);
    setModalDelete(true);
  };

  const handleOpenModalEdit = (index) => {
    setSelectedMusim(Musim[index]);
    setModalEditMusim(true);
  };

  useEffect(() => {
    setLoading(true);
    getAllMusim(token)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setMusim(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Move this here
      });
  }, []);

  if (loading) {
    return <div>Loading Musim...</div>;
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Data Musim</h1>
          <button
            className="bg-orange-600 px-4 py-2 text-xs w-max text-white font-semibold rounded"
            onClick={() => setModalTambah(true)}
          >
            Tambah Musim
          </button>
        </div>
        {/* search */}
        <div className="flex items-center mb-4 gap-8">
          <input
            type="text"
            className="border border-gray-600 rounded-lg px-4 py-2 w-full max-w-lg"
            placeholder="Cari Musim"
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
                  Musim Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMusim.map((k, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {k.name}
                  </th>
                  <td className="px-6 py-4">{k.start_date}</td>
                  <td className="px-6 py-4">{k.end_date}</td>
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
        <ModalTambahMusim onClose={() => setModalTambah(false)} />
      )}
      {modalDelete && (
        <ModalDeleteMusim
          onCloseModal={() => setModalDelete(false)}
          Musim={selectedMusim}
        />
      )}
      {modalEditMusim && (
        <ModalEditMusim
          onClose={() => setModalEditMusim(false)}
          id={selectedMusim.id}
        />
      )}
    </>
  );
};

export default MusimPage;
