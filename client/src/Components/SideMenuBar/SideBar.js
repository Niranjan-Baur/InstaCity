import React from "react";
import "./SideBar.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import InstagramIcon from "@mui/icons-material/Instagram";

import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const userId = sessionStorage.getItem("userID");

  const navigate = useNavigate();

  return (
    <>
      <div className="SideBar">
        <div className="SideBarTop">
          {/* <InstagramIcon className="icon" /> */}
          <span>InstaCity</span>
        </div>
        <div className="SideBarMid">
          <ul>
            <Link className="link" to="/">
              <li onClick={() => console.log("hello")}>
                <HomeRoundedIcon className="icon" />
                <span>Home</span>
              </li>
            </Link>
            <Link className="link" to="/">
              <li onClick={() => console.log("Search")}>
                <SearchRoundedIcon className="icon" />
                <span>Search</span>
              </li>
            </Link>
            <Link className="link" to="/">
              <li onClick={() => console.log("Notification")}>
                <NotificationsActiveRoundedIcon className="icon" />
                <span>Notification</span>
              </li>
            </Link>
            <Link className="link" to="/createpost">
              <li
                onClick={() => {
                  console.log("Create");
                  navigate("/createpost");
                }}
              >
                <AddCircleOutlineRoundedIcon className="icon" />
                <span>Create</span>
              </li>
            </Link>
            <Link className="link" to={`/users/${userId}`}>
              <li
                onClick={() => {
                  console.log("Profile");
                  navigate(`/users/${userId}`);
                }}
              >
                <AccountCircleRoundedIcon className="icon" />
                <span>Profile</span>
              </li>
            </Link>
          </ul>
        </div>
        <Link
          onClick={() => {
            // document.cookie = `email=; expires=Thu, 01 Jan 1970 00:00:01`
            sessionStorage.clear();
          }}
          to="/login"
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="SideBarBottom">
            <LogoutRoundedIcon className="icon" />
            <span>Logout</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SideBar;
