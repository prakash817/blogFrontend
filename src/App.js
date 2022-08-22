import Topbar from "./component/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/setting/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./pages/error/Error";
import "./app.css";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  // const user = false; //pseudo user
  const { user } = useContext(Context); //pseudo user
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route exact path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route exact path="/posts/:postid" element={<Single />} />
        {/* <Route exact path="*" element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
