import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { BrowserRouter, Switch, Routes, Route, Link } from "react-router-dom";
import MainForm from "./components/forms/MainForm";
import VideoChannel from "./components/forms/VideoChannel";
import { connect, useDispatch } from "react-redux";
import Login from "./Auth/Login";
import Profile from "./components/pages/Profile";
import EditProfile from "./components/pages/EditProfile";
import Thankyou from "./components/forms/Thankyou";
import NotFound from "./components/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import AddGenre from "./components/dashboard/genre/AddGenre";
import ListGenre from "./components/dashboard/genre/ListGenre";
import CreateArchive from "./components/forms/ArchiveVideoForm";
import ArchiveVideoList from "./components/pages/ArchiveVideos";

import Welcome from "./components/pages/Welcome";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./Auth/ForgotPassword";
import PinCode from "./Auth/Otp";
import ResetPassword from "./Auth/ResetPassword";
import Evaluation from "./components/forms/Evaluation";
import Pusher from "pusher-js";
import baseApi from "./baseApi";
import { Button, Modal } from "antd";
import { evaluateTotalNotification,  getLatestModifyVideo, getLatestMessage,getModifyVideos } from "./reducer/Actions";
import EvaluateVideosList from "./components/pages/EvaluateVideosList";
import ModifyVideoList from "./components/forms/ModifyVideoList";
import EditNewsForm from "./components/forms/EditNewsForm";
import EditNewsDetail from "./components/forms/EditNewsDetail";
import ChatRoom from "./components/chat/ChatRoom";
import ChatBox from "./components/chat/ChatBox";
import useSound from "use-sound";
import mySound from './notification.mp3';
 
function App(props) {
  // const mySound = "http://localhost:3000/notification3.mp3"
  const audioPlayer = useRef(null);
  const [playSound, { stop }] = useSound(mySound, { interrupt: true })
  const [playOn] = useSound(mySound, { interrupt: true })
  const playSoundHandler = () => {
    const audio = new Audio("http://localhost:3000/notification3.mp3");
    audio.addEventListener('canplaythrough', (event) => {
      // the audio is now playable; play it if permissions allow
      audio.play();
    });
  };
  let { isLogin, evaluateTotalNotification,  getLatestModifyVideo, getLatestMessage, getModifyVideos } = props;
  let token = localStorage.getItem("token");
  const [isModalVisible, setIsModalVisible] = useState(false); 
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  }

  function playAudio() {
    audioPlayer.current.play();
  }

  const dispatch = useDispatch();
  // useEffect(() => {
  //   playSound()
  // }, [playSound]);
  useEffect(() => {
    if(user){
      Pusher.logToConsole = true;
      const pusher = new Pusher("d3d0a052dfa30840b4b4", {
        cluster: "mt1",
      });
      var channel = pusher.subscribe("pending-video");
      channel.bind("pending", function (data) {
        if (user.id == data.evaluator_id) {
          audioPlayer.current.play(); 
          evaluateTotalNotification(data);
          setIsModalVisible(true);
        }
      });
      var evaluateChannelVideo = pusher.subscribe("evaluate-video");
      evaluateChannelVideo.bind("evaluate", function (data) {
        let modifier = "";
        if(data.evaluation){
           modifier = JSON.parse(data.evaluation)
        }
        if (user.id == data.poster_id) {
          audioPlayer.current.play(); 
          getLatestModifyVideo(modifier, data.msg, data.channel_name);
        }
      });
  
      var conversationChannel = pusher.subscribe("conversation");
      conversationChannel.bind("message", function (data) {
        let modifier = "";
        if(data.evaluation){
           modifier = JSON.parse(data.evaluation)
        }
        if (user.id == data.receiver_id) {
          playOn()
          getLatestMessage(data);
        }
      });
    }

    let token = localStorage.getItem("token");
    baseApi.setToken(token);
  }, []);
  let notificationSoundHandler = () => {
    playSound()
  }
  return (
    <>
     {/* <button onClick={() => notificationSoundHandler()}>
       Play Sound
    </button> */}
    <audio
    
    ref={audioPlayer} src={mySound} />
      <ToastContainer icon={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/modify-video-detail/:id"
            element={isLogin ? <EditNewsDetail /> : <MainForm />}
          />
          <Route
            path="/modify-video-list"
            element={isLogin ? <ModifyVideoList /> : <MainForm />}
          />
          <Route
            path="/modify-video/:id"
            element={isLogin ? <EditNewsForm /> : <MainForm />}
          />
          <Route
            path="/evaluate-video-list"
            element={isLogin ? <EvaluateVideosList /> : <MainForm />}
          />
          <Route
            path="/evaluate-video/:id"
            element={isLogin ? <Evaluation /> : <MainForm />}
          />
          <Route
            path="/reset-password"
            element={!isLogin ? <ResetPassword /> : <MainForm />}
          />
          <Route path="/otp" element={!isLogin ? <PinCode /> : <MainForm />} />
          <Route
            path="/forgot-password"
            element={!isLogin ? <ForgotPassword /> : <MainForm />}
          />
          <Route path="/" element={!isLogin ? <Welcome /> : <MainForm />} />
          <Route path="/login" element={!isLogin && <Login />} />
          <Route path="/upload-video" element={isLogin && <MainForm />} />
          <Route path="/profile" element={!isLogin ? <Login /> : <Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/uploaded" element={<Thankyou />} />
          <Route path="/messages" element={<ChatRoom />} />
          <Route path="/chatting/:id" element={<ChatBox />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/add-genre" element={<AddGenre />} />
          <Route path="/admin/list-genre" element={<ListGenre />} />
          <Route path="/create-archive" element={<CreateArchive />} />
          <Route path="/archive-videos" element={<ArchiveVideoList />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
let mapStateToProps = (state) => {
  if (state)
    return {
      isLogin: state.isLogin,
    };
};

export default connect(mapStateToProps, {
  evaluateTotalNotification,
  getLatestModifyVideo,
  
  getLatestMessage
})(App);
