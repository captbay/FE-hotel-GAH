"use client";
import { getRoomImage } from "@/utils/helper";
import Image from "next/image";

const ModalDetailKamar = ({ onClose, data }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div
        id="authentication-modal"
        aria-hidden="true"
        className="bg-gray-500 bg-opacity-75 transition-opacity overflow-x-hidden overflow-y-auto fixed h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center"
      >
        <div className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full md:h-auto">
          <div className="bg-white border rounded-lg shadow relative">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="authentication-modal"
                onClick={onClose}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="modal-box w-full max-w-5xl">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <Image
                    src={getRoomImage(data.nama_kamar)}
                    width={400}
                    height={300}
                    alt={data.nama_kamar}
                    className="w-full min-w-[500px] object-cover rounded aspect-video"
                  />
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold">Jenis Kamar</span>
                      <span>
                        {data.nama_kamar} - {data.total_bed} / {data.tipe_bed}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold">Kapasitas Kamar</span>
                      <span>2 Orang</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold">Status Musim</span>
                      <div className="bg-blue-500 px-2 py-1 text-xs w-max text-white font-semibold rounded-full">
                        {data.nama_musim}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold">Harga</span>
                      <span>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(data.harga)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <span className="font-semibold">Fasilitas</span>
                  <ul className="flex flex-col gap-2 text-sm">
                    <li>Layout - ruang duduk terpisah</li>
                    <li>Internet - WiFi Gratis</li>
                    <li>
                      Hiburan - Televisi LCD dengan channel TV premium channels
                    </li>
                    <li>
                      Makan Minum - Pembuat kopi/teh, minibar, layanan kamar
                      24-jam, air minum kemasan gratis, termasuk sarapan
                    </li>
                    <li>
                      Untuk tidur - Seprai kualitas premium dan gorden/tirai
                      kedap cahaya
                    </li>
                    <li>
                      Kamar Mandi - Kamar mandi pribadi dengan bathtub dan
                      shower terpisah, jubah mandi, dan sandal
                    </li>
                    <li>
                      Kemudahan - Brankas (muat laptop), Meja tulis, dan
                      Telepon; tempat tidur lipat/tambahan tersedia berdasarkan
                      permintaan
                    </li>
                    <li>Kenyamanan - AC dan layanan pembenahan kamar harian</li>
                    <li>Merokok/Dilarang Merokok</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <span className="font-semibold">Fasilitas</span>
                  <ul className="grid grid-cols-2 gap-4 text-sm">
                    <li> - AC</li>
                    <li> - Air minum kemasan gratis</li>
                    <li> - Brankas dalam kamar (ukuran laptop)</li>
                    <li> - Fasilitas membuat kopi/teh</li>
                    <li> - Jubah mandi</li>
                    <li> - Layanan kamar (24 jam)</li>
                    <li> - Meja tulis</li>
                    <li> - Minibar</li>
                    <li> - Pembersihan kamar harian</li>
                    <li> - Pengering rambut</li>
                    <li> - Peralatan mandi gratis</li>
                    <li> - Sandal</li>
                    <li> - Telepon</li>
                    <li> - Tempat tidur ekstra (biaya tambahan)</li>
                    <li> - Tempat tidur premium</li>
                    <li> - Tirai kedap-cahaya</li>
                    <li> - TV kabel</li>
                    <li> - TV LCD</li>
                    <li> - Wi-Fi gratis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailKamar;
