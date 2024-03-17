import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, getListUser } from "../../../services/public/account/loginServices"
const Login = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onLogin = async (values) => {
        try {
            console.log(values.SoDienThoai, values.Password)
            const response = await login(values.SoDienThoai, values.Password);
            // const response = await getListUser();
            console.log(response)
            if (response && response.code === 200) {
                navigate("/");
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
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
                            Đăng Nhập
                        </h1>
                        <Form
                            form={form}
                            onFinish={onLogin}
                            name="loginForm"
                            layout="vertical"
                            labelAlign="left"
                        >
                            {/* UserNAME */}
                            <Form.Item
                                label="SoDienThoai"
                                name="SoDienThoai"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập số điện thoại.",
                                    },
                                ]}
                                className="font-semibold"
                            >
                                <Input className="w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
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
                                        max: 60,
                                        message: "Mật khẩu phải ít hơn 60 kí tự",
                                    },
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
                                    Đăng nhập
                                </Button>

                            </Form.Item>
                        </Form>

                        <div className="flex items-center justify-center">
                            {/* <div className="text-sm mt-3 mr-4">Bạn chưa có tài khoản? </div> */}
                            <NavLink to="/*">
                                <p className="text-sm text-blue-600 hover:text-blue-700 hover:underline ">
                                    Quên mật khẩu ?
                                </p>
                            </NavLink>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="text-sm mt-5 mr-1.5">Bạn chưa có tài khoản? </div>
                            <NavLink to="/register">
                                <p className="text-sm mt-5 text-blue-600 hover:text-blue-700 hover:underline">
                                    Đăng ký
                                </p>
                            </NavLink>
                        </div>
                    </Spin>
                </div>
            </div>
        </>
    );
};

export default Login;
