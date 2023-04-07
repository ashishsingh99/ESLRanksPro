import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { profile_withApi } from "../../services/constants";
import logo from "../Assets/seoimg/logo.png";
import "../css/header.css";
import userImg from "../Assets/seoimg/userImg.jpg";
import RippleButton from "./components/rippleButton";
import { Logout } from "./upDater/constant";
const Header = () => {
  const profile = localStorage.getItem('name')
  const navigate = useNavigate();
  const ProType = () => {
    const loginOut = localStorage.getItem("loginOut");
    if (loginOut === "true") {
      return (
        <>
          <div className="d-flex nv-select" style={{ alignItems: "center" }}>
            <div className="us-logo ">
              {/* <i className="fa-solid fa-user"></i> */}
              <img
                style={{ width: "100%", borderRadius: "50%", height: "100%" }}
                src={userImg}
                alt="img"
              ></img>
            </div>

            <div className="nv-select">
              {profile ? profile : "AdminTest"}
              <div className="nv-select_con ">
                <ul>
                  <li onClick={Profile}> Profile</li>
                  <li onClick={Logout}>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Link to="login">
            <RippleButton>Sign in</RippleButton>
          </Link>
        </>
      );
    }
  };



  const Profile = () => {
    navigate("profile");
  };

  return (
    <>
      <div className="navBar">
        <div className=" d-flex">
          <div className="nv-logo">
            <Link to="/">

              <img src={logo} alt="img"></img>{" "}
            </Link>
          </div>
          <ul className="nv-ul ms-auto">
            <Link to="upgrade">
              <li>
                <RippleButton>Upgrade</RippleButton>
              </li>
            </Link>
            {/* <Link to="/admin/users">
              <li>
                <RippleButton>Admin</RippleButton>
              </li>
            </Link> */}
            <li>
              <ProType />
            </li>
          </ul>
        </div>
      </div>

      <div className="nv-btn">
        <div className="nv-btn-body">
          <ul className="nv-ul2">
            <li>
              <NavLink to="/">
                <i className="fa-solid fa-table"></i> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="rank">
                <i className="fa-solid fa-circle-nodes fa-spin"></i> Rank Tracking
              </NavLink>
            </li>
            <li>
              <NavLink to="siteaudit">
              <i className="fa-solid fa-sitemap"></i> Site Audit
              </NavLink>
            </li>
            <li>
              <NavLink to="keywords">
                <i className="fa-solid fa-bolt"></i> Keywords
              </NavLink>
            </li>
            <li>
              <NavLink to="traffic">
                <i className="fa-solid fa-people-group"></i> Traffic
              </NavLink>
            </li>
            <li>
              <NavLink to="backlinks">
              <i className="fa-solid fa-link "></i> Backlinks
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
