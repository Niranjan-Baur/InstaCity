import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../Components/SideMenuBar/SideBar";
import Post from "../../Components/Widget/Post/Post";
import "./Home.css"

const Home = () => {
  const navigate = useNavigate();

  const x = sessionStorage.getItem("userID");


  useEffect(() => {

    if (x) {
      navigate("/");
    } else {
      navigate("/login");
    }
  },[x]);

  return (
    <div className="home">
      <SideBar />
      <div className="homeCont">
        <Post />
      </div> 
    </div>
  );
};

export default Home;
