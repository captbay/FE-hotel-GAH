import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const HotelCard = ({ data }) => {
  const jenisKamar = data.jenis_kamar.name;

  const kamarImage = () => {
    if (jenisKamar.toLowerCase() === "superior") return "/images/superior.jpg";

    if (jenisKamar.toLowerCase() === "double deluxe")
      return "/images/double-deluxe.jpg";

    if (jenisKamar.toLowerCase() === "executive deluxe")
      return "/images/executive-deluxe.jpg";

    if (jenisKamar.toLowerCase() === "junior suite")
      return "/images/junior-suite.jpg";
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow h-64 flex flex-col">
      <img
        className="rounded-t-lg w-full aspect-[2/1] object-cover"
        src={kamarImage()}
        alt=""
      />

      <div className="p-5 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg font-bold tracking-tight text-gray-900">
            {data.no_kamar} - {jenisKamar}
          </h5>
          <div className="bg-blue-500 px-2 py-1 text-xs w-max text-white font-semibold  rounded-full">
            {data.status}
          </div>
        </div>
        <Link
          href={`/kamar/${data.id}`}
          className="mt-auto w-max inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Read more
          <ArrowRight className="ml-2" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
