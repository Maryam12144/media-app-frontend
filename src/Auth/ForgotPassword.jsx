import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Form, Input, Checkbox, Modal, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate, Redirect } from "react-router-dom";
import { forgotPassword } from "../reducer/Actions";
import { connect } from "react-redux";

import { useSelector, useDispatch } from "react-redux";

const ForgotPassword = (props) => {
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

  let { isLogin, forgotPassword } = props;

  useEffect(() => {}, [isLogin]);

  const onFinish = (values) => {
    forgotPassword(values).then(() => navigate("/otp"));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("");
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="wrap">
          <Navbar />
          <div className="login-wrap justify-self-center">
            <h3 className="loginText col-7">
              Find Your Account
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
                <Form.Item className="!mb-4">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Link to="/login" className="!text-white">Back</Link>
                  </Form.Item>
                </Form.Item>
                
                <Form.Item className="text-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button "
                  >
                    Continue
                  </Button>
                  {/* <Link to="/upload-video" className="login-form-button bg-red-800 text-white px-5 py-2 rounded hover:text-white">LOG IN</Link> */}
                </Form.Item>
              </Form>
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
      getLogin: state.getLogin,
      isLogin: state.isLogin,
    };
};

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
