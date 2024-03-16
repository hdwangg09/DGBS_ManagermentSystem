import DefaultUser from "../../assets/images/DefaultUser.png";
import logo from "../../assets/images/LoGoDauGia.png";
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
        if (user && user.auth === false) {
            navigate("/login");
        }
    }, [user.auth]);


    return (
        <>
            <div id="top"></div>
            <div className=" bg-gray-50 fixed w-full z-10 top-0  border-b border-gray-100 text-base h-auto  md:h-16  shadow-md">
                <div className=" flex flex-wrap w-screen items-center h-16 container  md:mx-auto px-0 md:px-2">
                    <div className="w-1/3 md:w-1/3 h-full flex items-center">
                        <NavLink to="/" className="flex items-center">
                            <img
                                src={logo}
                                className="h-12 mr-1 md:mr-3 rounded-full w-12"
                                alt="App Logo"
                            />
                            <span className="self-center text-sm md:hidden lg:block lg:text-xl text-blue-700  font-semibold whitespace-nowrap">
                                Sân bóng Đại Dương
                            </span>
                        </NavLink>
                    </div>

                    <div className="w-screen md:w-1/3  order-last md:-order-none border-t md:border-none border-gray-200  h-full ">
                        <ul className="flex flex-row gap-2 h-full  w-full justify-between  md:p-0 font-medium  rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-transparent ">
                            <Tooltip
                                placement="bottom"
                                title={window.innerWidth > 768 ? "Trang chủ" : ""}
                            >
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? " text-xl md:bg-transparent text-blue-700 md:p-0 border-b-2 border-blue-700 w-1/4 flex justify-center"
                                            : " text-xl md:bg-transparent text-gray-600 md:hover:bg-gray-200 rounded-lg md:p-0 w-1/4 flex justify-center "
                                    }
                                >
                                    <li className="h-full  flex items-center ">
                                        <AiFillHome className="w-auto h-8 flex items-center " />
                                    </li>
                                </NavLink>
                            </Tooltip>
                            <Tooltip
                                placement="bottom"
                                title={window.innerWidth > 768 ? "Đặt sân" : ""}
                            >
                                <NavLink
                                    to="/publicPitch"
                                    className={({ isActive }) =>
                                        isActive
                                            ? " text-xl md:bg-transparent text-blue-700 md:p-0 border-b-2 border-blue-700   w-1/4 flex justify-center"
                                            : " text-xl md:bg-transparent text-gray-600 md:hover:bg-gray-200 rounded-lg md:p-0 w-1/4 flex justify-center "
                                    }
                                >
                                    <li className="h-full  flex items-center">
                                        <TbSoccerField className="w-auto h-8 flex items-center  " />
                                    </li>
                                </NavLink>
                            </Tooltip>
                            <Tooltip
                                placement="bottom"
                                title={window.innerWidth > 768 ? "Tin tức" : ""}
                            >
                                <NavLink
                                    to="/publicBlog"
                                    className={({ isActive }) =>
                                        isActive
                                            ? " text-xl md:bg-transparent text-blue-700 md:p-0 border-b-2 border-blue-700   w-1/4 flex justify-center"
                                            : " text-xl md:bg-transparent text-gray-600 md:hover:bg-gray-200 rounded-lg md:p-0 w-1/4 flex justify-center "
                                    }
                                >
                                    <li className="h-full  flex items-center">
                                        <BsFillPostcardFill className="w-auto h-8 flex items-center  " />
                                    </li>
                                </NavLink>
                            </Tooltip>
                            <Tooltip
                                placement="bottom"
                                title={window.innerWidth > 768 ? "Liện hệ" : ""}
                            >
                                <NavLink
                                    to="/publicContact"
                                    className={({ isActive }) =>
                                        isActive
                                            ? " text-xl md:bg-transparent text-blue-700 md:p-0 border-b-2 border-blue-700   w-1/4 flex justify-center"
                                            : " text-xl md:bg-transparent text-gray-600 md:hover:bg-gray-200 rounded-lg md:p-0 w-1/4 flex justify-center "
                                    }
                                >
                                    <li className="h-full  flex items-center">
                                        <FaMapMarkedAlt className="w-auto h-8 flex items-center  " />
                                    </li>
                                </NavLink>
                            </Tooltip>
                        </ul>
                    </div>

                    <div className="w-2/3 md:w-1/3 flex justify-end h-full items-center ">
                        {user && user.userName ? (
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
                                                        to="/userProfile"
                                                        className="flex items-center"
                                                    >
                                                        <li className="w-full ">
                                                            <div className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-600 text-lg ">
                                                                <i className="fa-solid fa-user mr-3"></i>Thông
                                                                tin cá nhân
                                                            </div>
                                                        </li>
                                                    </NavLink>
                                                    {+roleId === 1 ? (
                                                        <NavLink
                                                            to="/manager/dashboard"
                                                            className="flex items-center"
                                                        >
                                                            <li className="w-full">
                                                                <div className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-600 text-lg">
                                                                    <i className="fa-solid fa-bars-progress mr-3"></i>
                                                                    Quản lý
                                                                </div>
                                                            </li>
                                                        </NavLink>
                                                    ) : +roleId === 3 ? (
                                                        <NavLink
                                                            to="/manager/bookings"
                                                            className="flex items-center"
                                                        >
                                                            <li className="w-full">
                                                                <div className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-600 text-lg">
                                                                    <i className="fa-solid fa-clock-rotate-left mr-3"></i>
                                                                    Quản lý
                                                                </div>
                                                            </li>
                                                        </NavLink>
                                                    ) : (
                                                        <NavLink
                                                            to="/bookingHistory"
                                                            className="flex items-center"
                                                        >
                                                            <li className="w-full">
                                                                <div className="w-full block px-4 py-2 hover:bg-gray-100 hover:text-blue-600 text-lg">
                                                                    <i className="fa-solid fa-clock-rotate-left mr-3"></i>
                                                                    Lịch sử đặt sân
                                                                </div>
                                                            </li>
                                                        </NavLink>
                                                    )}

                                                    <NavLink
                                                        to="/changePassword"
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
                                    {/* <div className="text-xl font-medium ">
                    {userData.userName}
                  </div> */}
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