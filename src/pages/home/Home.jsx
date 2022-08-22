import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Post from "../post/Post";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import "./home.css";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  // const url = "http://localhost:5000/";
  const url = "https://blogapp817.herokuapp.com/";

  useEffect(() => {
    const getSearch = async () => {
      const res = await axios.get(url + "api/post" + search);
      setPosts(res.data);
    };
    getSearch();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Post posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
