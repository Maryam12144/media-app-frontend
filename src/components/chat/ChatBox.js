import React, { useEffect, useState } from "react";
import {
  viewChatBox,
  viewChatRoom,
  storeChatRoom,
} from "../../reducer/Actions";
import { connect } from "react-redux";
import Navbar from "../Navbar";
import { Input, Space, Button, Form } from "antd";
import { useParams } from "react-router-dom";
import Moment from "moment";

var a = Moment("2016-05-06T20:03:55");
var b = Moment("2016-05-06T20:03:55");

function ChatBox(props) {
  const [inputValue, setInputValue] = useState("");
  // Input Field handler
  const handleUserInput = (e) => {
    setInputValue(e.target.value);
  };

  // Reset Input Field handler
  const resetInputField = () => {
    setInputValue("");
  };
  let { id } = useParams();
  let { messages, viewChatBox, viewChatRoom, chatRoom, storeChatRoom } = props;
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  }

  useEffect(() => {
    if (user) {
      viewChatRoom(id);
      viewChatBox(id);
    }
  }, []);

  const onFinish = (values) => {
    values.sender_id = user.id;
    values.evaluation_id = chatRoom.id;
    if (chatRoom.poster_id != user.id) values.receiver_id = chatRoom.poster_id;
    else if (chatRoom.evaluator_id != user.id) {
      values.receiver_id = chatRoom.evaluator_id;
    }
    storeChatRoom(values);
  };
  const onSearch = (value) => console.log(value);
  const { Search } = Input;
  var a = Moment("2016-06-06T21:03:55");
  return (
    <div className="main-wrapper">
      <div className="wrap">
        <Navbar />

        <div className="messageBoxWrap chatReverse">
          <div className="chatBox">
            {messages.length > 0 &&
              messages.map((message, index) => (
                <div>
                  {user.id == message.sender_id ? (
                    <div className="chatRoom border-bottom-0 float-left flex  py-3 px-7 align-items-center justify-content-end">
                      <div className="flex ">
                        <div className="profile-page-img">
                          <img
                            className="pf-img"
                            src={
                              "https://cdn-icons-png.flaticon.com/512/634/634741.png?w=740"
                            }
                            alt=""
                            style={{ borderRadius: "50%" }}
                          />
                        </div>
                        <div className="profile-info textBox">
                          <p className="text-white mb-0">{message.message}</p>
                          {/* <p className="text-white mb-0">Superviser</p> */}
                          <span className="d-block text-white">
                            {Moment(message.created_at).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    user.id == message.receiver_id && (
                      <div className="chatRoom border-bottom-0 w-100 float-right d-flex  py-3 px-7 align-items-center justify-content-end">
                        <div className="flex ">
                          <div className="profile-info textBox">
                            <p className="text-white mb-0">
                              {" "}
                              {message.message}
                              <span className="d-block">
                                {Moment(message.created_at).format(
                                  "DD-MM-YYYY HH:mm:ss"
                                )}
                              </span>
                            </p>
                          </div>
                          <div className="profile-page-img">
                            <img
                              className="pf-img"
                              src={
                                "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                              }
                              alt=""
                              style={{ borderRadius: "50%" }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}

            <div className="sendText">
              <Form onFinish={onFinish} layout="vertical" className="sendWrap">
                <Form.Item
                  name="message"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please write message!",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Type..."
                    allowClear
                    rows={1}
                    onChange={handleUserInput}
                    value={inputValue}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    onClick={resetInputField}
                    type="primary"
                  >
                    Send
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

let mapStateToProps = (state) => {
  if (state)
    return {
      chatRoom: state.chatRoom,
      messages: state.messages,
    };
};

export default connect(mapStateToProps, {
  viewChatBox,
  viewChatRoom,
  storeChatRoom,
})(ChatBox);
