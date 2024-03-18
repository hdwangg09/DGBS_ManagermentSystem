import { Modal } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoName from "../../../assets/images/LogoDauGia.png";
import ModalLogin from "./ModalLogin";
import { login } from "../../../services/public/account/loginServices"
function ModalNotificationLogin({ isModalOpen, handleClose }) {

    const [isShowModalLogin, setIsShowModalLogin] = useState(false);

    const handleOpenMethodLogin = () => {
        setIsShowModalLogin(true);
        handleClose();
    };

    const handleCloseModal = () => {
        setIsShowModalLogin(false);
    };
    return (
        <>
            <Modal
                open={isModalOpen}
                onCancel={handleClose}
                centered
                footer={(_) => <></>}
            >
                <div className=" flex flex-col justify-center items-center md:p-12 ">
                    <div className="w-full flex justify-center">
                        <img className="w-28" src={logoName} alt="zz" />
                    </div>
                    <div className="mt-4 flex justify-center items-center mb-6 nd:mb-12 font-medium">
                        <div className="text-base md:text-lg  mr-1.5">
                            Bạn đã có tài khoản?{" "}
                        </div>
                        <button
                            className="text-lg  text-blue-600 hover:text-blue-700 hover:underline"
                            onClick={() => handleOpenMethodLogin()}
                        >
                            Đăng nhập
                        </button>
                    </div>

                    <div className="text-base">
                        <Link to={`/register`}>
                            <button
                                type="default"
                                className="bg-blue-500 w-full hover:bg-blue-700 focus:!text-white text-white text-lg md:text-xl font-medium rounded-lg flex items-center justify-center px-4 py-2 "
                            >
                                Đăng ký tài khoản.
                            </button>
                        </Link>
                    </div>
                </div>
            </Modal>

            <ModalLogin
                isModalOpen={isShowModalLogin}
                handleClose={handleCloseModal}
            />
        </>
    );
}

export default ModalNotificationLogin;
