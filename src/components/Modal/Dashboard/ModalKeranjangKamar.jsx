// "use client";

// import React, { useEffect, useState } from "react";
// import { createKamar, getCustomerGrup } from "@/api/api";
// import Input from "@/components/Input";
// import { dateFormat, fetcher, getRoomImage } from "@/utils/helper";

// import ReactSelect from "react-select";
// import { toast } from "react-toastify";

// // reservasi
// import { useReservasiStore } from "@/store/useReservasi";
// import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";

// // cookies
// import useGetCookie from "@/hooks/useGetCookie";

// // api
// import { postReservasi } from "@/api/api";

// import { useRouter } from "next/navigation";

// const ModalKeranjangKamar = ({ onClose }) => {
//   const { token, role } = useGetCookie();
//   const router = useRouter();

//   // pegawai
//   const [grup, setGrup] = useState([]);
//   const custGrup_idRef = React.useRef(null);

//   //   reservasi
//   const cart = useReservasiStore((state) => state.cart);
//   const total = useReservasiStore((state) => state.total);
//   const startDate = useReservasiStore((state) => state.startDate);
//   const endDate = useReservasiStore((state) => state.endDate);
//   const people = useReservasiStore((state) => state.people);
//   const setPeople = useReservasiStore((state) => state.setPeople);
//   const removeFromCart = useReservasiStore((state) => state.removeFromCart);
//   const note = useReservasiStore((state) => state.note);
//   const setIdReservasi = useReservasiStore((state) => state.setIdReservasi);
//   const setIdCustGrup = useReservasiStore((state) => state.setIdCustGrup);
//   const idCustGrup = useReservasiStore((state) => state.idCustGrup);
//   const { name } = useGetCookie();
//   const setNote = useReservasiStore((state) => state.setNote);
//   const { id } = useGetCookie();
//   const setCart = useReservasiStore((state) => state.setCart);
//   const setStartDate = useReservasiStore((state) => state.setStartDate);
//   const setEndDate = useReservasiStore((state) => state.setEndDate);

//   const handleAddPeople = (type) => {
//     setPeople({
//       ...people,
//       [type]: people[type] + 1,
//     });
//   };

//   const handleSubmit = () => {
//     if (role == "SM") {
//       setIdCustGrup(custGrup_idRef.current.getValue()[0].value);
//     }

//     const payload = {
//       customer_id: role == "SM" ? idCustGrup : id,
//       pegawai_id: role == "SM" ? id : null,
//       tanggal_reservasi: dateFormat(startDate),
//       tanggal_end_reservasi: dateFormat(endDate),
//       dewasa: people.dewasa,
//       anak: people.anak,
//       note: note,
//       kamar: cart.map((item) => {
//         return {
//           kamar_id: item.id,
//           total_harga: item.harga,
//         };
//       }),
//     };

//     const totalPeople = people.dewasa + people.anak;
//     if (totalPeople === 0) {
//       toast.error("Jumlah orang tidak boleh 0");
//       return;
//     }

