import React from "react";
import "./headerAd.css";
import {
  BellOutlined,
  LogoutOutlined,
  MenuOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Modal } from "antd";
import { useNavigate } from "react-router-dom";

export default function HeaderAd() {
  const navigate = useNavigate();
  // Lấy thông tin user đã đăng nhập
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

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
        <a onClick={handleConfirmLogout}>
          <LogoutOutlined className="mr-1" />
          Logout
        </a>
      ),
    },
  ];

  return (
    <div>
      <div className="header-admin">
        <div>
          <MenuOutlined style={{ fontSize: 25 }} />
        </div>
        <div className="d-flex gap-3">
          <BellOutlined style={{ fontSize: 20 }} />
          <MessageOutlined style={{ fontSize: 20 }} />

          <Dropdown
            menu={{
              items,
            }}
            placement="bottomLeft"
            arrow
          >
            <Button className="btn-logout-admin">
              <div className="d-flex items-center gap-2 info-admin">
                <img
                  className="rounded-circle"
                  src={userLogin.avatar}
                  alt="item"
                  width={26}
                  height={26}
                />
                {userLogin.user_name}
              </div>
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
