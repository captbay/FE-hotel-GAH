'use client';

import { getKamarById } from '@/api/api';
import useGetCookie from '@/hooks/useGetCookie';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const KamarDetail = ({ params: { id } }) => {
    const [kamar, setKamar] = useState({});
    const [loading, setLoading] = useState(false);
    const { token } = useGetCookie();

    useEffect(() => {
        setLoading(true);
        getKamarById(token, id)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setKamar(res.data.data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading Kamar...</div>;
    }

    // kamar detail

    const jenisKamar = kamar?.jenis_kamar?.name;

    const kamarImage = () => {
        if (jenisKamar?.toLowerCase() === 'superior')
            return '/images/superior.jpg';

        if (jenisKamar?.toLowerCase() === 'double deluxe')
            return '/images/double-deluxe.jpg';

        if (jenisKamar?.toLowerCase() === 'executive deluxe')
            return '/images/executive-deluxe.jpg';

        if (jenisKamar?.toLowerCase() === 'junior suite')
            return '/images/junior-suite.jpg';
    };
    return (
        <div>
            <Link href="/kamar" className="flex gap-2 items-center mb-6 mt-4">
                <ArrowLeft size={16} />
                <button className="text-xs w-max text-black font-semibold rounded">
                    Kembali
                </button>
            </Link>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Detail Kamar</h1>
                <button className="bg-orange-600 px-4 py-2 text-xs w-max text-white font-semibold rounded">
                    Edit Kamar
                </button>
            </div>
            {/* detail kamar page */}
            <div className="flex gap-4">
                <Image
                    src={kamarImage()}
                    width={500}
                    height={300}
                    className="w-full max-w-lg"
                />
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold">No Kamar</span>
                        <span>{kamar.no_kamar}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold">Jenis Kamar</span>
                        <span>{kamar.jenis_kamar?.name}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold">Status</span>
                        <div className="bg-blue-500 px-2 py-1 text-xs w-max text-white font-semibold rounded-full">
                            {kamar.status}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold">Harga</span>
                        <span>
                            {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                            }).format(kamar.jenis_kamar?.harga_default)}
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
                        Hiburan - Televisi LCD dengan channel TV premium
                        channels
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
                        Telepon; tempat tidur lipat/tambahan tersedia
                        berdasarkan permintaan
                    </li>
                    <li>Kenyamanan - AC dan layanan pembenahan kamar harian</li>
                    <li>Merokok/Dilarang Merokok</li>
                </ul>
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <span className="font-semibold">Fasilitas</span>
                <ul className="grid grid-cols-2 gap-4 text-sm">
                    <li>AC</li>
                    <li>Air minum kemasan gratis</li>
                    <li>Brankas dalam kamar (ukuran laptop)</li>
                    <li>Fasilitas membuat kopi/teh</li>
                    <li>Jubah mandi</li>
                    <li>Layanan kamar (24 jam)</li>
                    <li>Meja tulis</li>
                    <li>Minibar</li>
                    <li>Pembersihan kamar harian</li>
                    <li>Pengering rambut</li>
                    <li>Peralatan mandi gratis</li>
                    <li>Sandal</li>
                    <li>Telepon</li>
                    <li>Tempat tidur ekstra (biaya tambahan)</li>
                    <li>Tempat tidur premium</li>
                    <li>Tirai kedap-cahaya</li>
                    <li>TV kabel</li>
                    <li>TV LCD</li>
                    <li>Wi-Fi gratis</li>
                </ul>
            </div>
        </div>
    );
};

export default KamarDetail;
