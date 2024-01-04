import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBarAd from "../../component/admin/sidebar/SideBarAd";
import HeaderAd from "../../component/admin/header/HeaderAd";

export default function PrivateRouter() {
  const isLogin = JSON.parse(localStorage.getItem("userLogin"));
  // const isLogin = true;
  return (
    <>
      {isLogin && isLogin.role === 0 ? (
        <div className="d-flex">
          <SideBarAd />
          <div className="d-flex flex-column" style={{ flex: 1 }}>
            <HeaderAd />
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}
