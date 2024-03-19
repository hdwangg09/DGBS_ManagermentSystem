//Layout
import AdminLayout from "../layout/Admin/AdminLayout";
import UserLayout from "../layout/Public/UserLayout";

// publicPage
//User
import Login from "../pages/PublicService/Login/Login";
import Register from "../pages/PublicService/Register/Register";

import DanhSachCongBo from "../pages/PublicService/DanhSachCongBo/DanhSachCongBo";
import SapDauGia from "../pages/PublicService/SapDauGia/SapDauGia";
import DanhSachDangDauGia from "../pages/PublicService/PhongDauGia/DanhSachDangDauGia";
import PhongDauGia from "../pages/PublicService/PhongDauGia/PhongDauGia";
import KetQua from "../pages/PublicService/KetQua/KetQuaDauGia";

import NotFound from "../pages/NotFound/NotFound";
////////////////////// public router///////////////////////////////////
const publicRoutes = [
    { path: "/login", component: Login, layout: UserLayout },
    { path: "/register", component: Register, layout: UserLayout },

    { path: "/", component: DanhSachCongBo, layout: UserLayout },
    { path: "/daugia/today", component: SapDauGia, layout: UserLayout },
    { path: "/daugia/now", component: DanhSachDangDauGia, layout: UserLayout },
    { path: "/daugia/room/:dauGiaId", component: PhongDauGia, layout: UserLayout },
    { path: "/daugia/result", component: KetQua, layout: UserLayout },
    { path: "*", component: NotFound },
];
const privateRoutes = [

];
export { publicRoutes, privateRoutes };