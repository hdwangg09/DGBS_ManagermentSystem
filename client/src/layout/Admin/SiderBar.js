import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";

import {
  LineChartOutlined,
  BarChartOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { Breadcrumb, Layout, theme } from "antd";
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
const items = [
  getItem("Thống kê", "sub1", <PieChartOutlined />, [
    getItem(
      <NavLink to="/manager/dashboard">Thống kê ngày</NavLink>,
      "1",
      <BarChartOutlined />
    ),
    getItem(
      <NavLink to="/manager/dashboard/StatisticByTime">
        Thống kê hệ thống
      </NavLink>,
      "2",
      <LineChartOutlined />
    ),
  ]),
  getItem(
    <Link to="/manager/users">Tài Khoản</Link>,
    "3",
    <i className="fa-solid fa-user"></i>
  ),
  getItem(
    <Link to="/manager/pitchs">Sân bóng</Link>,
    "4",
    <i className="fa-solid fa-futbol"></i>
  ),
  getItem(
    <Link to="/manager/bookings">Đơn Đặt</Link>,
    "5",
    <i className="fa-solid fa-money-bill"></i>
  ),
  getItem(
    <NavLink to="/manager/services">Dịch vụ</NavLink>,
    "6",
    <i className="fa-solid fa-wine-bottle"></i>
  ),
  getItem(
    <NavLink to="/manager/posts">Bài viết</NavLink>,
    "7",
    <i className="fa-solid fa-blog"></i>
  ),
  getItem(
    <NavLink to="/manager/commentPosts">Bình luận</NavLink>,
    "8",
    <i className="fa-solid fa-comment"></i>
  ),
  getItem(
    <NavLink to="/manager/reviewPitchs">Đánh giá sân</NavLink>,
    "9",
    <i className="fa-regular fa-eye"></i>
  ),
  getItem(
    <NavLink to="/manager/sliders">Slider</NavLink>,
    "10",
    <i className="fa-solid fa-sliders"></i>
  ),
];
const Siderbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: 150,
      }}
    >
      {/* <div className="flex items-center justify-center h-48 shadow-md ">
        <figure className="relative max-w-sm transition-all duration-300  filter ">
          <img
            className="h-48 opacity-75"
            src="https://lh3.googleusercontent.com/p/AF1QipMoUZZu4wNV0c7v8iZbRWC2n1kAIVZu3Xy5v87b=s680-w680-h510"
            alt="#"
          />

          <figcaption className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 text-lg text-white">
            <NavLink to="/" className="flex items-center flex-col">
              <img
                src={logo}
                className="w-16 h-16 mr-3 rounded-full "
                alt="App Logo"
              />
              <span className="self-center hidden md:block text-blue-700 text-xl font-semibold whitespace-nowrap">
                Sân bóng Đại Dương
              </span>
            </NavLink>
          </figcaption>
        </figure>
      </div> */}
      {/* <Button
        type="default"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
        />
      </Sider>
    </div>
  );
};
export default Siderbar;
