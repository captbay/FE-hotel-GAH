"use client";

import {
  Armchair,
  Banknote,
  BedDouble,
  Calendar,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Tornado,
  User,
} from "lucide-react";
import Image from "next/image";
import ModalLogout from "./ModalLogout";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useGetCookie from "@/hooks/useGetCookie";

export default function Sidebar() {
  const [isShowModal, setIsShowModal] = useState(false);
  const pathname = usePathname();
  const { name, role } = useGetCookie();

  const onOpenModal = () => setIsShowModal(true);
  const onCloseModal = () => setIsShowModal(false);

  return (
    <aside className="h-screen w-60 sticky top-0">
      <nav className="h-full flex flex-col dark:bg-gray-800 border-r shadow-sm">
        <div className="p-8 self-center">
          <h1 className="text-white">Grand Hotel Atma</h1>
        </div>
        <ul className="flex-1 px-3 mt-4">
          {role === "Admin" ? (
            <SidebarItem
              active={pathname === "/kamar"}
              icon={<BedDouble />}
              text={"Data Kamar"}
              href={"/kamar"}
            />
          ) : null}
          {role === "SM" ? (
            <div>
              <SidebarItem
                active={pathname === "/dashboard"}
                icon={<LayoutDashboard />}
                text={"Dashboard"}
                href={"/dashboard"}
              />
              <SidebarItem
                active={pathname === "/musim"}
                icon={<Tornado />}
                text={"Data Musim"}
                href={"/musim"}
              />
              <SidebarItem
                active={pathname === "/fasilitas-tambahan"}
                icon={<Armchair />}
                text={"Data Fasilitas Tambahan"}
                href={"/fasilitas-tambahan"}
              />
              <SidebarItem
                active={pathname === "/tarif-musim"}
                icon={<Banknote />}
                text={"Data Tarif Musim"}
                href={"/tarif-musim"}
              />
              <SidebarItem
                active={pathname === "/reservasi"}
                icon={<Calendar />}
                text={"Data Reservasi"}
                href={"/reservasi"}
              />
              <SidebarItem
                active={pathname === "/customer"}
                icon={<User />}
                text={"Data Customer"}
                href={"/customer"}
              />
            </div>
          ) : null}
          {role === "Customer" ? (
            <div>
              <SidebarItem
                active={pathname === "/dashboard"}
                icon={<LayoutDashboard />}
                text={"Dashboard"}
                href={"/dashboard"}
              />
              <SidebarItem
                active={pathname === "/reservasi"}
                icon={<Calendar />}
                text={"Data Reservasi"}
                href={"/reservasi"}
              />
            </div>
          ) : null}
        </ul>
        {role === "Customer" ? (
          <div>
            <div className="border-t">
              <SidebarItem
                active={pathname === "/change-password"}
                icon={<LockKeyhole />}
                text={"Ganti Password"}
                href={"/change-password"}
              />
            </div>

            <div className="border-t flex p-3">
              <Link href={"/profile"}>
                <img
                  src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                  alt=""
                  className="w-10 h-10 rounded-md"
                />
              </Link>
              <div
                className={`
              flex justify-between items-center
              overflow-hidden transition-all w-52 ml-3
          `}
              >
                <Link href={"/profile"}>
                  <div className="leading-4">
                    <h4 className="font-semibold text-white">{name}</h4>
                    <span className="text-xs text-white">{role}</span>
                  </div>
                </Link>
                <LogOut
                  color="white"
                  size={20}
                  onClick={onOpenModal}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="border-t">
              <SidebarItem
                active={pathname === "/change-password"}
                icon={<LockKeyhole />}
                text={"Ganti Password"}
                href={"/change-password"}
              />
            </div>

            <div className="border-t flex p-3">
              <img
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                alt=""
                className="w-10 h-10 rounded-md"
              />
              <div
                className={`
          flex justify-between items-center
          overflow-hidden transition-all w-52 ml-3
      `}
              >
                <div className="leading-4">
                  <h4 className="font-semibold text-white">{name}</h4>
                  <span className="text-xs text-white">{role}</span>
                </div>
                <LogOut
                  color="white"
                  size={20}
                  onClick={onOpenModal}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </nav>
      {isShowModal && <ModalLogout onCloseModal={onCloseModal} />}
    </aside>
  );
}

const SidebarItem = ({ icon, text, active, href = "/" }) => {
  return (
    <Link
      href={href}
      className={` 
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group 
        ${active ? "bg-blue-100 text-blue-800" : "hover:bg-blue-400 text-white"}
    `}
    >
      {icon}
      <span className={`overflow-hidden transition-all w-52 ml-3`}>{text}</span>
    </Link>
  );
};
