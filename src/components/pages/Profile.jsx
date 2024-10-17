import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import {
  EditOutlined,
  HeartTwoTone,
  ArrowLeftOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { connect, useDispatch } from "react-redux";
import Iframe from "react-iframe";
import { Link } from "react-router-dom";
import { Carousel, Button, Modal, Select, Avatar } from "antd";
import baseApi from "../../baseApi";
import axios from "axios";
import { getAllVideo, getGenre } from "../../reducer/Actions";
import Pusher from "pusher-js";

const Profile = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterGenre, setFilterGenre] = useState(false);

  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  let { getAllVideo, videos, getGenre, genre, message_notification } = props;
  console.log("videosss", videos)
  const dispatch = useDispatch();
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    baseApi.setToken(token);
    getAllVideo();
    getGenre();
    // Pusher.logToConsole == true;
    // const pusher = new Pusher('688755c88e804ab5392a', {
    //   cluster: 'ap2',
    //   });
    //   var channel = pusher.subscribe('chat');
    //   channel.bind('video', function(data) {
    //       if(user.id == data.evaluator_id)
    //       {
    //         // dispatch({ type: 'TOTAL_NOTIFICATION' })
    //         localStorage.setItem('evaluator',JSON.stringify(data))
    //         setIsModalVisible(true);
    //       }
    //   });
  }, []);

  let genreList = [];
  genre?.forEach((element) => {
    genreList.push(
      <Select.Option key={element.id} value={element.id}>
        {element.name}
      </Select.Option>
    );
  });

  let changeGenreHandler = (e) => {
    if (e == undefined) {
      e = '';
    }
    setFilterGenre(e)
  }

  return (
    <>
      <div className="main-wrapper">
        <div className="wrap">
          <Navbar />
          <Link to="/upload-video">
            <ArrowLeftOutlined className="!text-white mx-3" />
          </Link>
          <div className="profile-wrap flex gap-7 my-9 mx-7 items-center justify-between">
            <div className="flex gap-7">

              <Avatar
                src={`${user.avatar != null ? baseApi.videoBaseApi + '/' + user.avatar : "../images/avatar.jpg"}`}
                size={74}
              />

              <div className="profile-info">
                <h1 className="text-white text-xl mb-0">{user.full_name}</h1>
                <p className="text-white mb-0">Reporter</p>
                {/* <p className="text-white mb-0">Superviser</p> */}
              </div>
            </div>
            <div className="edit-btn">
              {/* /edit-profile */}
              <Link to="/edit-profile" aria-disabled>
                <EditOutlined className="rounded-sm !text-black bg-white p-2" />
              </Link>
            </div>
            <hr />
          </div>
          <div className="profile-stats px-7">
            <div className="flex items-center justify-between">
              <div className="text-white text-center">
                <span className="text-xl font-bold text-white block">
                  {videos.length}
                </span>
                Uploads
              </div>
              <div className="text-white text-center">
                <span className="text-xl font-bold text-white block">A</span>
                Rating
              </div>
              <div className="text-white text-center">
                <span className="text-xl font-bold text-white block">{message_notification}</span>
                Messages
              </div>
              {/* <div>
                <button className="bg-white rounded-sm px-5 py-1">
                  {" "}
                  Follow{" "}
                </button>
              </div> */}
            </div>
          </div>
          <div className="videos-gallery px-7 mt-5">
            <div className="top-work">
              <h3 className="text-white font-bold">Recent Videos</h3>

              <Carousel swipeToSlide draggable>
                {videos.length > 0 &&
                  videos.map((video, index) => (
                    <div key={index} className="containeer">
                      <Iframe
                        className="responsive-iframe"
                        url={`${baseApi.videoBaseApi}/${video.video_path}`}

                      // controls="controls"
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div className="videos mt-5">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="text-white font-bold">See Videos Here</h3>
                {/* <Select
                  placeholder="Filter"
                  allowClear
                  style={{ width: "100%" }}
                  onChange={(event) => changeGenreHandler(event)}
                  className="m-3 w-25"
                >
                  <Select.Option value="All">All</Select.Option>
                  {genreList}
                </Select> */}
              </div>

              {videos.length > 0 &&
                videos.filter(item =>
                  filterGenre != '' && filterGenre != "All" ?
                    item.genre_id == filterGenre
                    :
                    filterGenre == "All" ?
                      item
                      :
                      item
                ).map((video, index) => (
                  <div
                    key={index}
                    className="single-video-wrap mb-4 containeer"
                  >
                    <Iframe
                      src={`${baseApi.videoBaseApi}/${video.video_path}`}
                      className="responsive-iframe"
                    // controls="controls"
                    />
                    <div className="flex justify-between">
                      <p className="text-white mb-0 ml-3 z-50  flex items-center">
                        views: {video.views}
                      </p>
                      {/* <Button type="text" className="flex items-center">
                        <HeartTwoTone twoToneColor="#b80000" />{" "}
                        <span className="text-white">7009999</span>{" "}
                      </Button> */}
                    </div>
                  </div>
                ))}

              {videos.filter(item =>
                filterGenre != '' && filterGenre != "All" ?
                  item.genre_id == filterGenre
                  :
                  filterGenre == "All" ?
                    item
                    :
                    item
              ).length == 0 && <p className="text-center text-white fw-bold">No Video Found</p>}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

let mapStateToProps = (state) => {
  if (state)
    return {
      videos: state.videos,
      genre: state.genre,
      message_notification: state.message_notification,
    };
};

export default connect(mapStateToProps, {
  getAllVideo,
  getGenre,
})(Profile);
