import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";
import { FaInstagramSquare, FaPinterestSquare } from "react-icons/fa";
import "./sidebar.css";

const Sidebar = () => {
  const [cat, setCats] = useState([]);
  // const url = "http://localhost:5000/";
  const url = "https://blogapp817.herokuapp.com/";

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(url + `api/category`);
      // console.log(res.data, "sidebar");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <div className="sidebarItemTitle">ABOUT ME</div>
        <img
          src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg"
          alt=""
          className="titleImg"
        />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae et
          rerum quasi excepturi necessitatibus fuga, beatae in non nisi delectus
          laboriosam voluptatibus{" "}
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarItemTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cat.map((c, i) => (
            <Link className="link" to={`/?cat=${c.name}`} key={i}>
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      {/* //social */}
      <div className="sidebarItem">
        <span className="sidebarItemTitle">FOLLOW US</span>
        <ul className="sidebarSocial">
          <AiFillFacebook className="sidebarIcon" />
          <AiFillTwitterSquare className="sidebarIcon" />
          <FaPinterestSquare className="sidebarIcon" />
          <FaInstagramSquare className="sidebarIcon" />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
