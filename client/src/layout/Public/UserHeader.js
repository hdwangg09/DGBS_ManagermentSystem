import DefaultUser from "../../assets/images/DefaultUser.png";
import logo from "../../assets/images/LogoDauGia.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";

import Tippy from "@tippyjs/react/headless";
import TippyComponent from "../../components/Tippy/TippyComponent";
import { useEffect, useState } from "react";
function UserHeader() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [roleId, setRoleId] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    useEffect(() => {
        const loggedInUser = localStorage.getItem('userLogined');
        if (loggedInUser) {
            const userDataParsed = JSON.parse(loggedInUser);
            setUserData(userDataParsed);
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('userLogined');
        setUserData(null);
        window.location.href = '/login';
    }
    return (
        <>
            <div id="top"></div>
            <div className=" bg-gray-50 fixed w-full z-10 top-0  border-b border-gray-100 text-base h-auto  md:h-16 shadow-md bg-gradient-to-r from-cyan-200 via-purple-200 to-rose-200">
                <div className=" flex flex-wrap w-screen items-center h-16 container  md:mx-auto px-0 md:px-2">
                    <div className="w-1/4 md:w-1/3 h-full flex items-center">
                        <NavLink to="/" className="flex items-center">
                            <img
                                src={logo}
                                className="h-12 mr-1 md:mr-3 rounded-full w-12"
                                alt="App Logo"
                            />
                            <span className="self-center text-sm md:hidden lg:block lg:text-lg text-blue-700  font-semibold whitespace-nowrap">
                                Đấu Giá Biển Số
                            </span>
                        </NavLink>
                    </div>

                    <div className="w-screen md:w-1/3  order-last md:-order-none border-t md:border-none border-gray-200  h-full ">
                        <ul className="flex flex-row gap-2 h-full  w-full justify-between  md:p-0 font-medium  rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-transparent ">
                            <Tooltip
                                placement="bottom"
                                title={"Danh sách Công Bố"}
                            >
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-sm md:bg-transparent text-blue-700 md:p-0 border-b-2 border-blue-700  flex justify-center font-semibold focus:outline-none"
                                            : "text-sm md:bg-transparent text-gray-600 md:hover:bg-gray-200 rounded-lg md:p-0  flex justify-center font-normal hover:text-gray-800 focus:outline-none"
                                    }
                                >
                                    <li className="flex items-center">
                                        {/* <AiFillHome className="w-auto h-8 flex items-center " /> */}
                                        <p className="w-auto flex items-center">Danh sách công bố</p>
                                    </li>
                                </NavLink>

                            </Tooltip>
                            <Tooltip
                                placement="bottom"
                                title={"Sắp đấu giá"}
                            >
                                <NavLink
                                    to="/daugia/today"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-sm md:bg-transparent text-blue-700 md:p-0 border-b-2 border-blue-700  flex justify-center font-semibold focus:outline-none"
                                            : "text-sm md:bg-transparent text-gray-600 md:hover:bg-gray-200 rounded-lg md:p-0  flex justify-center font-normal hover:text-gray-800 focus:outline-none"
                                    }
                                >
                                    <li className="flex items-center">
                                        {/* <AiFillHome className="w-auto h-8 flex items-center " /> */}
                                        <p className="w-auto flex items-center">Sắp đấu giá</p>
                                    </li>
                                </NavLink>

                            </Tooltip>
                            {/* <Tooltip
                                placement="bottom"
                                title={"Đang đấu giá"}
                            >
                                <NavLink
                                    to="/daugia/now"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-sm md:bg-transparent text-blue-700 md:p-0 border-b-2 border-blue-700  flex justify-center font-semibold focus:outline-none"
                                            : "text-sm md:bg-transparent text-gray-600 md:hover:bg-gray-200 rounded-lg md:p-0  flex justify-center font-normal hover:text-gray-800 focus:outline-none"
                                    }
                                >
                                    <li className="flex items-center">
                                        // <AiFillHome className="w-auto h-8 flex items-center " /> 
                                        <p className="w-auto flex items-center">Sắp đấu giá</p>
                                    </li>
                                </NavLink>

                            </Tooltip>  */}
                            <Tooltip
                                placement="bottom"
                                title={"Phòng đấu giá"}
                            >
                                <NavLink
                                    to="/daugia/now"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-sm md:bg-transparent text-blue-700 md:p-0 border-b-2 border-blue-700  flex justify-center font-semibold focus:outline-none"
                                            : "text-sm md:bg-transparent text-gray-600 md:hover:bg-gray-200 rounded-lg md:p-0  flex justify-center font-normal hover:text-gray-800 focus:outline-none"
                                    }
                                >
                                    <li className="flex items-center">
                                        <p className="w-auto flex items-center">Phòng đấu giá</p>
                                    </li>
                                </NavLink>

                            </Tooltip>
                            <Tooltip
                                placement="bottom"
                                title={"Kết quả đấu giá"}
                            >
                                <NavLink
                                    to="/daugia/result"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-sm md:bg-transparent text-blue-700 md:p-0 border-b-2 border-blue-700  flex justify-center font-semibold focus:outline-none"
                                            : "text-sm md:bg-transparent text-gray-600 md:hover:bg-gray-200 rounded-lg md:p-0  flex justify-center font-normal hover:text-gray-800 focus:outline-none"
                                    }
                                >
                                    <li className="flex items-center">
                                        {/* <AiFillHome className="w-auto h-8 flex items-center " /> */}
                                        <p className="w-auto flex items-center">Kết Quả đấu giá</p>
                                    </li>
                                </NavLink>

                            </Tooltip>
                        </ul>
                    </div>

                    <div className="w-2/3 md:w-1/3 flex justify-end h-full items-center ">
                        {userData ? (
                            <Tippy
                                interactive
                                delay={[0, 500]}
                                placement="bottom-start"
                                render={(attrs) => (
                                    <div className="menu-items" tabIndex="-1" {...attrs}>
                                        <TippyComponent>
                                            <div
                                                id="dropdownNavbar"
                                                className="z-20 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-56"
                                            >
                                                <ul
                                                    className="py-2 text-xl text-gray-800 "
                                                    aria-labelledby="dropdownLargeButton"
                                                >
                                                    <NavLink
                                                        to="#"
                                                        className="flex items-center"
                                                    >
                                                        <li className="w-full ">
                                                            <div className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-600 text-lg ">
                                                                <i className="fa-solid fa-user mr-3"></i>Thông tin cá nhân
                                                            </div>
                                                        </li>
                                                    </NavLink>
                                                    <NavLink
                                                        to="/#"
                                                        className="flex items-center"
                                                    >
                                                        <div className="w-full block px-4 py-2 text-lg  text-gray-700 hover:bg-gray-100 hover:text-blue-600  ">
                                                            <i className="fa-solid fa-unlock-keyhole mr-3"></i>
                                                            Lịch sử đấu giá
                                                        </div>
                                                    </NavLink>
                                                    <NavLink
                                                        to="/#"
                                                        className="flex items-center"
                                                    >
                                                        <div className="w-full block px-4 py-2 text-lg  text-gray-700 hover:bg-gray-100 hover:text-blue-600  ">
                                                            <i className="fa-solid fa-unlock-keyhole mr-3"></i>
                                                            Đổi mật khẩu
                                                        </div>
                                                    </NavLink>
                                                </ul>
                                                <div className="py-1">
                                                    <NavLink
                                                        onClick={() => handleLogout()}
                                                        className="flex items-center"
                                                    >
                                                        <div className="block w-full px-4 py-2 text-lg  text-red-400 hover:bg-gray-100 hover:text-red-600 ">
                                                            <i className="fa-solid fa-right-from-bracket mr-3"></i>
                                                            Đăng xuất
                                                        </div>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </TippyComponent>
                                    </div>
                                )}
                            >
                                <div className="flex flex-col items-center justify-center">
                                    <div className="text-xl font-medium ">
                                        {userData.userName}
                                    </div>
                                    <img
                                        className="h-12 w-12 rounded-full   "
                                        src={(userData && userData.avatarUrl) || DefaultUser}
                                        alt="Ảnh đại diện"
                                    />
                                </div>
                            </Tippy>
                        ) : (
                            <div className="flex">
                                <NavLink to="/login">
                                    <button
                                        type="button"
                                        className="text-white text-sm md:text-base bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-2 md:px-4 py-1 md:py-2 text-center mr-2 "
                                    >
                                        Đăng nhập
                                    </button>
                                </NavLink>
                                <NavLink to="/register">
                                    <button
                                        type="button"
                                        className="text-white text-sm md:text-base bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-2 md:px-4 py-1 md:py-2 text-center md:mr-0 "
                                    >
                                        Đăng ký
                                    </button>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserHeader;
