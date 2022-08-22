import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Context } from "../../context/Context";
import "./write.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  // const url = "http://localhost:5000/";
  const url = "https://blogapp817.herokuapp.com/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        const d = await axios.post(url + "api/upload", data);
        console.log(d, "uplod url");
      } catch (error) {
        console.log(error);
      }
    }
    console.log(newPost, "write");

    try {
      const res = await axios.post(url + "api/post/", newPost);
      window.location.replace("/posts/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt="fileImg"
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <AiOutlinePlus className="writeIcon" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="inputTitle writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            type="text"
            className="writeTextArea writeInput"
            placeholder="Tell Your Story...."
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
