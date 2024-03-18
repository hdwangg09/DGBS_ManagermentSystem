import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Pagination } from "antd";
import { format } from "date-fns";
import { getListBienSoDangDauGia } from "../../../services/public/daugia/bienSoServices";
import { Spin } from "antd";

function DanhSachDangDauGia() {
    const [loading, setLoading] = useState(true);
    const [listDangDauGia, setListDangDauGia] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [contentShow, setContentShow] = useState("");

    useEffect(() => {
        getListDangDauGiaInfor();
    }, []);

    const getListDangDauGiaInfor = async () => {
        setLoading(true);
        try {
            const res = await getListBienSoDangDauGia();
            console.log(res.data)
            if (res && res.code === 200 && res.data) {
                setListDangDauGia(res.data);
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    };
    const updateIsInputEmpty = (search) => {
        setIsInputEmpty(search.trim() === "");
    };
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        updateIsInputEmpty(e.target.value);
    };
    const handleSearch = () => {
        if (!isInputEmpty) {
            const filteredData = listDangDauGia.filter((data) => {
                const isMatch = data.bienSo
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                return isMatch;
            });

            setFilteredData(filteredData);
            setIsSearching(true);
            setCurrentPage(1);
        } else {
            setFilteredData(listDangDauGia);
            setIsSearching(false);
            setCurrentPage(1);
        }
    };
    function formatCurrency(price) {
        if (price > 0) {
            return price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
        }
        return null;
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentList = isSearching
        ? filteredData.slice(startIndex, endIndex)
        : listDangDauGia.slice(startIndex, endIndex);
    return (
        <>
            <div className=" bg-gradient-to-r from-cyan-100 via-purple-100 to-rose-100 min-h-screen">
                <div className="flex flex-col container mx-auto my-24 w-screen  md:w-9/12 mt-36">
                    <div className="mb-6 text-2xl font-medium">
                        <p className="text-lg md:text-2xl font-semibold text-blue-500 flex justify-center md:justify-normal">
                            Danh sách biển số đang đấu giá
                        </p>
                    </div>
                    <div className="flex items-center pb-4 mb-4 border-b-2 justify-end border-blue-400/50">
                        <div className="relative max-w-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                <svg
                                    className="w-4 h-5 mb-0.5 text-blue-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="search"
                                className="bg-white border border-blue-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 
                focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Biển số..."
                                onChange={handleSearchInputChange}
                            />
                        </div>

                        {/* Nút tìm kiếm */}
                        <button
                            type="button"
                            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700
                hover:bg-blue-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onClick={handleSearch}
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            Tìm
                        </button>
                    </div>
                    <div className="justify-center items-center">
                        <Spin spinning={loading} tip="Loading...">
                            {currentList.length === 0 ? (
                                <div className="flex items-center justify-center text-center h-80">
                                    <p className=" text-lg text-gray-500">No Data</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-4 gap-x-16 gap-y-16  ">
                                    {currentList.map((data) => (
                                        <div className="lg:flex lg:flex-row rounded-xl bg-white text-gray-700 shadow-md transform transition-transform duration-500 ease-in-out hover:scale-x-105 hover:scale-y-105">
                                            <div className="p-6 w-full">
                                                <div className="lg:flex lg:justify-between">
                                                    <div className="flex">
                                                        <p className="flex block font-sans lg:text-xl text-lg antialiased font-semibold leading-relaxed tracking-normal text-cyan-500 uppercase">
                                                            {data?.bienSo}
                                                        </p>
                                                    </div>
                                                    <div className="lg:flex">
                                                        <p className="mt-0.5 font-sans text-sm  antialiased font-normal leading-relaxed text-gray-700">
                                                            {data?.thanhPho} - {data?.loaiXe}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="mb-4 font-sans text-sm italic antialiased font-normal leading-relaxed text-gray-700">
                                                    Kết thúc sau: 12 phút
                                                </p>
                                                {/* <p className="block mb-2 font-sans text-xl antialiased  tracking-normal text-gray-900">
                                        hihi
                                    </p> */}
                                                <p className="block mb-1.5 font-sans text-base antialiased font-normal leading-relaxed text-gray-700 truncate-text">
                                                    Giá khởi điểm: {formatCurrency(data?.giaKhoiDiem)}
                                                </p>
                                                <p className="block mb-4 font-sans text-base antialiased font-normal leading-relaxed text-gray-700 truncate-text">
                                                    Giá cao nhất: {formatCurrency(data?.giaCaoNhat)}
                                                </p>
                                                <div className="text-center">
                                                    <button
                                                        className="inline-flex items-center
                                        gap-2 p-3 font-sans text-xs font-bold text-center text-cyan-400 uppercase align-middle transition-all rounded-lg select-none hover:bg-blue-500/10 active:bg-blue-500/20"
                                                        type="button"
                                                    >
                                                        <NavLink to={`/daugia/room/${data.phienDauGiaId}`}>
                                                            Tham gia đấu giá
                                                        </NavLink>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </Spin>
                    </div>

                    <div className="col-span-full mt-8 mb-8">
                        <div className="text-right">
                            <Pagination
                            // current={currentPage}
                            // pageSize={pageSize}
                            // total={isSearching ? filteredData.length : postData.length}
                            // onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default DanhSachDangDauGia;