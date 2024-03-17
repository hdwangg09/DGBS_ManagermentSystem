import axios from "../../customize-axios";

//LOGIN
const login = (soDienThoai, password) => {
    return axios.post(`login`, {
        soDienThoai,
        password,
    });
};
const register = (HoTen, Email, SoDienThoai, Password) => {
    return axios.post(`register`, { HoTen, Email, SoDienThoai, Password });
};
const getListUser = () => {
    return axios.get(`admin/user`);
};
export {
    login,
    register,
    getListUser,
};
