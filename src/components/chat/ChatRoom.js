import React, { useEffect } from "react";
import { getChatRoom, updateTotalMessageNotification } from "../../reducer/Actions";
import { connect, useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar";
import { Input, Space } from "antd";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";
import Moment from "moment";

function ChatRoom(props) {
  let { chatRoomList, getChatRoom, updateTotalMessageNotification } = props;

  let messageReadHandler = (id) => {
    updateTotalMessageNotification(id)
  }
  useEffect(() => {
    getChatRoom();
  }, []);

  const onSearch = (value) => console.log(value);
  const { Search } = Input;
  return (
    <div className="main-wrapper">
      <div className="wrap">
        <Navbar />
        <div className="flex gap-7 my-9 mx-7">
          <Search placeholder="Search Message..." onSearch={onSearch} />
        </div>
        <div className="messageBoxWrap">
          {chatRoomList.length > 0 &&
            chatRoomList.map((chatRoom, index) => (
              <div key={index} onClick={() => messageReadHandler(chatRoom.id)}>
                <Link to={`/chatting/${chatRoom.evaluation_id}`}>
                  <div className="chatRoom textBox flex gap-7 py-4 px-7 items-center justify-between" style={chatRoom.is_read == 0 ? { background: '#0000002e' } : { background: '#0000000d' }}>
                    <div className="flex w-100 gap-7">
                      <div className="profile-page-img">
                        <img
                          className="pf-img"
                          // src={`${user.avatar_url}`}
                          src={
                            "https://cdn-icons-png.flaticon.com/512/634/634741.png?w=740"
                          }
                          alt=""
                          style={{ borderRadius: "50%" }}
                        />
                      </div>
                      <div className="profile-info">
                        <h1 className="text-white text-xl mb-0">Evaluator</h1>
                        <p className="text-white mb-0">
                          {JSON.parse(chatRoom.status).status}
                        </p>
                        {/* <p className="text-white mb-0">Superviser</p> */}
                      </div>
                    </div>
                    <div className="text-light">
                      {Moment(chatRoom.created_at).format(
                        "DD-MM-YYYY HH:mm:ss"
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

let mapStateToProps = (state) => {
  if (state)
    return {
      chatRoomList: state.chatRoomList,
    };
};

export default connect(mapStateToProps, { getChatRoom, updateTotalMessageNotification })(ChatRoom);
