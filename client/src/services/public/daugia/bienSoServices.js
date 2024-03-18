import axios from "../../customize-axios";

const getListBienSoCongBo = () => {
    return axios.get(`user/bienso`);
};
const getListBienSoDauGiaSau24H = () => {
    return axios.get(`user/bienso/today`);
};
const getListBienSoDangDauGia = () => {
    return axios.get(`user/bienso/now`);
};
const getListKetQuaDauGia = () => {
    return axios.get(`user/daugia/ketqua`);
};

export {
    getListBienSoCongBo,
    getListBienSoDauGiaSau24H,
    getListBienSoDangDauGia,
    getListKetQuaDauGia
};