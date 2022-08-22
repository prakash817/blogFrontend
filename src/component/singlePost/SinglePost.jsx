import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import "./singlePost.css";
import { Context } from "../../context/Context";

const SinglePost = () => {
  const [post, setPost] = useState({});
  const postId = window.location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  // const url = https://blogapp817.herokuapp.com/
  // const url = "http://localhost:5000/";
  const url = "https://blogapp817.herokuapp.com/";
  const PF = url+"images/";
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(url + `api/post/${postId}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/post/" + postId, {
        data: {
          username: user.username,
        },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  //UpdatingSingle Post
  const handleUpdate = async () => {
    try {
      await axios.put(url + "api/post/" + postId, {
        username: user.username,
        title,
        desc,
      });
      // window.location.reload();
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
            className="singlePostImg"
            src={PF + post.photo}
            alt="sinlgePost"
          />
        )}

        {updateMode ? (
          <input
            type={"text"}
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <FiEdit
                  className=" singlePostIcon"
                  onClick={() => setUpdateMode(true)}
                />
                <AiFillDelete
                  className=" singlePostIcon"
                  onClick={handleDelete}
                />
              </div>
            )}
          </h1>
        )}
        {!updateMode && (
          <div className="singlePostInfo">
            <Link className="link" to={`/?username=${post.username}`}>
              <span className="singlePostAuthor">
                author : <b>{post.username}</b>
              </span>
            </Link>
            <span className="singlePostDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
        )}
        {updateMode ? (
          <>
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button className="singlePostButton" onClick={handleUpdate}>
              Update Post
            </button>{" "}
          </>
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
