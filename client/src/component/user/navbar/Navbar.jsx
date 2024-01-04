import { Button, Dropdown, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HistoryOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Profile from "./profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/slice/userSlice";
import "./navbar.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();
  // Lấy thông tin user đã đăng nhập
  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || {};
  const users = useSelector((state) => state?.user?.data);
  const isLoadingChange = useSelector((state) => state.product.isLoadingChange);

  const infoUserLogin = useSelector((state) => state.user.infoUserLogin);
  // console.log("==> thong tin userLogin: ", infoUserLogin);

  useEffect(() => {
    dispatch(getUser());
  }, [isLoadingChange]);

  const findUser = users?.find((u) => u.id === userLogin.id);

  // console.log(findUser);

  // useEffect(() => {
  //   if (findUser) {
  //     setUser(findUser);
  //     setImageURL(findUser?.avatar || "");
  //   }
  // }, [findUser]); // lấy dữ liệu về liên tục

  // Hàm mở form Profile
  const handleOpenProfile = () => {
    setProfile(true);
  };

  // Hàm đóng form Profile
  const handleCloseProfile = () => {
    setProfile(false);
  };

  const handleLogout = () => {
    // Xóa dữ liệu khỏi local
    localStorage.removeItem("userLogin");
    // Chuyển hướng về trang chủ
    navigate("/");
  };

  // Hàm xử lý đăng xuất
  const handleConfirmLogout = () => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to Logout ? ",
      onOk() {
        handleLogout();
      },
      cancelText: "Cancel",
      okText: "Accept",
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <a onClick={handleOpenProfile}>
          <UserOutlined className="mr-1" />
          Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={"/history"}>
          <HistoryOutlined className="mr-1" />
          History
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <a onClick={handleConfirmLogout}>
          <LogoutOutlined className="mr-1" />
          Logout
        </a>
      ),
    },
  ];

  return (
    <>
      {profile && <Profile handleCloseProfile={handleCloseProfile} />}

      <header className="main_menu home_menu">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg navbar-light">
                <NavLink className="navbar-brand" to={"/"}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/module2-project-82198.appspot.com/o/products%2Flogo.png?alt=media&token=3416dbc5-0cba-4db0-8715-f121ff82964a"
                    alt="logo"
                  />
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="menu_icon">
                    <i className="fas fa-bars" />
                  </span>
                </button>
                <div
                  className="collapse navbar-collapse main-menu-item"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" to={"/"}>
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink to={"/list-product"} className="nav-link ">
                        Shop
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink to={"/about"} className="nav-link ">
                        About
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink to={"/blog"} className="nav-link ">
                        Blog
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to={"/contact"}>
                        Contact
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="hearer_icon d-flex">
                  <div>
                    {findUser !== undefined && findUser.role === 1 ? ( // khác null là có dữ liệu
                      <>
                        <Dropdown
                          menu={{
                            items,
                          }}
                          placement="bottomLeft"
                          arrow
                        >
                          <Button className="border-none shadow-none bg-transparent ">
                            <div className="d-flex items-center gap-2">
                              <img
                                className="rounded-circle"
                                src={infoUserLogin.avatar || findUser.avatar}
                                alt="item"
                                width={26}
                                height={26}
                              />
                              {infoUserLogin.user_name || findUser.user_name}
                            </div>
                          </Button>
                        </Dropdown>
                      </>
                    ) : (
                      <>
                        <NavLink to="/login">
                          <i className="fa-solid fa-user mr-2"></i>
                        </NavLink>
                      </>
                    )}
                  </div>
                  <div className="dropdown cart">
                    <NavLink className="dropdown-toggle" to={"/cart"}>
                      <i className="fa-solid fa-cart-shopping"> </i>
                    </NavLink>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
