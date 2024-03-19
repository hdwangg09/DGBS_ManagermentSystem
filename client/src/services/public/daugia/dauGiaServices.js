import axios from "../../customize-axios";

const getListLichSuInRoom = (dauGiaId) => {
    return axios.get(`user/daugia/lichsudaugia/${dauGiaId}`);
};
const traGiaInDauGiaRoomAPI = (phienDauGiaId, nguoiDungId, soTien, thoiGian) => {
    return axios.post(`user/daugia/add/`, {
        phienDauGiaId, nguoiDungId, soTien, thoiGian
    });
};
const updateWinnerDauGiaAPI = (phienDauGiaId, BienSoId) => {
    return axios.post(`user/daugia/room/winner/`, {
        phienDauGiaId, BienSoId
    });
};
export {
    getListLichSuInRoom,
    traGiaInDauGiaRoomAPI,
    updateWinnerDauGiaAPI,
};
