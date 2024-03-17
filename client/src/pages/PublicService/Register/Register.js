import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../../services/public/account/loginServices"

function Register() {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const onRegister = async (values) => {
        setIsLoading(true);
        try {
            // console.log(values.HoTen, values.Email, values.SoDienThoai, values.Password);
            const response = await register(values.HoTen, values.Email, values.SoDienThoai, values.Password);
            if (response && response.code === 200) {
                navigate("/login");
                toast.success(response.message);
            } else if (response && response.code !== 200) {
                toast.error(response.message);
            } else {
                toast.error("Vui lòng thử lại sau");
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div>
                <div className="w-full p-12 m-auto bg-white rounded-3xl shadow-blue-400/50 ring-2 ring-gray-100 max-w-xl shadow-xl mx-auto">
                    <Spin spinning={isLoading} tip="Loading...">
                        <h1 className="text-3xl font-semibold text-center from-blue-200 via-blue-500 to-blue-200 bg-gradient-to-r bg-clip-text text-transparent mb-4">
                            Đăng ký
                        </h1>
                        <Form
                            form={form}
                            onFinish={onRegister}
                            name="loginForm"
                            layout="vertical"
                            labelAlign="left"
                        >
                            {/* NAME */}
                            <Form.Item
                                label="Họ tên"
                                name="HoTen"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập họ tên.",
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (value && !/^[a-zA-Z0-9À-Ỹà-ỹ\s]+$/.test(value)) {
                                                return Promise.reject("Có chứa ký tự không hợp lệ.");
                                            }
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
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                                className="font-semibold"
                            >
                                <Input className="w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </Form.Item>
                            {/* SDT */}
                            <Form.Item
                                name="SoDienThoai"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập số điện thoại.",
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
                                            if (value && !/^(0\d{9})$/.test(value)) {
                                                return Promise.reject(
                                                    "Số điện thoại không hợp lệ!"
                                                );
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                                className="block text-sm font-semibold text-gray-800"
                            >
                                <Input className="w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </Form.Item>
                            {/* Email */}
                            <Form.Item
                                name="Email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập email.",
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
                                            if (
                                                value &&
                                                !/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(
                                                    value
                                                )
                                            ) {
                                                return Promise.reject("Email không hợp lệ!");
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                                className="block text-sm font-semibold text-gray-800"
                            >
                                <Input className="w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </Form.Item>
                            {/* PASSWORD */}
                            <Form.Item
                                name="Password"
                                label="Mật khẩu"
                                rules={[
                                    { required: true, message: "Vui lòng nhập mật khẩu" },
                                    {
                                        min: 6,
                                        message: "Mật khẩu phải có ít nhất 6 kí tự",
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
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                                className="block text-sm font-semibold text-gray-800"
                            >
                                <Input.Password className="w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </Form.Item>
                            {/* Comfirm Pass */}
                            <Form.Item
                                name="ComfirmPassword"
                                label="Nhập lại mật khẩu."
                                dependencies={["Password"]}
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập lại mật khẩu"
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("Password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject("Xác nhận mật khẩu không đúng");
                                        },
                                    }),
                                ]}
                                className="block text-sm font-semibold text-gray-800"
                            >
                                <Input.Password className="w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="default"
                                    htmlType="submit"
                                    className="bg-gradient-to-r from-cyan-400 to-blue-300 w-full 
                                    hover:!from-cyan-300 hover:!to-blue-400 hover:!bg-gradient-to-r hover:!bg-gradient-to-r hover:!bg-blue-500 
                                    focus:!text-white text-white text-xl font-medium flex items-center justify-center p-5 mt-6"
                                >
                                    Đăng ký
                                </Button>

                            </Form.Item>
                        </Form>
                        <div className="flex items-center justify-center">
                            <div className="text-sm mt-5 mr-1.5">Bạn chưa đã có tài khoản? </div>
                            <NavLink to="/login">
                                <p className="text-sm mt-5 text-blue-600 hover:text-blue-700 hover:underline">
                                    Đăng nhập
                                </p>
                            </NavLink>
                        </div>
                    </Spin>
                </div>
            </div>
        </>
    );
}
export default Register;