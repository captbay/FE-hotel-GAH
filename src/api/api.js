import { axios } from "./axios";

// auth
export const login = (username, password) => {
  return axios.post("/auth/login", { username, password });
};

export const register = ({
  username,
  password,
  name,
  email,
  no_identitas,
  no_phone,
  address,
}) => {
  return axios.post("/auth/register", {
    username,
    password,
    name,
    email,
    no_identitas,
    no_phone,
    address,
  });
};

export const logout = (token) => {
  return axios.get("/auth/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = (token, data) => {
  return axios.post(`/users/change-password`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// informasi umum
export const getAllKamarInformasiUmum = () => {
  return axios.get("/kamar/information");
};

// kamar
export const getAllKamar = (token) => {
  return axios.get("/kamar/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getKamarById = (token, id) => {
  return axios.get(`/kamar/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createKamar = (token, data) => {
  return axios.post(`/kamar/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateKamarById = (token, id, data) => {
  return axios.put(`/kamar/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteKamarById = (token, id) => {
  return axios.delete(`/kamar/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// jenis kamar
export const getAllJenisKamar = (token) => {
  return axios.get("/jenis-kamar/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// musim
export const getAllMusim = (token) => {
  return axios.get("/musim/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMusimById = (token, id) => {
  return axios.get(`/musim/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createMusim = (token, data) => {
  return axios.post(`/musim/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateMusimById = (token, id, data) => {
  return axios.put(`/musim/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMusimById = (token, id) => {
  return axios.delete(`/musim/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// fasilitas-tambahan
export const getAllFasilitasTambahan = (token) => {
  return axios.get("/fasilitas-tambahan/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getFasilitasTambahanById = (token, id) => {
  return axios.get(`/fasilitas-tambahan/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createFasilitasTambahan = (token, data) => {
  return axios.post(`/fasilitas-tambahan/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateFasilitasTambahanById = (token, id, data) => {
  return axios.put(`/fasilitas-tambahan/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteFasilitasTambahanById = (token, id) => {
  return axios.delete(`/fasilitas-tambahan/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// tarif musim
export const getAllTarifMusim = (token) => {
  return axios.get("/tarif-musim/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTarifMusimById = (token, id) => {
  return axios.get(`/tarif-musim/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTarifMusim = (token, data) => {
  return axios.post(`/tarif-musim/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTarifMusimById = (token, id, data) => {
  return axios.put(`/tarif-musim/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTarifMusimById = (token, id) => {
  return axios.delete(`/tarif-musim/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// customer
export const getAllCustomer = (token) => {
  return axios.get("/customer/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCustomerById = (token, id) => {
  return axios.get(`/customer/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCustomerById = (token, id, data) => {
  return axios.put(`/customer/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// reservasi
export const getAllReservasi = (token) => {
  return axios.get("/reservasi/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllReservasiForCustomer = (token) => {
  return axios.get("/reservasi/all/customer", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getReservasiById = (token, id) => {
  return axios.get(`/reservasi/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// user management by SM
export const regisCustomerGroup = (token, data) => {
  return axios.post(`/user-management/register-customer-group`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// code 2
export const getDashboard = (token, start_date, end_date) => {
  return axios.get("/kamar/dashboard", {
    params: {
      start_date: start_date,
      end_date: end_date,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postReservasi = (token, data) => {
  return axios.post(`/reservasi/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCustomerGrup = (token) => {
  return axios.get("/customer/grup", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTandaTerimaPDF = (token, id) => {
  return axios.get(`/reservasi/create/tanda-terima/${id}`, {
    responseType: "blob",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getReservasiCancleList = (token) => {
  return axios.get("/reservasi/cancel/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putCancelReservasi = (token, id) => {
  return axios.put(`/reservasi/cancel/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getReservasiGrup = (token) => {
  return axios.get("/reservasi/grup/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putUangJaminanGrup = (token, id, data) => {
  return axios.put(`/reservasi/grup/jaminan/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Front office
export const getAllReservasiFO = (token) => {
  return axios.get("/reservasi/all/fo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putCekin = (token, id) => {
  return axios.put(`/reservasi/cek-in/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postTambahFasilitasCheckIn = (token, id, data) => {
  return axios.post(`/reservasi/tambah-fasilitas/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataFasilitas = (token, id) => {
  return axios.get(`/reservasi/total-fasilitas/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putCheckOut = (token, id) => {
  return axios.put(
    `/reservasi/cek-out/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createInvoices = (token, data, id) => {
  return axios.post(`/invoice/create/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cetakInvoices = (token, id) => {
  return axios.get(`/invoice/cetak/${id}`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
  });
};

export const cetakLaporan1 = (token, tahun) => {
  return axios.get('/laporan/laporan-1', {
      params: {
          tahun,
      },
      headers: {
          Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
  });
};
export const cetakLaporan2 = (token, tahun) => {
  return axios.get('/laporan/laporan-2', {
      params: {
          tahun,
      },
      headers: {
          Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
  });
};
export const getLaporan2 = (token, tahun) => {
  return axios.get('/laporan/laporan-2/data', {
      params: {
          tahun,
      },
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
};

export const cetakLaporan3 = (token, tahun, bulan) => {
  return axios.get('/laporan/laporan-3', {
      params: {
          tahun,
          bulan: 11,
      },
      headers: {
          Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
  });
};

export const getLaporan3 = (token, tahun, bulan) => {
  return axios.get('/laporan/laporan-3/data', {
      params: {
          tahun,

          bulan: 11,
      },
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
};

export const cetakLaporan4 = (token, tahun) => {
  return axios.get('/laporan/laporan-4', {
      params: {
          tahun,
      },
      headers: {
          Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
  });
};
