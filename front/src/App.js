import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import MainPage from "./Components/mainPage/MainPage";
import Upload from "./Components/Upload/Upload";
import Viewupload from "./Components/Upload/Viewupload";
import Download from "./Components/Download/Download";
import Bin from "./Components/Upload/Bin";
import IMGtoIMG from "./Components/img2img/IMGtoIMG";
import TXTtoIMG from "./Components/txt2txt/TXTtoIMG";
import Download2 from "./Components/Download2/Download";

function App() {
  const [userstate, setUserState] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Register/>}></Route>
          <Route path="/MainPage" element={<MainPage/>}></Route>
          <Route path="/login" element={<Login setUserState={setUserState} />}></Route>
          <Route path="/Upload" element={<Upload/>}></Route>
          <Route path="/Bin" element={<Bin/>}></Route>
          <Route path="/Download" element={<Download/>}></Route>
          <Route path="/Viewupload" element={<Viewupload/>}></Route>
          <Route path="/TXTtoIMG" element={<TXTtoIMG/>}></Route>
          <Route path="/IMGtoIMG" element={<IMGtoIMG/>}></Route>
          <Route path="/Download2" element={<Download2/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
