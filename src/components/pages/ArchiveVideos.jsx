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
import { Carousel, Button, Select, Badge, Tag } from "antd";
import baseApi from "../../baseApi";
import axios from "axios";
import { geArchiveVideos } from "../../reducer/Actions";
import Pusher from 'pusher-js';
import Moment from 'moment';

const ArchiveVideosList = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterGenre, setFilterGenre] = useState(false);

  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  let { archiveVideos, geArchiveVideos, isLoading } = props;
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
    geArchiveVideos();
    let token = localStorage.getItem("token");
    baseApi.setToken(token);

  }, []);
  const evaluatorId = [52, 51, 50, 49, 45];
  return (
    <>
      <div className="main-wrapper">
        <div className="wrap">
          <Navbar />
          <Link to="/upload-video">
            <ArrowLeftOutlined className="!text-white mx-3" />
          </Link>
          <br />
          {
            user && evaluatorId.includes(user.id) && 
            <Link to="/create-archive">
                Upload New Archive Video
            </Link>

          }
        
        {
         archiveVideos.map((data, index) => 
            <div key={index} className="evaluate-video-list mx-3 py-3">
              <Link to={`/evaluate-video/${data.id}`} className="single-vid mb-3 p-2 rounded bg-white d-block no-underline">
                <div className="text-black">
                  {data.video_name}...
                </div>
                <div className=" videos mt-5">
                <Iframe
                      src={`${baseApi.videoBaseApi}/${data.video_path}`}
                      className="responsive-iframe"
                    // controls="controls"
                    />
                </div>
           
                <div className="text-sm text-black text-right">
                  {Moment(data.created_at).format('DD-MM-YYYY HH:mm:ss')}
                </div>
                <div className="text-sm text-black text-right">
                  {data.full_name}
                </div>
              </Link>
            </div>
          )
        }

        </div>
      </div>
    </>
  );
};

let mapStateToProps = (state) => {
  if (state)
    return {
      isLoading: state.isLoading,
      archiveVideos: state.archiveVideos,
    };
};

export default connect(mapStateToProps, {
    geArchiveVideos,
})(ArchiveVideosList);
