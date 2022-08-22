import React, { useContext } from "react";
import "./topbar.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiOutlineSearch,
} from "react-icons/ai";
import {
  FaInstagramSquare,
  FaPinterestSquare,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const Topbar = () => {
  const { user, dispatch } = useContext(Context); //pseudo user
  // const PF = "http://localhost:5000/images";
  const PF = "https://blogapp817.herokuapp.com/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="topbar">
      <div className="topbarLeftDiv">
        <AiFillFacebook className="topIcon" />
        <AiFillYoutube className="topIcon" />
        <AiFillTwitterSquare className="topIcon" />
        <FaPinterestSquare className="topIcon" />
        <FaInstagramSquare className="topIcon" />
      </div>
      <div className="topbarCenterDiv">
        <ul className="topList">
          <Link to={"/"}>
            <li className="topListItem">HOME</li>
          </Link>
          <Link to={"/about"}>
            <li className="topListItem">ABOUT</li>
          </Link>
          <Link to={"/contact"}>
            <li className="topListItem">CONTACT</li>
          </Link>
          <Link to={"/write"}>
            <li className="topListItem">WRITE</li>
          </Link>

          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topbarRightDiv">
        {user ? (
          <Link to={"/settings"}>
            {user.profilePic ? (
              <img
                className="topImg"
                src={PF + user.profilePic}
                alt="profilePic"
              />
            ) : (
              <FaUserCircle className="topImg" />
            )}
          </Link>
        ) : (
          <ul className="topList">
            <Link to={"/login"}>
              <li className="topListItem">Login</li>
            </Link>
            <Link to={"/register"}>
              <li className="topListItem">Register</li>
            </Link>
          </ul>
        )}

        {/* <div className="searchIcon"> */}
        <AiOutlineSearch className="searchIcon" />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Topbar;
