import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import {
  EditOutlined,
  HeartTwoTone,
  ArrowLeftOutlined,
  NotificationOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { connect, useDispatch } from "react-redux";
import Iframe from "react-iframe";
import { Link, useParams } from "react-router-dom";
import { Carousel, Button, Select, Badge, Tag } from "antd";
import baseApi from "../../baseApi";
import axios from "axios";
import { viewModifyVideo } from "../../reducer/Actions";
import Pusher from "pusher-js";
import Moment from "moment";

const EditNewsDetail = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterGenre, setFilterGenre] = useState(false);
  let { id } = useParams();

  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  let { viewModifyVideo, modifyVideo, isLoading } = props;
  const dispatch = useDispatch();
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    baseApi.setToken(token);
    viewModifyVideo(id);
  }, []);

  var a = Moment("2016-06-06T21:03:55"); //now
  var b = Moment("2016-05-06T20:03:55");
  return (
    <>
      <div className="main-wrapper">
        <div className="wrap">
          {/* <Modal title="Evalute News" visible={isModalVisible} footer={null}>
        <div>
          <Button type="ghost" onClick={handleOk}><Link to="/evaluate-video">Evaluate</Link></Button>
        </div>
      </Modal> */}
          <Navbar />
          <Link to="/upload-video">
            <ArrowLeftOutlined className="!text-white mx-3" />
          </Link>
          <br />
          {modifyVideo && (
            <div className="evaluate-video-list mx-3 py-3">
              <Link
                to={`/modify-video/${modifyVideo.news_id}`}
                className="single-vid mb-3 p-2 rounded bg-white d-block no-underline"
              >
                <Link
                  to={`/chatting/${modifyVideo.id}`}
                  className="d-flex align-flex-end justify-content-end"
                >
                  <MailOutlined />
                </Link>
                <div className="text-black">
                  {JSON.parse(modifyVideo.criteria).explain_suggestion}
                </div>

                <div className="text-sm text-black text-right">
                  {JSON.parse(modifyVideo.criteria).status}
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

let mapStateToProps = (state) => {
  if (state)
    return {
      modifyVideo: state.modifyVideo,
      isLoading: state.isLoading,
    };
};

export default connect(mapStateToProps, {
  viewModifyVideo,
})(EditNewsDetail);
