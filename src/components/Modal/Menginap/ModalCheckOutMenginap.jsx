'use client'
import React, { useEffect, useState } from 'react'
import { PlusCircle, MinusCircle } from 'lucide-react'
import useGetCookie from '@/hooks/useGetCookie';
import { createInvoices, getAllFasilitasTambahan, getDataFasilitas, postTambahFasilitasCheckIn, putCekin, putCheckOut } from '@/api/api';
import { currencyFormat } from '@/utils/helper';
import { toast } from 'react-toastify';


const ModalCheckOutMenginap = ({
  dataReservasi,
  idReservasi,
  onClose,
  username,
  onSuccess
}) => {
  const { token, id: pegawai_id } = useGetCookie();
  const [lunasi, setLunasi] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [totalHarga, setTotalHarga] = useState(0);
  const [error, setError] = useState('')
  const [loadingCekout, setLoadingCekout] = useState(false);
  const [isDirty, setIsDirty] = useState(false)
  const [sisanyaTagihan, setSisanyaTagihan] = useState(0)


  const handleGetFasilitas = async (selectedId) => {
    try {
      setIsLoading(true);
      const res = await getDataFasilitas(token, selectedId);
      if (res.status === 200) {
        setTotalHarga(res.data.data.total_harga_fasilitas);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetFasilitas(idReservasi)
  }, [])

  const handleCheckOut = async () => {
    try {
      setLoadingCekout(true);
      const res = await Promise.all([
        putCheckOut(token, idReservasi),
        createInvoices(
          token,
          {
            pegawai_id,
          },
          idReservasi
        ),
      ]);

      if (res[0].status === 200 && res[1].status === 200) {
        toast.success(res[0].data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan pada server')
    } finally {
      setLoadingCekout(false);
      onSuccess()
      onClose()
    }
  };

  const deposit = 300000

  const penginapan = dataReservasi?.total_harga -
    dataReservasi?.total_jaminan

  const fasilitasTambahan = totalHarga

  const sisaDeposit = deposit - penginapan - fasilitasTambahan

  const sisaTagihan = sisaDeposit < 0 ? sisaDeposit * - 1 : 0

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '');

    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(inputValue);
    e.target.value = formattedValue;

    if (Number(inputValue) !== sisaTagihan) {
      setError('Masukkan jumlah pembayaran sesuai tagihan');
    } else {
      setError('');
    }
    setIsDirty(false)
  }

  useEffect(() => {
    if (sisaTagihan) {
      setSisanyaTagihan(sisaTagihan)
    }
  }, [sisaTagihan])

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
                    Yakin Check Out Reservasi untuk <span className='underline'>{username}</span> ?
                  </h3>
                  <p>
                    Setelah check out, Status reservasi ini akan berubah menjadi <span className='px-2 text-sm text-white bg-red-500 rounded-2xl whitespace-nowrap'>Check Out</span> dan <span className='text-red-500'>tidak dapat dikembalikan lagi.</span>
                  </p>

                  {lunasi ?
                    <div className='my-4'>
                      <p>
                        Lunasi tagihan anda seniai <span className='font-bold'>{currencyFormat(sisaTagihan)}</span>
                      </p>
                      <div className=''>

                        <input
                          type='text'
                          className='w-full px-2 py-1 my-2 border rounded-lg'
                          placeholder='Masukkan jumlah pembayaran anda'
                          onChange={handleChange}
                        />
                        <p className='text-sm text-red-500'>{error}</p>
                      </div>
                    </div>
                    :

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
                      <div className='grid justify-start grid-cols-2 gap-2 mt-4'>

                        <div className='flex justify-start text-left '>
                          <p >Tagihan penginapan</p>
                        </div>

                        <div className='flex items-start justify-between '>
                          <p className='ms-10 whitespace-nowrap'>Rp.</p>
                          {currencyFormat(penginapan, false)},00
                        </div>

                        <div className='flex justify-start text-left '>
                          <p >Total deposit</p>
                        </div>

                        <div className='flex items-start justify-between '>
                          <p className='ms-10 whitespace-nowrap'>Rp.</p>
                          {currencyFormat(deposit, false)},00
                        </div>

                        <div className='flex justify-start text-left '>
                          <p >Tagihan fasilitas tambahan</p>
                        </div>

                        <div className='flex items-start justify-between '>
                          <p className='ms-10 whitespace-nowrap'>Rp.</p>
                          {currencyFormat(fasilitasTambahan, false)},00
                        </div>

                        {/* Total */}
                        <hr className='my-4' />
                        <hr className='my-4' />
                        <div className='flex justify-start text-left '>
                          <p >Total tagihan</p>
                        </div>

                        <div className='flex items-start justify-between '>
                          <p className='ms-10 whitespace-nowrap'>Rp.</p>
                          { currencyFormat(sisanyaTagihan, false)},00

                        </div>

                        <div className='flex justify-start text-left '>
                          <p >Sisa deposit</p>
                        </div>

                        <div className='flex items-start justify-between '>
                          <p className='ms-10 whitespace-nowrap'>Rp.</p>
                          {currencyFormat(sisaDeposit <= 0 ? 0 : sisaDeposit, false)},00
                        </div>


                      </div>
                  }


                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">

              {sisanyaTagihan > 0?
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm disabled:cursor-not-allowed hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={() => {
                    setLunasi(prev => !prev)
                    if (lunasi) {
                      setSisanyaTagihan(0)
                    } else {
                      setIsDirty(true)
                    }
                  }}
                  disabled={error || isDirty}
                >
                  { !lunasi ? 'Lunasi Sekarang' : 'Bayar Sekarang'}
                </button> :
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm disabled:cursor-not-allowed hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={handleCheckOut}
                  disabled={loadingCekout}
                >
                  Check Out Sekarang
                </button>
              }
              <button
                type="button"
                className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onClose}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCheckOutMenginap
