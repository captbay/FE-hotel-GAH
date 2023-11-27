'use client'
import React, { useEffect, useState } from 'react'
import { PlusCircle, MinusCircle } from 'lucide-react'
import useGetCookie from '@/hooks/useGetCookie';
import { cetakInvoices, getAllFasilitasTambahan, postTambahFasilitasCheckIn, putCekin } from '@/api/api';
import { currencyFormat } from '@/utils/helper';
import { toast } from 'react-toastify';


const ModalCetakTandaTerimaMenginap = ({
  idReservasi,
  onClose,
  username,
  onSuccess
}) => {
  const { token } = useGetCookie();
  const [pdf, setPdf] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  const handleCetak = async () => {
    try {
      setIsLoading(true);
      const { data } = await cetakInvoices(token, idReservasi);

      const pdf = new Blob([data], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(pdf);

      setPdf(downloadUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(pdf)
    }
  }, [])

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
          <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
            <div className="pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start ">
                <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    className="mb-4 text-xl font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Cetak Tanda Terima untuk <span className='underline'>{username}</span> ?
                  </h3>

                  {pdf.length != 0 ?

                    <iframe
                      src={pdf}
                      width="100%"
                      height="500px"
                    /> :
                    isLoading ?
                      <div className='flex justify-center my-4'>
                        <div
                          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status">
                          <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                          >Loading...</span
                          >
                        </div>
                      </div>
                      :
                      <p>
                        Apakah anda ingin mencetak tanda terima untuk reservasi atasnama <span className='underline'>{username}</span> ?
                      </p>
                  }

                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">

              {pdf.length == 0 && (
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm disabled:cursor-not-allowed hover:bg-red-500 sm:ml-3 sm:w-auto"
                  disabled={isLoading}
                  onClick={handleCetak}
                >
                  Ya, Cetak
                </button>
              )}

              <button
                type="button"
                className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onClose}
              >
                {pdf.length == 0 ? 'Batal' : 'Tutup'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCetakTandaTerimaMenginap
