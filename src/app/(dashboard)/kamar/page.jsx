"use client";
import { getAllKamar } from "@/api/api";
import HotelCard from "@/components/HotelCard";
import ModalDeleteKamar from "@/components/Modal/Kamar/ModalDeleteKamar";
import ModalEditKamar from "@/components/Modal/Kamar/ModalEditKamar";
import ModalTambahKamar from "@/components/Modal/Kamar/ModalTambahKamar";
import useGetCookie from "@/hooks/useGetCookie";
import { useEffect, useState } from "react";

const KamarPage = () => {
  const [kamar, setKamar] = useState([]);
  const { token } = useGetCookie();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalTambah, setModalTambah] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedKamar, setSelectedKamar] = useState(null);
  const [modalEditKamar, setModalEditKamar] = useState(false);

  const filteredKamar = kamar.filter((k) => {
    return (
      k.no_kamar.toLowerCase().includes(query.toLowerCase()) ||
      k.jenis_kamar.name.toLowerCase().includes(query.toLowerCase()) ||
      k.jenis_kamar.bed.toLowerCase().includes(query.toLowerCase()) ||
      k.jenis_kamar.total_bed.toString().includes(query.toString())
    );
  });

  const handleOpenModalDelete = (kamar) => {
    setSelectedKamar(kamar);
    setModalDelete(true);
  };

  const handleOpenModalEdit = (kamar) => {
    setSelectedKamar(kamar);
    setModalEditKamar(true);
  };

  useEffect(() => {
    setLoading(true);
    getAllKamar(token)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setKamar(res.data.data);
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
    return <div>Loading Kamar...</div>;
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Data Kamar</h1>
          <button
            className="bg-orange-600 px-4 py-2 text-xs w-max text-white font-semibold rounded"
            onClick={() => setModalTambah(true)}
          >
            Tambah Kamar
          </button>
        </div>
        {/* search */}
        <div className="flex items-center mb-4 gap-8">
          <input
            type="text"
            className="border border-gray-600 rounded-lg px-4 py-2 w-full max-w-lg"
            placeholder="Cari kamar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredKamar.map((k) => {
            return (
              <HotelCard
                key={k.id}
                data={k}
                onDelete={() => handleOpenModalDelete(k)}
                onEdit={() => handleOpenModalEdit(k)}
              />
            );
          })}
        </div>
      </div>
      {modalTambah && (
        <ModalTambahKamar onClose={() => setModalTambah(false)} />
      )}
      {modalDelete && (
        <ModalDeleteKamar
          onCloseModal={() => setModalDelete(false)}
          kamar={selectedKamar}
        />
      )}
      {modalEditKamar && (
        <ModalEditKamar
          onClose={() => setModalEditKamar(false)}
          id={selectedKamar.id}
        />
      )}
    </>
  );
};

export default KamarPage;