//     postReservasi(token, payload)
//       .then((res) => {
//         console.log(res);
//         if (res.status === 200 || res.status === 201) {
//           setIdReservasi(res.data.id_reservasi);
//           // set useReservasiStore to default
//           setCart([]);
//           setStartDate(null);
//           setEndDate(null);
//           setNote("");
//           setPeople({
//             dewasa: 0,
//             anak: 0,
//           });
//           toast.success("Berhasil reservasi");
//           onClose();
//           if (role == "SM") {
//             setTimeout(() => {
//               router.push("/resume-reservasi-grup");
//             }, 1000);
//           } else {
//             setTimeout(() => {
//               router.push("/resume-reservasi");
//             }, 1000);
//           }
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         if (Array.isArray(error?.response?.data?.message)) {
//           error?.response?.data?.message.map((err) => {
//             toast.error(err);
//           });
//         } else {
//           toast.error(error?.response?.data?.message);
//         }
//       });
//   };

//   useEffect(() => {
//     getCustomerGrup(token)
//       .then((res) => {
//         if (res.status === 200 || res.status === 201) {
//           setGrup(res.data.data);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const grupOption = grup.map((item) => {
//     return {
//       value: item.id,
//       label: item.name + " - " + item.nama_insitusi,
//     };
//   });

//   const handleDecrementPeople = (type) => {
//     setPeople({
//       ...people,
//       [type]: people[type] - 1,
//     });
//   };

//   return (
//     <>
//       <div className="max-w-5xl mx-auto">
//         <div
//           id="authentication-modal"
//           aria-hidden="true"
//           className="bg-gray-500 bg-opacity-75 transition-opacity overflow-x-hidden overflow-y-auto fixed h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center"
//         >
//           <div className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full md:h-auto">
//             <div className="bg-white border rounded-lg shadow relative">
//               <div className="flex justify-end p-2">
//                 <button
//                   type="button"
//                   className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
//                   data-modal-toggle="authentication-modal"
//                   onClick={onClose}
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fill-rule="evenodd"
//                       d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                       clip-rule="evenodd"
//                     ></path>
//                   </svg>
//                 </button>
//               </div>
//               <div>
//                 <div className="modal-box w-full max-w-7xl">
//                   <h3 className="text-xl font-medium text-gray-900">
//                     Form Reservasi
//                   </h3>
//                   <div className="flex-1 flex flex-col justify-center overflow-y-auto py-8 items-center">
//                     {cart.length > 0 ? (
//                       <>
//                         {cart.map((item, index) => (
//                           <div
//                             key={index}
//                             className="flex justify-between items-center w-full p-4 border-b"
//                           >
//                             <div className="flex-1">
//                               <div className="flex gap-2">
//                                 <h1 className="text-lg font-bold">
//                                   {item.no_kamar} - {item.nama_kamar}
//                                 </h1>
//                               </div>
//                               <span className="uppercase text-sm">
//                                 {item.tipe_bed}
//                               </span>
//                               <p className="text-sm font-bold">
//                                 {new Intl.NumberFormat("id-ID", {
//                                   style: "currency",
//                                   currency: "IDR",
//                                 }).format(item.harga)}
//                               </p>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <Trash2
//                                 size={24}
//                                 className="btn btn-circle btn-sm bg-red-300 p-1"
//                                 onClick={() => removeFromCart(item)}
//                               />
//                             </div>
//                           </div>
//                         ))}
//                       </>
//                     ) : (
//                       <div className="flex flex-col justify-center items-center">
//                         <h1 className="text-lg font-bold">
//                           Tidak ada kamar yang dipesan
//                         </h1>
//                         <p className="text-sm text-gray-500">
//                           Silahkan pilih kamar yang tersedia
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                   <div className="mt-4 max-w-7xl">
//                     <h2>
//                       <span className="text-lg font-semibold">
//                         Detail Reservasi
//                       </span>
//                     </h2>
//                     <div className="flex flex-col gap-4 mt-4 ">
//                       {role == "SM" ? (
//                         <div className="flex flex-col gap-1">
//                           <label htmlFor="nama">
//                             Customer <span className="text-red-500">*</span>
//                           </label>
//                           <ReactSelect
//                             options={grupOption}
//                             ref={custGrup_idRef}
//                           />
//                         </div>
//                       ) : (
//                         <div className="flex flex-col gap-1">
//                           <label htmlFor="nama">
//                             Nama <span className="text-red-500">*</span>
//                           </label>
//                           <Input
//                             type="text"
//                             name="nama"
//                             id="nama"
//                             placeholder="Nama"
//                             className="input input-bordered"
//                             value={name}
//                             disabled
//                           />
//                         </div>
//                       )}
//                       {/* startdate and enddate */}
//                       <div className="flex flex-col gap-1">
//                         <label htmlFor="startdate">
//                           Tanggal Mulai Reservasi{" "}
//                           <span className="text-red-500">*</span>
//                         </label>
//                         <Input
//                           type="date"
//                           name="startdate"
//                           id="startdate"
//                           placeholder="Tanggal Mulai Reservasi"
//                           className="input input-bordered"
//                           value={dateFormat(startDate)}
//                           disabled
//                         />
//                       </div>
//                       <div className="flex flex-col gap-1">
//                         <label htmlFor="enddate">
//                           Tanggal Selesai Reservasi{" "}
//                           <span className="text-red-500">*</span>
//                         </label>
//                         <Input
//                           type="date"
//                           name="enddate"
//                           id="enddate"
//                           placeholder="Tanggal Selesai Reservasi"
//                           className="input input-bordered"
//                           value={dateFormat(endDate)}
//                           disabled
//                         />
//                       </div>
//                       {/* dewasa and anak  */}
//                       <div className="flex items-center gap-8">
//                         <label htmlFor="nama">
//                           Dewasa <span className="text-red-500">*</span>
//                         </label>
//                         <div className="flex items-center gap-4">
//                           <MinusCircle
//                             size={32}
//                             className="cursor-pointer"
//                             onClick={() => handleDecrementPeople("dewasa")}
//                           />
//                           <div className="px-4 py-2 bg-gray-200 rounded-sm select-none">
//                             {people.dewasa}
//                           </div>
//                           <PlusCircle
//                             size={32}
//                             className="cursor-pointer"
//                             onClick={() => handleAddPeople("dewasa")}
//                           />
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-8">
//                         <label htmlFor="nama">
//                           Anak <span className="text-red-500">*</span>
//                         </label>
//                         <div className="flex items-center gap-4">
//                           <MinusCircle
//                             size={32}
//                             className="cursor-pointer"
//                             onClick={() => handleDecrementPeople("anak")}
//                           />
//                           <div className="px-4 py-2 bg-gray-200 rounded-sm select-none">
//                             {people.anak}
//                           </div>
//                           <PlusCircle
//                             size={32}
//                             className="cursor-pointer"
//                             onClick={() => handleAddPeople("anak")}
//                           />
//                         </div>
//                       </div>
//                       <div className="flex flex-col gap-1">
//                         <label htmlFor="enddate">Note (optional)</label>
//                         <textarea
//                           className="textarea textarea-bordered"
//                           placeholder="makanan"
//                           onChange={(e) => setNote(e.target.value)}
//                         ></textarea>
//                       </div>
//                     </div>
//                     {/* button end */}
//                   </div>
//                   {cart?.length > 0 && (
//                     <>
//                       <p className="text-sm text-gray-500 mt-8">
//                         <span className="text-red-500">*</span>Dengan Menekan
//                         Tombol Reservasi Sekarang Maka Anda Setuju dengan
//                         Seluruh Kebijakan yang ada di dalam Hotel dan setuju
//                         bahwa ingin reservasi kamar
//                       </p>
//                       <div className="flex justify-end gap-2 mt-2">
//                         <button
//                           className="bg-blue-500 px-4 py-4 text-xs w-max text-white font-semibold rounded"
//                           onClick={handleSubmit}
//                         >
//                           Reservasi Sekarang
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ModalKeranjangKamar;
