"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useReservasiStore = create(
  persist(
    (set, get) => ({
      room: [],
      setRoom: (room) => set({ room }),
      cart: [],
      setCart: (cart) => set({ cart }),
      addToCart: (item) => set({ cart: [...get().cart, item] }),
      removeFromCart: (item) =>
        set({
          cart: get().cart.filter((i) => i.id !== item.id),
        }),
      clearCart: () => set({ cart: [] }),
      // total: base from cart
      // total: 0,
      // setTotal: (total) => set({ total }),
      startDate: null,
      setStartDate: (startDate) => set({ startDate }),
      endDate: null,
      setEndDate: (endDate) => set({ endDate }),
      people: {
        dewasa: 0,
        anak: 0,
      },
      setPeople: (people) => set({ people }),
      note: "",
      setNote: (note) => set({ note }),
      idReservasi: null,
      setIdReservasi: (idReservasi) => set({ idReservasi }),
      idPegawai: null,
      setIdPegawai: (idPegawai) => set({ idPegawai }),
      idCustGrup: null,
      setIdCustGrup: (idCustGrup) => set({ idCustGrup }),
      clearReservasi: () =>
        set({
          room: [],
          cart: [],
          startDate: null,
          endDate: null,
          people: {
            dewasa: 0,
            anak: 0,
          },
          note: "",
          idReservasi: null,
          idCustGrup: null,
        }),
    }),
    {
      name: "reservasi-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
