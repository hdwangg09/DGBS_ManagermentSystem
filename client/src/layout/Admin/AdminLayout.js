// import { useState } from "react";
import logo from "../../assets/images/LoGoDauGia.png";
import { Spin } from "antd"; // Import Spin
import AdminHeader from "../HeaderAdmin/AdminHeader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { TbSoccerField } from "react-icons/tb";

import { PieChartFilled } from "@ant-design/icons";

import { Breadcrumb, Layout, Menu, theme, Space } from "antd";
import NotFound from "../../pages/NotFound/NotFound";

//!SECTION
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const itemsAdmin = [
  getItem(
    <NavLink
      to="/manager/dashboard"
      className="flex items-center transform hover:translate-x-4 bg-transparent rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
    >
      Thống kê
    </NavLink>,
    "/manager/dashboard",
    <Link to="/manager/dashboard">
      <PieChartFilled />
    </Link>
  ),
  getItem(
    <NavLink
      to="/manager/users"
      className="flex items-center transform hover:translate-x-4 bg-transparent rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
    >
      Quản lý Tài Khoản
    </NavLink>,
    "/manager/users",
    <Link to="/manager/users">
      <i className="fa-solid fa-user"></i>
    </Link>
  ),
  getItem(
    <Link
      className="flex  items-center transform hover:translate-x-4 bg-transparent rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
      to="/manager/pitchs"
    >
      Quản lý Sân bóng
    </Link>,
    "/manager/pitchs",
    <Link to="/manager/pitchs">
      <TbSoccerField />
    </Link>
  ),

  getItem(
    <NavLink
      className="flex  items-center transform hover:translate-x-4 bg-transparent rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
      to="/manager/services"
    >
      Quản lý Dịch vụ
    </NavLink>,
    "/manager/services",
    <Link to="/manager/services">
      <i className="fa-solid fa-wine-bottle"></i>
    </Link>
  ),
];

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};

function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);


  const [roleId, setRoleId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function decodeToken() {

      setRoleId(1);
      setIsLoading(false);
    }

    decodeToken();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin spinning={isLoading} />
      </div>
    );
  }

  if (+roleId === +1) {
    return (
      <>
        <Space
          direction="vertical"
          style={{
            width: "100%",
            height: "100vh",
          }}
          size={[0, 48]}
        >
          <Layout
            style={{
              minHeight: "100vh",
            }}
          >
            <Sider
              breakpoint="md"
              // collapsedWidth="10"
              collapsible
              collapsed={collapsed}
              theme="dark"
              width="260"
              onCollapse={(value) => setCollapsed(value)}
            // className="hidden md:block"
            >
              <div className="flex items-center justify-center h-48 shadow-md mb-4">
                <figure className="relative max-w-sm transition-all duration-300  filter ">
                  <img
                    className="h-48 opacity-90"
                    src="https://lh3.googleusercontent.com/p/AF1QipMoUZZu4wNV0c7v8iZbRWC2n1kAIVZu3Xy5v87b=s680-w680-h510"
                    alt="#"
                  />

                  <figcaption className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-white">
                    <NavLink to="/" className="flex items-center flex-col">
                      <img
                        src={logo}
                        className={
                          collapsed
                            ? "w-10 h-10 rounded-full "
                            : "w-14 h-14 rounded-full"
                        }
                        alt="App Logo"
                      />
                      <span className="self-center mt-2 hidden  sm:block text-white text-lg font-semibold whitespace-nowrap">
                        {collapsed ? "" : "Sân bóng Đại Dương"}
                      </span>
                    </NavLink>
                  </figcaption>
                </figure>
              </div>
              <Menu
                // defaultSelectedKeys={["/manager/dashboard"]}
                defaultOpenKeys={["/manager/dashboard"]}
                selectedKeys={[location.pathname]}
                // openKeys={[location.pathname]}
                mode="inline"
                theme="dark"
                // inlineCollapsed={collapsed}
                items={itemsAdmin}
              />
            </Sider>
            <Layout>
              <div className="w-full flex justify-center">
                <div className="w-3/5">
                  <AdminHeader />
                </div>
              </div>
              <Content className=" p-6 md:p-12">{children}</Content>
            </Layout>
          </Layout>
        </Space>
      </>
    );
  } else {
    return (
      <>
        <NotFound />
      </>
    );
  }
}

export default AdminLayout;
