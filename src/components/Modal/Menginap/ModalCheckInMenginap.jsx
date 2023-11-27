'use client'
import React, { useEffect, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDown, PlusCircle, MinusCircle } from 'lucide-react'
import useGetCookie from '@/hooks/useGetCookie';
import { getAllFasilitasTambahan, postTambahFasilitasCheckIn, putCekin } from '@/api/api';
import { currencyFormat } from '@/utils/helper';
import { toast } from 'react-toastify';


const ModalCheckInMenginap = ({
  idReservasi,
  onClose,
  username,
  onSuccess
}) => {
  const { token } = useGetCookie();
  const [fTambahan, setFTambahan] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const _getFasilitasTambahan = async () => {
    try {

      setIsLoading(true)
      const { data } = await getAllFasilitasTambahan(token);

      setFTambahan(
        data.data.map((item) => ({
          ...item,
          total: 0,
        }))
      );
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    _getFasilitasTambahan();
  }, []);

  const _putCekin = async () => {
    const payload = fTambahan
      .filter((item) => item.total > 0)
      .map((item) => ({
        fasilitas_tambahan_id: item.id,
        jumlah: item.total,
      }));

    try {
      await putCekin(token, idReservasi)

      if (payload.length > 0) {
        await postTambahFasilitasCheckIn(token, idReservasi, payload);
      }

      onSuccess(true)

      toast.success(`${username} Berhasil Check In`)
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
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    className="mb-4 text-xl font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Yakin ingin <span className='underline'>Check In</span> reservasi ini?
                  </h3>
                  <p>
                    Setelah check in, Status reservasi ini akan berubah menjadi <span className='px-2 text-sm text-white rounded-2xl bg-lime-500 whitespace-nowrap'>Check In</span> dan <span className='text-red-500'>tidak dapat dikembalikan lagi.</span>
                  </p>

                  {isLoading ?
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
                    <Accordion.Root
                      className="bg-mauve6 w-full my-4 rounded-md shadow-[0_5px_10px] shadow-black/5"
                      type="single"
                      collapsible
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger >
                          <span className='text-base'>Tambah Fasilitas <span className='ms-4'>(Opsional)</span></span>
                        </AccordionTrigger>

                        {fTambahan.map(({ id, name, harga, total }, index) => (

                          <AccordionContent key={index}>
                            <div className="flex flex-col justify-between gap-2">
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
                            <hr className='mt-4' />
                          </AccordionContent>
                        ))}
                      </AccordionItem>

                    </Accordion.Root>
                  }
                  <div className='grid justify-start grid-cols-2 gap-2'>


                    <div className='flex justify-start '>
                      <p >Total biaya tambahan:</p>
                    </div>

                    <div className='flex items-center justify-between '>
                      <p className='ms-10 whitespace-nowrap'>Rp.</p>
                      <span className='font-bold whitespace-nowrap'>
                        {currencyFormat(fTambahan.reduce((acc, item) =>
                          acc + item.total * item.harga, 0), false)
                        },00
                      </span>
                    </div>

                    <div className='flex justify-start text-left '>
                      <p >Total deposit yang harus dibayar:</p>
                    </div>

                    <div className='flex items-center justify-between '>
                      <p className='ms-10 whitespace-nowrap'>Rp.</p>
                      <span className='font-bold whitespace-nowrap'>
                        {currencyFormat(300000, false)},00
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={_putCekin}
              >
                Check In Sekarang
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

export default ModalCheckInMenginap


const AccordionItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={classNames(
      'focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={classNames(
        'text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDown
        className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames(
      'text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[15px] px-5">{children}</div>
  </Accordion.Content>
));