import { Modal } from "antd";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { login } from "../../../services/public/account/loginServices"

function ModalLogin({ isModalOpen, handleClose }) {

    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onLogin = async (values) => {
        setIsLoading(true);
        try {
            const response = await login(values.SoDienThoai, values.Password);
            if (response && response.code === 200) {
                localStorage.setItem('userLogined', JSON.stringify(response.data));
                window.location.href = '/daugia/now';
                handleClose();
                // toast.success(response.message);
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
            <Modal
                open={isModalOpen} // Use "visible" instead of "open"
                onCancel={handleClose}
                centered
                loading={true}
                footer={(_) => <></>}
            >
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
                            label="Số điện thoại"
                            name="SoDienThoai"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại.",
                                },
                            ]}
                            className="font-semibold"
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

            </Modal>

        </>
    );
}
export default ModalLogin;