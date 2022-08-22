import axios from "axios";
import React, { useContext, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Context } from "../../context/Context";
import Sidebar from "../sidebar/Sidebar";
import "./settings.css";

const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  // const url = "http://localhost:5000/";
  const url = "https://blogapp817.herokuapp.com/";

  const PF = url + "images/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "UPDATE_START" });

    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        const d = await axios.post(url + "api/upload", data);
        console.log(d, "uplod url");
      } catch (error) {
        console.log(error);
      }
    }
    console.log(updatedUser, "write");

    try {
      const res = await axios.put(url + "api/user/" + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setFlag(true);
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle"> Update Your Account</span>
          <span className="settingsDeleteTitle"> Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <BiUserCircle className="settingsPPIcon" />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label htmlFor=""> UserName</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor=""> E-mail</label>
          <input
            type="text"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="">Password </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {flag && <p>Update Success</p>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
