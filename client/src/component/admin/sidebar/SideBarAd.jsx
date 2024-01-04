import React from "react";
import "./sideBarAd.css";
import { NavLink } from "react-router-dom";

export default function SideBarAd() {
  return (
    <>
      <div className="sidebar-admin">
        <div className="sidebar-logo">
          <h3>
            <i className="fa-solid fa-couch"></i> Aranoz.
          </h3>
        </div>
        <div>
          <NavLink to={"/admin"} className={"router-item"}>
            <div className="router-title">Admin Home</div>
          </NavLink>
          <NavLink to={"/admin/manager-category"} className={"router-item"}>
            <div className="router-title">Manager Category</div>
          </NavLink>
          <NavLink to={"/admin/manager-product"} className={"router-item"}>
            <div className="router-title">Manager Product</div>
          </NavLink>
          <NavLink to={"/admin/manager-user"} className={"router-item"}>
            <div className="router-title">Manager User</div>
          </NavLink>
          <NavLink to={"/admin/manager-order"} className={"router-item"}>
            <div className="router-title">Manager Order</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
