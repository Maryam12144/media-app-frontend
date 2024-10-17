import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Form, Input, Checkbox, Modal, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate, Redirect } from "react-router-dom";
import { getLogin } from "../reducer/Actions";
import { connect } from "react-redux";

import { useSelector, useDispatch } from "react-redux";

const Login = (props) => {
  let navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showError, setShowError] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const onFinish = (values) => {
  //     console.log('Received values of form: ', values);
  // };

  let { isLogin, getLogin } = props;

  useEffect(() => {}, [isLogin]);

  const onFinish = (values) => {
    getLogin(values).then(() => navigate("/upload-video"));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("");
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="wrap">
          <Navbar />
          <div className="login-wrap">
            {/* <img
              className="login-header"
              src="../images/login-header.png"
              alt=""
            /> */}
            {/* <div className="about-sec mt-8">
                            <h2 className='text-center text-white text-xl mb-0'>ABOUT US</h2>
                            <p className='w-11/12 mx-auto text-center leading-4 text-white mb-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem sint repellat recusandae quo commodi, distinctio illo necessitatibus maiores nesciunt tenetur, iusto soluta, ea quia! Vero voluptas nam eligendi incidunt ea?</p>
                        </div> */}
            {/* <div className="channels-sec">
                            <img className='w-full cursor-pointer' src="../images/channels.png" onClick={showModal} alt="" />
                        </div> */}
            <h3 className="loginText">
              Enter your Email and Password to Start
            </h3>
            <div className="login-form px-5 my-5">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="email"
                  className="!mb-4"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  className="!mb-4"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item className="!mb-4">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="!text-white">Remember me</Checkbox>
                  </Form.Item>
                   <Link to="/forgot-password"  className="text-white float-right hover:text-white hover:underline">Forgotten password?</Link> 
                </Form.Item>

                <Form.Item className="text-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button "
                  >
                    LOG IN
                  </Button>
                  {/* <Link to="/upload-video" className="login-form-button bg-red-800 text-white px-5 py-2 rounded hover:text-white">LOG IN</Link> */}
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Channels List"
        onCancel={handleCancel}
        visible={isModalVisible}
        footer={null}
        className="channelsModal  "
      >
        <div className="flex flex-wrap gap-3 justify-center">
          <img
            src="../images/logos/Web 1920 – 1.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 2.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 3.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 4.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 5.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 6.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 7.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 8.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 9.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 10.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 11.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 12.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 13.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 14.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 15.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 16.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 17.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 18.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 19.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 20.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 21.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 22.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 23.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 24.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 25.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 26.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 27.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 28.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 29.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 30.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 31.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 32.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 33.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 34.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 35.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 36.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 37.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 38.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 39.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 40.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 41.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 42.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 43.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 44.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 45.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 46.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 47.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 48.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 49.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 50.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 51.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 52.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 53.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 54.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 55.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 56.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 57.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 58.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 59.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 60.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 61.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 62.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 63.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 64.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 65.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 66.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 67.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 68.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 69.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 70.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 71.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 72.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 73.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 74.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 75.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 76.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 77.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 78.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 79.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 84.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 85.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 86.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 87.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 88.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 89.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 90.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 91.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 92.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
          <img
            src="../images/logos/Web 1920 – 93.png"
            className="w-full max-w-[100px] grow"
            alt=""
          />
        </div>
      </Modal>
    </>
  );
};

let mapStateToProps = (state) => {
  if (state)
    return {
      getLogin: state.getLogin,
      isLogin: state.isLogin,
    };
};

export default connect(mapStateToProps, { getLogin })(Login);
