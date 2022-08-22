import React from "react";
import { Link } from "react-router-dom";
import "./posts.css";

const Posts = ({ post }) => {
  const { categories, title, createdAt, disc, photo, _id } = post;
  // const url = "http://localhost:5000/";
  const url = "https://blogapp817.herokuapp.com/";

  const PF = url + "images/";

  return (
    <div className="posts">
      <Link className="link" to={{ pathname: `/posts/${_id}` }}>
        {photo && <img className="postsImg" src={PF + photo} alt="" />}
      </Link>
      <div className="postsInfo">
        <div className="postsCats">
          {categories.map((c, i) => (
            <span className="postsCat" key={i}>
              {c}
            </span>
          ))}
        </div>
        <Link className="link" to={{ pathname: `/posts/${_id}` }}>
          <div className="postsTitle">{title}</div>
        </Link>
        <hr />
        <div className="postsDate">{new Date(createdAt).toDateString()}</div>
      </div>
      <p className="postsDisc">{disc}</p>
    </div>
  );
};

export default Posts;
//1.18
