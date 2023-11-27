"use client";
import useGetCookie from "@/hooks/useGetCookie";
import { useState } from "react";
import ChartLaporan2 from "./component/ChartLaporan2";
import ChartLaporan3 from "./component/ChartLaporan3";
import ModalDownloadCustomerBaru from "./component/ModalDownloadCustomerBaru";
import ModalDownloadPendapatanBulanan from "./component/ModalDownloadPendapatanBulanan";
import ModalDownloadJumlahTamu from "./component/ModalDownloadJumlahTamu";

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
          <h1 className="text-2xl font-bold">Data Tamu Menginap</h1>
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
                // _getLaporan1();
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
            <h1 className="text-xl font-bold">Laporan Pendapatan Bulanan</h1>
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

        <ChartLaporan2 year={year} />

        <hr className="my-4" />

        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Laporan Jumlah Tamu</h1>
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

        <ChartLaporan3 year={year} />
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

    </>
  );
};

export default ReportPage;
