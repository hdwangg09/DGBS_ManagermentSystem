import axios from "../../customize-axios";

//LOGIN
const login = (soDienThoai, password) => {
    return axios.post(`login`, {
        soDienThoai,
        password,
    });
};
const getListUser = () => {
    return axios.get(`admin/user`);
};
export {
    login,
    getListUser,
};
