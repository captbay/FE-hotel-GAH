"use client";
import { getAllReservasi, getAllReservasiFO, getAllReservasiForCustomer } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import { useEffect, useState } from "react";
import ModalDetailReservasi from "@/components/Modal/Reservasi/ModalDetailReservasi";
import ModalTTR from "@/components/Modal/Reservasi/ModalTTR";
import ModalCancel from "@/components/Modal/Reservasi/ModalCancel";
import { useReservasiStore } from "@/store/useReservasi";
import { useRouter } from "next/navigation";
import { currencyFormat } from "@/utils/helper";
import ModalCheckInMenginap from "@/components/Modal/Menginap/ModalCheckInMenginap";
import ModalTambahFasilitasMenginap from "@/components/Modal/Menginap/ModalTambahFasilitasMenginap";
import ModalCheckOutMenginap from "@/components/Modal/Menginap/ModalCheckOutMenginap";
import ModalCetakTandaTerimaMenginap from "@/components/Modal/Menginap/ModalCetakTandaTerimaMenginap";

const MenginapPage = () => {

  const router = useRouter();
  const { token, role } = useGetCookie();

  const [dataMenginap, setDataMenginap] = useState([]);
  //Searching & Filtering
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [selectedIDReservasi, setSelectedIDReservasi] = useState({
    idReservasi: null,
    username: ''
  })

  const [selectedReservasi, setSelectedReservasi] = useState(null);

  const [hasDataUpdate, setHasDataUpdate] = useState(true)

  const [modal, setModal] = useState({
    type: '',
    isOpen: false
  })

  const setIdReservasi = useReservasiStore((state) => state.setIdReservasi);

  const filteredData = dataMenginap.filter((itm) => (
    (itm.kode_booking?.toLowerCase().includes(query.toLowerCase()) ||
      itm.customer.name?.toLowerCase().includes(query.toLowerCase()) ||
      itm.tanggal_reservasi?.toLowerCase().includes(query.toLowerCase()) ||
      itm.status?.toLowerCase().includes(query.toLowerCase()) ||
      itm.total_jaminan?.toString().includes(query.toString()) ||
      itm.total_deposit?.toString().includes(query.toString()) ||
      itm.total_harga?.toString().includes(query.toString()) ||
      itm.tanggal_pembayaran_lunas?.toLowerCase().includes(query.toLowerCase())) &&
    itm.status?.toLowerCase().includes(statusFilter.toLowerCase())
  ));

  const _getAllReservasiFO = async () => {
    try {
      setIsLoading(true)
      const res = await getAllReservasiFO(token)
      if (res.data.success) {
        setDataMenginap(res?.data?.data)
      }
    } catch (error) {
      console.log(error)
      setDataMenginap([])
    } finally {
      setIsLoading(false)
      setHasDataUpdate(false)
    }
  }

  useEffect(() => {
    if (!role) return;
    if (hasDataUpdate) {
      _getAllReservasiFO()
    }
  }, [role, hasDataUpdate]);

  // const handleUpdateData = (data) => {
  //   setDataMenginap(prev => prev.map(item => (
  //     item.id == data.id ? item = data : item
  //   )))
  // }

  const getStatusCell = (status) => {
    let statusClass, statusText;

    switch (status) {
      case 'belum cekin':
        statusClass = 'text-orange-500';
        statusText = 'Belum Cekin';
        break;
      case 'sudah cekin':
        statusClass = 'text-green-200';
        statusText = 'Sudah Cekin';
        break;
      case 'cek in':
        statusClass = 'text-blue-500';
        statusText = 'Check In';
        break;
      case 'selesai':
        statusClass = 'text-green-500';
        statusText = 'Selesai';
        break;
      default:
        return null;
    }

    return { statusClass, statusText }
  }

  const openModal = (type) => modal.type == type && modal.isOpen

  const handleOpenModalDetail = (index) => {
    setSelectedReservasi(dataMenginap[index]);

    setModal({
      type: 'detail',
      isOpen: true
    })
  };

  const clearSelectedIDReservasi = () => setSelectedIDReservasi({ idReservasi: null, username: '' })

  const handleCloseModal = () => {
    setModal({
      type: '',
      isOpen: false
    })
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Data Tamu Menginap</h1>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            className="w-full max-w-lg px-4 py-2 border border-gray-600 rounded-lg"
            placeholder="Cari data tamu..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <select
            className="max-w-lg px-4 py-2 border border-gray-600 rounded-lg "
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">Semua</option>
            <option value="belum cekin">Belum Check In</option>
            <option value="belum bayar jaminan">Belum Bayar Jaminan</option>
            <option value="cek in">Sedang Check In</option>
            <option value="cancel">Cancel</option>
            <option value="selesai">Selesai</option>
          </select>
        </div>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  No Booking
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Reservasi
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
                  Pembayaran
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            {isLoading ? (
              <div className="w-full mx-3 my-4 text-center">
                <p className="text-center">Loading data...</p>
              </div>
            ) : filteredData.map((item, index) => {
              const dateArray = item.tanggal_reservasi.split("-");
              const formattedDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
              const { statusClass, statusText } = getStatusCell(item.status)

              return (
                <tbody key={index}>

                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{item.kode_booking}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.customer.name}
                    </th>
                    <td className="px-6 py-4">{item.customer.email}</td>
                    <td className="px-6 py-4">{formattedDate}</td>
                    <td className="px-6 py-4">{currencyFormat(item.total_jaminan)}</td>
                    <td className="px-6 py-4">{currencyFormat(item.total_deposit)}</td>
                    <td className="px-6 py-4">{currencyFormat(item.total_harga)}</td>
                    <td className="px-6 py-4">{item.tanggal_pembayaran_lunas ?? 'Belum bayar'}</td>

                    {/* belum cekin, belum bayar jaminan, sudah cekin, cancel, selesai */}
                    <td className="px-6 py-4">
                      <span className={`${statusClass} whitespace-nowrap`}>{statusText}</span>
                    </td>

                    <td className="flex gap-2 px-6 py-4 item-center">
                      <button
                        className="px-2 py-1 text-white bg-blue-500 rounded "
                        onClick={() => handleOpenModalDetail(index)}
                      >
                        Detail
                      </button>

                      {statusText == 'Selesai' && (
                        <button
                          className="px-2 py-1 text-white bg-yellow-500 rounded whitespace-nowrap"
                          onClick={() => {
                            setModal({
                              type: 'cetak',
                              isOpen: true
                            })
                            setSelectedIDReservasi({
                              idReservasi: item.id,
                              username: item.customer.name
                            })
                          }}
                        >
                          Cetak Tanda Terima
                        </button>
                      )}

                      {statusText == 'Belum Cekin' && (
                        <button
                          className="px-2 py-1 text-white rounded bg-lime-500 whitespace-nowrap"
                          onClick={() => {
                            setModal({
                              type: 'cekin',
                              isOpen: true
                            })
                            setSelectedIDReservasi({
                              idReservasi: item.id,
                              username: item.customer.name
                            })
                          }}
                        >
                          Check In
                        </button>
                      )}

                      {statusText == 'Check In' && (
                        <>
                          <button
                            className="px-2 py-1 text-white bg-red-500 rounded whitespace-nowrap"
                            onClick={() => {
                              setModal({
                                type: 'cekout',
                                isOpen: true
                              })
                              setSelectedReservasi(dataMenginap[index]);
                              setSelectedIDReservasi({
                                idReservasi: item.id,
                                username: item.customer.name
                              })
                            }}
                          >
                            Check Out
                          </button>

                          <button
                            className="px-2 py-1 text-white bg-orange-500 rounded whitespace-nowrap"
                            onClick={() => {
                              setModal({
                                type: 'tambah',
                                isOpen: true
                              })
                              setSelectedIDReservasi({
                                idReservasi: item.id,
                                username: item.customer.name
                              })
                            }}
                          >
                            Tambah Fasilitas
                          </button>
                        </>
                      )}

                      {/* {item.status != "belum bayar jaminan" &&
                        item.status != "cancel" &&
                        item.status != "selesai" ? (
                        <button
                          className="px-2 py-1 mt-1 text-white bg-yellow-500 rounded whitespace-nowrap"
                          onClick={() => handleOpenModalPDF(index)}
                        >
                          Cetak Tanda Terima
                        </button>
                      ) : null} */}
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        </div>
      </div>

      {openModal('cekin') && (
        <ModalCheckInMenginap
          idReservasi={selectedIDReservasi.idReservasi}
          username={selectedIDReservasi.username}
          onSuccess={() => setHasDataUpdate(true)}
          onClose={() => {
            handleCloseModal()
            clearSelectedIDReservasi()
          }}
        />
      )}

      {openModal('tambah') && (
        <ModalTambahFasilitasMenginap
          idReservasi={selectedIDReservasi.idReservasi}
          username={selectedIDReservasi.username}
          onSuccess={() => setHasDataUpdate(true)}
          onClose={() => {
            handleCloseModal()
            clearSelectedIDReservasi()
          }}
        />
      )}

      {openModal('cekout') && (
        <ModalCheckOutMenginap
        dataReservasi={selectedReservasi}
          idReservasi={selectedIDReservasi.idReservasi}
          username={selectedIDReservasi.username}
          onSuccess={() => setHasDataUpdate(true)}
          onClose={() => {
            handleCloseModal()
            setSelectedReservasi(null)
            clearSelectedIDReservasi()
          }}
        />
      )}

      {openModal('cetak') && (
        <ModalCetakTandaTerimaMenginap
          idReservasi={selectedIDReservasi.idReservasi}
          username={selectedIDReservasi.username}
          onSuccess={() => setHasDataUpdate(true)}
          onClose={() => {
            handleCloseModal()
            clearSelectedIDReservasi()
          }}
        />
      )}

      {openModal('detail') && (
        <ModalDetailReservasi
          onCloseModal={() => {
            handleCloseModal()
            clearSelectedIDReservasi()
          }}
          Reservasi={selectedReservasi}
        />
      )}

      {/* {modalTTR && (
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
          tanggal_reservasi={selectedReservasi.tanggal_reservasi}
        />
      )} */}
    </>
  );
};

export default MenginapPage;
