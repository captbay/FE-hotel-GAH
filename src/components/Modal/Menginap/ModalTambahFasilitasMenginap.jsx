'use client'
import React, { useEffect, useState } from 'react'
import { PlusCircle, MinusCircle } from 'lucide-react'
import useGetCookie from '@/hooks/useGetCookie';
import { getAllFasilitasTambahan, getDataFasilitas, postTambahFasilitasCheckIn, putCekin } from '@/api/api';
import { currencyFormat } from '@/utils/helper';
import { toast } from 'react-toastify';


const ModalTambahFasilitasMenginap = ({
  idReservasi,
  onClose,
  username,
  onSuccess
}) => {
  const { token } = useGetCookie();
  const [fTambahan, setFTambahan] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [fasilitas, setFasilitas] = useState([])
  const [isLoading2, setIsLoading2] = useState(true)



  const _getFasilitasTambahan = async () => {
    setIsLoading(true)
    const { data } = await getAllFasilitasTambahan(token);

    setFTambahan(
      data.data.map((item) => ({
        ...item,
        total: 0,
      }))
    );
    setIsLoading(false)
  };

  const currentFasilitas = fTambahan.map((item) => ({
    ...item,
    total:
      (fasilitas.find((f) => +f.fasilitas_tambahan_id === +item.id)
        ?.jumlah || 0) + item.total,
  }));

  const handleGetFasilitas = async (selectedId) => {
    try {
      setIsLoading2(true)
      const res = await getDataFasilitas(token, idReservasi);
      if (res.status === 200) {
        // setTotalHarga(res.data.data.total_harga_fasilitas);
        setFasilitas(res.data.data.fasilitas);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading2(false)
    }
  };

  useEffect(() => {
    _getFasilitasTambahan();
    handleGetFasilitas()
  }, []);

  const payload = currentFasilitas
    .filter((item) => item.total > 0)
    .map((item) => ({
      fasilitas_tambahan_id: item.id,
      jumlah: item.total,
    }));

  const _postTambah = async () => {

    try {

      if (payload.length > 0) {
        await postTambahFasilitasCheckIn(token, idReservasi, payload);
      }

      onSuccess(true)

      toast.success(`Berhasil menambah fasilitas untuk ${username}`)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    } finally {

      onClose()
      onClearFTambahan()
    }


  }



  const onAddFasilitas = (id) => {
    const newFTambahan = fTambahan.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          total: item.total + 1,
        };
      }
      return item;
    });
    setFTambahan(newFTambahan);
  };

  const onRemoveFasilitas = (id) => {
    if (fTambahan.find((item) => item.id === id).total === 0) return;

    const newFTambahan = fTambahan.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          total: item.total - 1,
        };
      }
      return item;
    });

    setFTambahan(newFTambahan);
  };

  const onClearFTambahan = () => {
    setFTambahan(
      fTambahan.map((item) => ({
        ...item,
        total: 0,
      }))
    );
  };

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
                    Tambah fasilitas untuk <span className='underline'>{username}</span> ?
                  </h3>
                  <p>
                    Silakan pilih fasilitas tambahan yang tersedia
                  </p>

                  {isLoading || isLoading2 || fTambahan.length == 0 ?
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
                    <div className='w-full p-2 my-2 border-2 rounded-lg '>
                      {currentFasilitas.map(({ id, name, harga, total }, index) => (

                        <div key={index} className="flex justify-between mb-2">
                          <div>
                            <p >{name}</p>
                            <p className='text-slate-400'>{currencyFormat(harga)}</p>
                          </div>
                          <div className='flex items-center'>
                            <button onClick={() => onRemoveFasilitas(id)}>
                              <MinusCircle />
                            </button>
                            <div className='w-10 mx-2 text-center rounded bg-slate-100'>{total}</div>
                            <button onClick={() => onAddFasilitas(id)}>
                              <PlusCircle />
                            </button>
                          </div>
                        </div>

                      ))}
                    </div>
                  }

                  <div className='grid justify-start grid-cols-2 gap-2'>

                    <div className='flex justify-start text-left '>
                      <p >Total biaya tambahan</p>
                    </div>

                    <div className='flex items-center justify-between '>
                      <p className='ms-10 whitespace-nowrap'>Rp.</p>
                      <span className='font-bold whitespace-nowrap'>
                        {currencyFormat(currentFasilitas.reduce((acc, item) =>
                          acc + item.total * item.harga, 0), false)
                        },00
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm disabled:cursor-not-allowed hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={_postTambah}
                disabled={payload.length == 0}
              >
                Tambah
              </button>
              <button
                type="button"
                className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  onClose()
                  onClearFTambahan()
                }}
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

export default ModalTambahFasilitasMenginap
