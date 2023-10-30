"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getAllKamarInformasiUmum } from "@/api/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [kamar, setKamar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllKamarInformasiUmum()
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setKamar(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Move this here
      });
  }, []);

  return (
    <>
      <header className="top-0 z-50 transition-shadow shadow-none">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl">Grand Hotel Atma</span>
          </a>
          <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/login">
              <button className="inline-flex items-center bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-green-900 rounded text-base mt-4 md:mt-0">
                Login
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Booking Hotel Seemless With US
              </h1>
              <p className="mb-8 leading-relaxed">
                Kami menyiapkan kebutuhan hotel anda dengan mudah dan cepat yang
                mengutamakan kenyamanan anda
              </p>
              <div className="flex justify-center">
                <Link href="/login">
                  <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Reservasi Sekarang
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5  items-center justify-center flex-col">
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Informasi Kamar
              </h1>
              <div className="flex flex-wrap justify-center -m-4 pt-4">
                {loading ? (
                  <div className="pt-24 text-lg font-bold ">
                    Loading Data Kamar...
                  </div>
                ) : (
                  kamar.map(($item) => {
                    return (
                      <div className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg">
                          <div className="inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                            {$item.nama_kamar.toLowerCase() === "superior" ? (
                              <Image
                                src="/images/superior.jpg"
                                width={500}
                                height={300}
                                className="w-full max-w-lg"
                              />
                            ) : null}
                            {$item.nama_kamar.toLowerCase() ===
                            "double deluxe" ? (
                              <Image
                                src="/images/double-deluxe.jpg"
                                width={500}
                                height={300}
                                className="w-full max-w-lg"
                              />
                            ) : null}
                            {$item.nama_kamar.toLowerCase() ===
                            "executive deluxe" ? (
                              <Image
                                src="/images/executive-deluxe.jpg"
                                width={500}
                                height={300}
                                className="w-full max-w-lg"
                              />
                            ) : null}
                            {$item.nama_kamar.toLowerCase() ===
                            "junior suite" ? (
                              <Image
                                src="/images/junior-suite.jpg"
                                width={500}
                                height={300}
                                className="w-full max-w-lg"
                              />
                            ) : null}
                          </div>
                          <h2 className="text-lg text-gray-900 font-bold title-font mb-2">
                            {$item.no_kamar} - {$item.nama_kamar}
                          </h2>
                          {$item.nama_musim != "tidak ada musim" ? (
                            <div className="mx-auto bg-blue-500 px-2 py-1 mb-2 text-xs w-max text-white font-semibold  rounded-full">
                              {$item.nama_musim}
                            </div>
                          ) : null}
                          <p className="leading-relaxed text-base mb-2">
                            Tipe Bed: {$item.tipe_bed}
                          </p>
                          <p className="leading-relaxed text-base mb-2">
                            Jumlah Bed: {$item.total_bed}
                          </p>
                          <p className="leading-relaxed text-base mb-2">
                            Detail Kamar: {$item.luas_kamar}
                          </p>
                          <h2 className="text-lg text-gray-900 font-medium title-font">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format($item.harga)}
                          </h2>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Contact Us
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                OWNER JUPEN - +62 813-3524-5359
              </p>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                  <a className="text-indigo-500">jupen@email.com</a>
                  <p className="leading-normal my-5">
                    JL. Babarsari
                    <br />
                    Saint Cloud, MN 56301
                  </p>
                  <span className="inline-flex">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="ml-4 text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="ml-4 text-gray-500">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                      </svg>
                    </a>
                    <a className="ml-4 text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
