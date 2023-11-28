"use client";
import useGetCookie from "@/hooks/useGetCookie";
import { useState } from "react";
import ChartLaporan2 from "./component/ChartLaporan2";
import ChartLaporan3 from "./component/ChartLaporan3";
import ModalDownloadCustomerBaru from "./component/ModalDownloadCustomerBaru";
import ModalDownloadPendapatanBulanan from "./component/ModalDownloadPendapatanBulanan";
import ModalDownloadJumlahTamu from "./component/ModalDownloadJumlahTamu";
import ModalDownloadCustomerReservasiTerbanyak from "./component/ModalDownloadCustomerReservasiTerbanyak";

const ReportPage = () => {

  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState(thisYear);
  const yearOptions = [
    { value: thisYear, label: thisYear },
    { value: thisYear - 1, label: thisYear - 1 },
    { value: thisYear - 2, label: thisYear - 2 },
  ];

  const { token } = useGetCookie();

  const [modal, setModal] = useState({
    type: '',
    isOpen: false
  })

  const [showChart1, setShowChart1] = useState(true)
  const [showChart2, setShowChart2] = useState(true)

  const openModal = (type) => modal.type == type && modal.isOpen

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
          <h1 className="text-2xl font-bold">Data Report</h1>
        </div>

        <div className="flex items-center gap-4 mb-4">

          <select
            className="max-w-lg px-4 py-2 border border-gray-600 rounded-lg "
            value={year}
            onChange={e => setYear(e.target.value)}
          >
            {yearOptions.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Laporan Customer Baru</h1>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded"
              onClick={() => {
                setModal({
                  type: 'customer',
                  isOpen: true
                })
              }}
            >Download</button>
          </div>
        </div>

        <hr className="my-4" />

        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">Laporan Pendapatan Bulanan</h1>
              <span
                className="px-2 text-sm rounded-full cursor-pointer bg-slate-200"
                onClick={() => setShowChart1(prev => !prev)}
              >
                {showChart1 ? 'Hide Chart' : 'Show Chart'}
              </span>
            </div>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded"
              onClick={() => {
                setModal({
                  type: 'pendapatan',
                  isOpen: true
                })
              }}
            >Download</button>
          </div>
        </div>

        {showChart1 && <ChartLaporan2 year={year} />}

        <hr className="my-4" />

        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">Laporan Jumlah Tamu</h1>
              <span
                className="px-2 text-sm rounded-full cursor-pointer bg-slate-200"
                onClick={() => setShowChart2(prev => !prev)}
              >
                {showChart2 ? 'Hide Chart' : 'Show Chart'}
              </span>
            </div>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded"
              onClick={() => {
                setModal({
                  type: 'tamu',
                  isOpen: true
                })
              }}
            >Download</button>
          </div>
        </div>

        {showChart2 && <ChartLaporan3 year={year} />}
      </div>

      <hr className="my-4" />
      <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Laporan Customer Reservasi Terbanyak</h1>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded"
              onClick={() => {
                setModal({
                  type: 'reservasi',
                  isOpen: true
                })
              }}
            >Download</button>
          </div>
        </div>

      {openModal('customer') && (
        <ModalDownloadCustomerBaru
          onClose={handleCloseModal}
          year={year}
          token={token}
        />
      )}

      {openModal('pendapatan') && (
        <ModalDownloadPendapatanBulanan
          onClose={handleCloseModal}
          year={year}
          token={token}
        />
      )}

      {openModal('tamu') && (
        <ModalDownloadJumlahTamu
          onClose={handleCloseModal}
          year={year}
          token={token}
        />
      )}

      {openModal('reservasi') && (
        <ModalDownloadCustomerReservasiTerbanyak
          onClose={handleCloseModal}
          year={year}
          token={token}
        />
      )}

    </>
  );
};

export default ReportPage;
