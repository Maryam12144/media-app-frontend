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
import { getModifyVideos } from "../../reducer/Actions";
import Pusher from "pusher-js";
import Moment from "moment";

const ModifyVideosList = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState(false);

  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  let { getModifyVideos, modifyVideos, isLoading } = props;

  console.log("DDDD", modifyVideos)
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
    getModifyVideos();

    // Pusher.logToConsole = true;
    // const pusher = new Pusher('688755c88e804ab5392a', {
    //   cluster: 'ap2',
    // });
    // var channel = pusher.subscribe('chat');
    // channel.bind('video', function (data) {
    //   if (user.id == data.evaluator_id) {
    //     setIsModalVisible(true);
    //   }
    // });
  }, []);

  let changeGenreHandler = (e) => {
    if (e == undefined) {
      e = "";
    }
    setStatus(e);
  };

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
          <Select
            placeholder="Filter"
            allowClear
            style={{ width: "100%" }}
            onChange={(event) => changeGenreHandler(event)}
            className="m-3 w-25"
          >
            <Select.Option value="All">All</Select.Option>
            <Select.Option value="approve">Approve</Select.Option>
            <Select.Option value="modify">Modify</Select.Option>
            <Select.Option value="reject">Reject</Select.Option>
          </Select>
          <br />
          {
            modifyVideos.filter(item =>
              status != '' && status != "All" ?
                item.status == status
                :
                status == "All" ?
                  item
                  :
                  item
            ).map((data, index) =>
              <div key={index} className="evaluate-video-list mx-3 py-3">
                <Link to={JSON.parse(data.criteria).status == 'modify' ? `/modify-video-detail/${data.evaluation_id}` : '#'} className="single-vid mb-3 p-2 rounded bg-white d-block no-underline">
                  <div className="text-black">
                    <Tag color="red"> {data.genre_name}</Tag>
                  </div>
                  <div className="text-black">
                    {JSON.parse(data.criteria).status}
                  </div>
                  <div className="text-black">
                    {data.ticker_text.split(" ").slice(0, 30).join(" ")}...
                  </div>
                </Link>
              </div>
            )
          }

          {
          !isLoading ?
          modifyVideos.length == 0 && <p className="text-center text-white fw-bold">No Notification Found</p>
          :
          <p className="text-center text-white fw-bold">Loading....</p>
        }
        </div>
      </div>
    </>
  );
};

let mapStateToProps = (state) => {
  if (state)
    return {
      modifyVideos: state.modifyVideos,
      isLoading: state.isLoading,
    };
};

export default connect(mapStateToProps, {
  getModifyVideos,
})(ModifyVideosList);
