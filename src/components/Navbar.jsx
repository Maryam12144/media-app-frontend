import React, { useEffect } from "react";
import { BarsOutlined, BellOutlined, FormOutlined, MessageOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { logoutHandler, getPendingVideos, getTotalMessageNotification, getModifyVideos } from "../reducer/Actions";
import { connect, useDispatch, useSelector } from "react-redux";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  let navigate = useNavigate();
  let { isLogin, logoutHandler, getPendingVideos, modifyNotification, getTotalMessageNotification, message_notification, getModifyVideos } = props;
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  }
  const logoutUser = () => {
    logoutHandler();
    navigate("/");
  };

  const evaluatorId = [52, 51, 50, 49, 45];
  const menu = (
    <Menu>
      {/* <Menu.Item key="1">
        <Link to="/messages" className="text-decoration-none">Messages</Link>
      </Menu.Item> */}
      <Menu.Item key="2" >
        <Link to="/profile" className="text-decoration-none">Profile</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <a className="text-decoration-none" href="https://drive.google.com/drive/folders/1lW0Mg0o7VYzD9niJbJuezpByvfLJmKMo?usp=sharing" target="_blank">Graphics</a>
        {/* <Link to="/archive-videos">Archive Video</Link> */}
      </Menu.Item>

      <Menu.Item key="0" onClick={logoutUser}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const notificationHandler = () => {
    navigate("/evaluate-video-list");
  };

  useEffect(() => {
    // pendingVideos.length != 0 &&
    if (user) {
      getTotalMessageNotification();
      getPendingVideos();
      getModifyVideos()
    }
  }, []);

  return (
    <>
      <div className="navbar px-7">
        <Link to="/">
          <img src="../images/kanact-logo.png" alt="" />
        </Link>
        {
          user &&
          <div className="navigations">

            <>
              <Link to="/messages" className="mr-5">
                <Badge count={message_notification} >
                  <MessageOutlined style={{ fontSize: "26px", color: "#fff" }} />
                </Badge>
              </Link>
              <Link to="/modify-video-list">
                <Badge count={modifyNotification} className="mr-5">
                  <FormOutlined style={{ fontSize: "26px", color: "#fff" }} />
                </Badge>
              </Link>
            </>

            {evaluatorId.includes(user.id) && (
              <span onClick={notificationHandler}>
                <Badge count={notification}>
                  <BellOutlined style={{ fontSize: "26px", color: "#fff" }} />
                </Badge>
              </span>
            )}
            {isLogin && (
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <BarsOutlined className="!text-white text-3xl ml-2" />
                </a>
              </Dropdown>
            )}
          </div>
        }
      </div>
    </>
  );
};
let mapStateToProps = (state) => {
  if (state)
    return {
      isLogin: state.isLogin,
      pendingVideos: state.pendingVideos,
      modifyNotification: state.modifyNotification,
      message_notification: state.message_notification,

    };
};

export default connect(mapStateToProps, { logoutHandler, getPendingVideos, getTotalMessageNotification, getModifyVideos })(
  Navbar
);
