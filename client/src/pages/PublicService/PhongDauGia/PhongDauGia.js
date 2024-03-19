import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Form, Input, Button, Table } from "antd";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { geBienSoDetailsInRoom } from "../../../services/public/daugia/bienSoServices"
import {
    getListLichSuInRoom,
    traGiaInDauGiaRoomAPI,
    updateWinnerDauGiaAPI,
} from "../../../services/public/daugia/dauGiaServices"
function PhongDauGia() {
    const { dauGiaId } = useParams();
    const [loadingBienSo, setLoadingBienSo] = useState(true);
    const [loadingLichSu, setLoadingLichSu] = useState(true);

    const [lichSuDauGiaData, setLichSuDauGiaData] = useState([]);
    const [bienSoData, setBienSoData] = useState([]);

    const [form] = Form.useForm();
    const [endTime, setEndTime] = useState("");
    const [remainingTime, setRemainingTime] = useState([0, 0, 0, 0]);
    const [soTienUser, setSoTienUser] = useState(0);
    const [isDauGia, setIsDauGia] = useState(false);
    const [userId, setUserId] = useState();
    const [userIdToWin, setUserIdToWin] = useState();
    useEffect(() => {
        getUserInLocalStorage();
    }, []);
    const getUserInLocalStorage = () => {
        const loggedInUser = localStorage.getItem('userLogined');
        const loggedInUserParse = JSON.parse(loggedInUser);
        console.log(loggedInUserParse.nguoiDungId);
        setUserId(loggedInUserParse.nguoiDungId)
    }
    useEffect(() => {
        const fetchData = async () => {
            await getBienSoInforInRoom(dauGiaId);
            await getLichSuInRoom(dauGiaId);
        };
        if (isDauGia) {
            fetchData();
            setIsDauGia(false);
            return;
        }
        const interval = setInterval(() => {
            fetchData();
            setIsDauGia(false);
        }, 5000);
        setIsDauGia(false);
        return () => clearInterval(interval);
    }, [isDauGia]);

    useEffect(() => {
        if (bienSoData && endTime) {
            const interval = setInterval(() => {
                getRemainingTime(endTime);
                // if (remainingTime.every(unit => unit === 0)) {
                //     handleAddWinnerDauGia();
                // }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [bienSoData, endTime]);
    // useEffect(() => {
    //     if (bienSoData && bienSoData?.trangThai == 1) {
    //         if (remainingTime.every(unit => unit <= 0)) {
    //             handleAddWinnerDauGia();
    //             return;
    //         }
    //     }
    // }, [bienSoData, remainingTime]);

    const getBienSoInforInRoom = async (dauGiaId) => {
        try {
            const res = await geBienSoDetailsInRoom(dauGiaId);
            if (res && res.code === 200 && res.data) {
                setBienSoData(res.data);
                setEndTime(res.data.thoiGianKetThuc)
            }
        } catch (error) {
            console.log(error)
        }
        setLoadingBienSo(false);
    };

    const getLichSuInRoom = async (dauGiaId) => {
        try {
            const res = await getListLichSuInRoom(dauGiaId);
            if (res && res.code === 200 && res.data) {
                const sortedData = res.data.sort((a, b) => b.soTien - a.soTien);
                setLichSuDauGiaData(sortedData);
            }
        } catch (error) {
            console.log(error)
        }
        setLoadingLichSu(false);
    };
    const onTraGia = async (values) => {
        try {
            const utcDate = new Date();
            const day = utcDate.getDate();
            const month = utcDate.getMonth() + 1;
            const year = utcDate.getFullYear();
            const hours = utcDate.getHours();
            const minutes = utcDate.getMinutes();
            const seconds = utcDate.getSeconds();

            const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            const response = await traGiaInDauGiaRoomAPI(dauGiaId, userId, values.soTien, formattedDate);
            setIsDauGia(true);
            if (response && response.code === 200) {
                toast.success(response.message);
            } else if (response && response.code !== 200) {
                toast.error(response.message);
            } else {
                toast.error("Vui lòng thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleAddWinnerDauGia = async () => {
        try {
            const response = await updateWinnerDauGiaAPI(dauGiaId, bienSoData?.bienSoId);
            if (response && response.code === 200) {
                toast.success(response.message);
            } else if (response && response.code !== 200) {
                toast.error(response.message);
            } else {
                toast.error("Vui lòng thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
    const getRemainingTime = (endTime) => {
        const now = new Date();
        const end = new Date(endTime);
        const differenceInSeconds = (end - now) / 1000;
        const days = Math.floor(differenceInSeconds / (3600 * 24));
        const hours = Math.floor((differenceInSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((differenceInSeconds % 3600) / 60);
        const seconds = Math.floor(differenceInSeconds % 60);
        setRemainingTime([days, hours, minutes, seconds]);
    };
    const columns = [
        {
            title: "Họ tên",
            dataIndex: "nguoiDungName",
            width: 100,
            render: (text, record) => <p>{text}</p>,
        },
        {
            title: "Số tiền",
            dataIndex: "soTien",
            width: 100,
            render: (text, record) => <p>{formatCurrency(text)}</p>,
        },
        {
            title: "Thời gian",
            dataIndex: "thoiGian",
            width: 100,
            render: (record) => formatDateToHHMMDDMMYYYY(record),
        },
    ];

    function formatCurrency(price) {
        if (price > 0) {
            return price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
        }
        return null;
    }
    function formatDateToHHMMDDMMYYYY(dateString) {
        const date = new Date(dateString);
        return format(date, "HH:mm - dd/MM/yyyy");
    }
    return (
        <>
            <div className=" bg-gradient-to-r from-cyan-100 via-purple-100 to-rose-100 min-h-screen">
                <div className="flex flex-col container mx-auto my-24 md:w-7/12 mt-36">
                    <div className="grid grid-cols-2 gap-x-16 gap-y-16 ">
                        <div className="lg:flex lg:flex-row rounded-xl bg-white text-gray-700 shadow-md">
                            <div className="p-10 w-full h-full">
                                <Spin spinning={loadingBienSo} tip="Loading..." className="p-10">
                                    <div className="text-center text-red-200 font-mono text-3xl">
                                        {remainingTime && (
                                            remainingTime.every(unit => unit <= 0) ? (
                                                <span className="inline-block bg-rose-100 text-red-500 p-1 rounded-md">Đã kết thúc</span>
                                            ) : (
                                                <>
                                                    <span className="inline-block bg-rose-100 text-red-500 p-1 rounded-md">{String(remainingTime[0]).padStart(2, '')}</span>:
                                                    <span className="inline-block bg-rose-100 text-red-500 p-1 rounded-md">{String(remainingTime[1]).padStart(2, '0')}</span>:
                                                    <span className="inline-block bg-rose-100 text-red-500 p-1 rounded-md">{String(remainingTime[2]).padStart(2, '0')}</span>:
                                                    <span className="inline-block bg-rose-100 text-red-500 p-1 rounded-md">{String(remainingTime[3]).padStart(2, '0')}</span>
                                                </>
                                            )
                                        )}
                                    </div>


                                    <div className="mt-4 lg:flex lg:justify-between">
                                        <div className="flex">
                                            <p className="flex block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-cyan-500 uppercase">
                                                {bienSoData?.bienSo}
                                            </p>
                                        </div>
                                        <div className="lg:flex">
                                            <p className="mt-0.5 font-sans text-sm  antialiased font-normal leading-relaxed text-gray-700">
                                                {bienSoData?.thanhPho} - {bienSoData?.loaiXe}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="block mt-4 mb-1.5 font-sans text-base antialiased font-normal leading-relaxed text-gray-700 truncate-text">
                                        Giá khởi điểm: {formatCurrency(bienSoData?.giaKhoiDiem)}
                                    </p>
                                    <p className="block mb-4 font-sans text-base antialiased font-normal leading-relaxed text-gray-700 truncate-text">
                                        Giá cao nhất: {formatCurrency(bienSoData?.giaCaoNhat)}
                                    </p>
                                    {bienSoData?.nguoiThangCuoc != null ? (
                                        <p className="block mb-4 font-sans text-base antialiased font-normal leading-relaxed text-gray-700 truncate-text">
                                            Người thắng cuộc: {bienSoData?.nguoiThangCuoc}
                                        </p>
                                    ) : (null)}

                                </Spin>

                            </div>
                        </div>

                        <div className="lg:flex lg:flex-col rounded-xl bg-white text-gray-700 shadow-md">
                            <div className="p-10 w-full">
                                <div className="text-center text-red-500">
                                    Trả giá
                                </div>
                                <Form
                                    form={form}
                                    onFinish={onTraGia}
                                    name="loginForm"
                                    layout="vertical"
                                    labelAlign="left"
                                >
                                    <Form.Item
                                        label="Số tiền trả giá"
                                        name="soTien"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập số tiền.",
                                            },
                                            {
                                                validator: (_, value) => {
                                                    if (value && /^\s/.test(value)) {
                                                        return Promise.reject(
                                                            "Không được có khoảng trắng ở đầu chuỗi."
                                                        );
                                                    }
                                                    if (value && /\s$/.test(value)) {
                                                        return Promise.reject(
                                                            "Không được có khoảng trắng ở cuối chuỗi."
                                                        );
                                                    }
                                                    if (value && !/^\d+$/.test(value)) {
                                                        return Promise.reject(
                                                            "Số tiền bạn nhập không hợp lệ."
                                                        );
                                                    }
                                                    if (value && value <= bienSoData?.giaKhoiDiem) {
                                                        return Promise.reject(
                                                            "Số tiền bạn trả phải lớn hơn giá khởi điểm."
                                                        );
                                                    }
                                                    if (value && value <= bienSoData?.giaCaoNhat) {
                                                        return Promise.reject(
                                                            "Số tiền bạn trả phải lớn hơn số tiền cao nhất hiện tại."
                                                        );
                                                    }
                                                    return Promise.resolve();
                                                },
                                            },
                                        ]}
                                        className="font-semibold"
                                    >
                                        <Input
                                            disabled={bienSoData?.nguoiThangCuoc || remainingTime.every(unit => unit <= 0) ? true : false}
                                            onChange={(e) => setSoTienUser(e.target.value)}
                                            className="w-full px-4 py-2 text-blue-500 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </Form.Item>

                                    <Form.Item>
                                        {bienSoData?.nguoiThangCuoc || remainingTime.every(unit => unit <= 0) ? (
                                            <Button
                                                disabled
                                                type="default"
                                                htmlType="submit"
                                                className="bg-gradient-to-r from-cyan-400 to-blue-300 w-full
                                         text-white text-lg font-medium flex items-center justify-center p-5"
                                            >
                                                Trả giá {formatCurrency(Number(soTienUser))}
                                            </Button>
                                        ) : (
                                            <Button
                                                type="default"
                                                htmlType="submit"
                                                className="bg-gradient-to-r from-cyan-400 to-blue-300 w-full
                                        hover:!from-cyan-300 hover:!to-blue-400 hover:!bg-gradient-to-r hover:!bg-gradient-to-r hover:!bg-blue-500  hover:!text-white
                                        focus:!text-white text-white text-lg font-medium flex items-center justify-center p-5"
                                            >
                                                Trả giá {formatCurrency(Number(soTienUser))}
                                            </Button>
                                        )}
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                        <div className="lg:flex lg:flex-row rounded-xl bg-white text-gray-700 shadow-md col-span-2">
                            <div className="p-10 w-full">
                                <div className="text-center text-red-500 mb-4">
                                    Diễn biến cuộc đấu giá
                                </div>
                                <Spin spinning={loadingLichSu} tip="Loading...">

                                    {lichSuDauGiaData && lichSuDauGiaData != null ? (
                                        <>
                                            <Table
                                                dataSource={lichSuDauGiaData}
                                                columns={columns}
                                                bordered
                                                scroll={{
                                                    x: 900,
                                                }}
                                                pagination={{
                                                    pageSize: 8,
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-center text-center h-64">
                                                <p className="text-lg text-gray-500">Chưa có thông tin</p>
                                            </div>
                                        </>
                                    )}

                                </Spin>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
export default PhongDauGia;
