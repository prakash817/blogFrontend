import React from "react";
import "./post.css";
import Posts from "./posts/Posts";

const Post = ({ posts }) => {
  return (
    <div className="post">
      {posts.map((p, i) => (
        <Posts key={i} post={p} />
      ))}
    </div>
  );
};

export default Post;
