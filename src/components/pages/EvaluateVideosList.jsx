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
import { getPendingVideos, getGenre } from "../../reducer/Actions";
import Pusher from 'pusher-js';
import Moment from 'moment';

const EvaluateVideosList = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterGenre, setFilterGenre] = useState(false);

  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  let { getPendingVideos, pendingVideos, isLoading, getGenre, genre } = props;
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
    getGenre();
    let token = localStorage.getItem("token");
    baseApi.setToken(token);
    getPendingVideos();

    Pusher.logToConsole = true;
    const pusher = new Pusher("688755c88e804ab5392a", {
      cluster: "ap2",
    });
    var channel = pusher.subscribe("chat");
    channel.bind("video", function (data) {
      if (user.id == data.evaluator_id) {
        setIsModalVisible(true);
      }
    });
  }, []);

  let genreList = [];
  genre?.forEach((element) => {
    genreList.push(
      <Select.Option key={element.id} value={element.id}>
        {element.name}
      </Select.Option>
    );
  });

  let changeGenreHandler = ( e ) => {
    if(e == undefined){
      e = '';
    }
    setFilterGenre(e)
  }

  var a = Moment('2016-06-06T21:03:55');//now
  var b = Moment('2016-05-06T20:03:55');
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
          <Select
            placeholder="Filter"
            allowClear
            style={{ width: "100%" }}
            onChange={(event) => changeGenreHandler(event)}
            className="m-3 w-25"
          > 
              <Select.Option  value="All">All</Select.Option>
            {genreList}
          </Select>
        {
          pendingVideos.filter(item => 
            filterGenre != '' && filterGenre != "All" ?
            item.genre_id == filterGenre
            :
            filterGenre == "All" ?
            item
            :
            item
            ).map((data, index) => 
            <div key={index} className="evaluate-video-list mx-3 py-3">
              <Link to={`/evaluate-video/${data.id}`} className="single-vid mb-3 p-2 rounded bg-white d-block no-underline">
                <div className="text-black">
                 <Tag color="red"> {data.genre_name}</Tag> 
                </div>
                <div className="text-black">
                  {data.ticker_text.split(" ").slice(0, 30).join(" ")}...
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
      pendingVideos: state.pendingVideos,
      isLoading: state.isLoading,
      genre: state.genre,
    };
};

export default connect(mapStateToProps, {
  getPendingVideos,
  getGenre,
})(EvaluateVideosList);
