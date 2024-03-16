import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
function SidebarAdmin() {
  return (
    <>
      <div className="">
        <Sidebar>
          <div className="flex items-center justify-center h-48 shadow-md ">
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
          </div>
          <Menu>
            <SubMenu
              label="Thống kế"
              icon={<i className="fas fa-chart-pie"></i>}
              className="text-sm font-medium text-black-400"
            >
              <MenuItem>
                <NavLink
                  to="/manager/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "flex flex-row items-center h-12 transform hover:translate-x-3 bg-sky-100 rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
                      : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  }
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-black-400">
                    {/* <i className="fas fa-chart-pie text-xl mr-2"></i>  */}
                    <i className="fas fa-chart-pie"></i>
                  </span>
                  <span className="text-sm font-medium text-black-400">
                    Thống kê ngày
                  </span>
                </NavLink>{" "}
              </MenuItem>
              <MenuItem>
                <NavLink
                  to="/manager/dashboard/StatisticByTime"
                  className={({ isActive }) =>
                    isActive
                      ? "flex flex-row items-center h-12 transform hover:translate-x-3 bg-sky-100 rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
                      : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  }
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-black-400">
                    <i className="fa-solid fa-gauge"></i>
                  </span>
                  <span className="text-sm font-medium text-black-400">
                    Thống kê hệ thống
                  </span>
                </NavLink>{" "}
              </MenuItem>
            </SubMenu>
            <MenuItem>
              <NavLink
                to="/manager/users"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row items-center h-12 transform hover:translate-x-3 bg-gray-100 rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
                    : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                }
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-black-400">
                  <i className="fa-solid fa-user"></i>
                </span>
                <span className="text-sm font-medium text-black-400">
                  Tài khoản
                </span>
              </NavLink>{" "}
            </MenuItem>
            <MenuItem>
              {" "}
              <NavLink
                to="/manager/pitchs"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row items-center h-12 transform hover:translate-x-3 bg-gray-100 rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
                    : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                }
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-black-400">
                  <i className="fa-solid fa-futbol"></i>
                </span>
                <span className="text-sm font-medium">Sân Bóng</span>
              </NavLink>{" "}
            </MenuItem>
            <MenuItem>
              {" "}
              <NavLink
                to="/manager/bookings"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row items-center h-12 transform hover:translate-x-3 bg-gray-100 rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
                    : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                }
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-black-400">
                  <i className="fa-solid fa-money-bill"></i>
                </span>
                <span className="text-sm font-medium">Đặt sân</span>
              </NavLink>{" "}
            </MenuItem>
            <MenuItem>
              {" "}
              <NavLink
                to="/manager/services"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row items-center h-12 transform hover:translate-x-3 bg-gray-100 rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
                    : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                }
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-black-400">
                  <i className="fa-solid fa-wine-bottle"></i>
                </span>
                <span className="text-sm font-medium">Dịch vụ</span>
              </NavLink>{" "}
            </MenuItem>
            <MenuItem>
              {" "}
              <NavLink
                to="/manager/posts"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row items-center h-12 transform hover:translate-x-3 bg-gray-100 rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
                    : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                }
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-black-400">
                  <i className="fa-solid fa-blog"></i>
                </span>
                <span className="text-sm font-medium">Bài viết</span>
              </NavLink>{" "}
            </MenuItem>
            <MenuItem>
              <NavLink
                to="/manager/commentPosts"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row items-center h-12 transform hover:translate-x-3 bg-gray-100 rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
                    : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                }
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-black-400">
                  <i className="fa-solid fa-comment"></i>
                </span>
                <span className="text-sm font-medium">Bình luận</span>
              </NavLink>{" "}
            </MenuItem>
            <MenuItem>
              {" "}
              <NavLink
                to="/manager/reviewPitchs"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row items-center h-12 transform hover:translate-x-3 bg-gray-100 rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
                    : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                }
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-black-400">
                  <i className="fa-regular fa-eye"></i>
                </span>
                <span className="text-sm font-medium">Đánh giá sân</span>
              </NavLink>{" "}
            </MenuItem>
            <MenuItem>
              {" "}
              <NavLink
                to="/manager/sliders"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row items-center h-12 transform hover:translate-x-3 bg-gray-100 rounded-r-3xl transition-transform ease-in duration-200 text-blue-500 hover:text-blue-800"
                    : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                }
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-black-400">
                  <i className="fa-solid fa-sliders"></i>
                </span>
                <span className="text-sm font-medium">Slider</span>
              </NavLink>{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}

export default SidebarAdmin;
