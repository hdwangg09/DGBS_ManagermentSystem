import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import { format } from "date-fns";
import { getListBienSoCongBo } from "../../../services/public/daugia/bienSoServices";
import { Spin } from "antd";

function DanhSachCongBo() {

    const [loading, setLoading] = useState(true);
    const [danhSachCongBo, setDanhSachCongBo] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    useEffect(() => {
        getListDanhSachCongBoBienSo();
    }, []);

    const getListDanhSachCongBoBienSo = async () => {
        setLoading(true);
        try {
            const res = await getListBienSoCongBo();

            if (res && res.code === 200 && res.data) {
                setDanhSachCongBo(res.data);
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
        getListDanhSachCongBoBienSo();
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Tìm kiếm`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        className="bg-blue-400 text-sm font-medium"
                        type="default"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 100,
                        }}
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        className="bg-rose-400 text-sm font-medium"
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Đặt lại
                    </Button>
                    <Button
                        className="text-sm font-medium"
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Đóng
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    width: "40px",
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),

        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    function formatDateToHHMMDDMMYYYY(dateString) {
        const date = new Date(dateString);
        return format(date, "HH:mm - dd/MM/yyyy");
    }

    function formatDateToDDMMYYYY(dateString) {
        const date = new Date(dateString);
        return format(date, "dd/MM/yyyy");
    }
    function formatCurrency(price) {
        return price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    }
    //Collum
    const columns = [
        {
            title: "Số Biển",
            dataIndex: "soBien",
            width: 100,
            ...getColumnSearchProps("soBien"),
            render: (text, record) => <p>{text}</p>,
        },
        {
            title: "Thành Phố",
            dataIndex: "thanhPhoName",
            width: 100,
            ...getColumnSearchProps("thanhPhoName"),
            render: (text, record) => <p>{text}</p>,
        },
        {
            title: "Loại Xe",
            dataIndex: "loaiXeName",
            width: 100,
            ...getColumnSearchProps("loaiXeName"),
            render: (text, record) => <p>{text}</p>,
        },
        // {
        //     title: "Giá khởi điểm",
        //     dataIndex: "giaKhoiDiem",
        //     width: 100,
        //     sorter: {
        //         compare: (a, b) => a.giaKhoiDiem - b.giaKhoiDiem,
        //         multiple: 2,
        //     },
        //     ...getColumnSearchProps("giaKhoiDiem"),
        //     render: (text, record) => <p>{formatCurrency(text)}</p>,
        // },
        {
            title: "Thời gian dự kiến",
            dataIndex: "thoiGianBatDau",
            width: 100,
            render: (record) => formatDateToHHMMDDMMYYYY(record),
        },
    ];
    return (
        <>
            <div className=" bg-gradient-to-r from-cyan-100 via-purple-100 to-rose-100 min-h-screen">
                <div className="flex flex-col container mx-auto my-24 w-screen  md:w-9/12 mt-36">
                    <div className="mb-6 text-2xl font-medium">
                        <p className="text-lg md:text-2xl font-semibold text-blue-500 flex justify-center md:justify-normal">
                            Danh sách công bố biển số
                        </p>
                    </div>
                    <Spin spinning={loading} tip="Loading...">
                        {/* {!loading && ( */}
                        <Table
                            dataSource={danhSachCongBo}
                            columns={columns}
                            bordered
                            scroll={{
                                x: 900,
                            }}
                            pagination={{
                                pageSize: 8,
                            }}
                        />
                        {/* )} */}
                    </Spin>
                </div>
            </div>

        </>
    );
}
export default DanhSachCongBo;