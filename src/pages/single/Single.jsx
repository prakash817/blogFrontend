import SinglePost from "../../component/singlePost/SinglePost";
import Post from "../post/Post";
import Sidebar from "../sidebar/Sidebar";
import "./single.css";

const Single = () => {
  return (
    <div className="single">
      {/* <Post/> */}
      <SinglePost />
      <Sidebar />
    </div>
  );
};

export default Single;
