"use client";

import { Armchair, BedDouble, LayoutDashboard, LogOut } from "lucide-react";
import Image from "next/image";
import ModalLogout from "./ModalLogout";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isShowModal, setIsShowModal] = useState(false);
  const pathname = usePathname();

  const onOpenModal = () => setIsShowModal(true);
  const onCloseModal = () => setIsShowModal(false);

  return (
    <aside className="h-screen w-60 sticky top-0">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src={"/logo.jpg"}
            className={`overflow-hidden transition-all w-36`}
            alt=""
            width={128}
            height={128}
          />
        </div>

        <ul className="flex-1 px-3 mt-4">
          <SidebarItem
            active={pathname === "/dashboard"}
            icon={<LayoutDashboard />}
            text={"Dashboard"}
            href={"/dashboard"}
          />
          <SidebarItem
            active={pathname === "/kamar"}
            icon={<BedDouble />}
            text={"Data Kamar"}
            href={"/kamar"}
          />
          <SidebarItem
            active={pathname === "/fasilitas"}
            icon={<Armchair />}
            text={"Data Fasilitas"}
          />
        </ul>

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
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <LogOut
              size={20}
              onClick={onOpenModal}
              className="cursor-pointer"
            />
          </div>
        </div>
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
        ${
          active
            ? "bg-blue-100 text-blue-800"
            : "hover:bg-blue-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span className={`overflow-hidden transition-all w-52 ml-3`}>{text}</span>
    </Link>
  );
};
