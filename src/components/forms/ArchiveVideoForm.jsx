import React, { useEffect, useState } from "react";
import baseApi from "../../baseApi";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

import {
  Form,

  Select,
  Steps,
  Collapse,
  Input,
  Upload,
  Spin,
  Row,
  Col,
  Button

} from "antd";

import { useNavigate } from "react-router-dom";
import Pusher from 'pusher-js';

// Api integration
import { connect } from "react-redux";
import {

  storeArchiveVideo, 

} from "../../reducer/Actions";

function MainForm(props) {


  const { Step } = Steps;
  const { Panel } = Collapse;

  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState();
  const [progress, setProgress] = useState(0);

  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }


  useEffect(() => {
    let token = localStorage.getItem("token");
    baseApi.setToken(token);

  }, []);
  let navigate = useNavigate();

  const onFinish = async (values) => {
    setProgress(0)
    let formData = new FormData();
    
    formData.append("video_name", values.video_name);
    formData.append("video", selectedFile);
    storeArchiveVideo(formData, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    }).then((res) => {
      setProgress(0)
    })
 }
   
 const changeHandler = async (e) => {
    let video = e.target.files[0]
    setSelectedFile(video)
  };


  let {
    storeArchiveVideo,
    isLoading
  } = props;




  return (
    <>
      <div className="main-wrapper">
        <div className="wrap">
          <Navbar />
          <div className="profile-wrap flex gap-7 my-9 mx-7">
            <div className="profile-img">
              <img
                className="pf-img"
                src={"../images/avatar.jpg"}
                alt=""
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div className="profile-info">
              <Link to="/profile" className="no-underline">
                <h1 className="text-white text-xl mb-0">{user.full_name}</h1>
              </Link>
              <p className="text-white">Reporter</p>
            </div>
          </div>
          <div className="site-card-border-less-wrapper px-5">
            {
              !isLoading ?
              <Form onFinish={onFinish} layout="vertical">
                
                {/* <div className="steps-content">{steps[current].content}</div> */}
                <Collapse
                  header
                  defaultActiveKey={[1, 2]}
                >
                  <Panel key="1" header="Upload Video" className="video-wrap">
                    <Form.Item
                      name="video"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please upload your video!",
                        },
                      ]}
                    >
          
                      <input
                        type="file"
                        name="video"
                        className="mt-3"
                        onChange={changeHandler}
                      />
                    </Form.Item>
                    
                    {
                      progress > 0 ?
                      <div className="progress mt-1">
                        <div
                          className={`progress-bar progress-bar-success progress-bar-striped`}
                          role="progressbar"
                          aria-valuenow={progress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: progress + "%" }}
                        >
                          {progress}%
                        </div>
                      </div>
                      :
                      Object.keys(selectedFile).length != 0 &&
                      <div className="text-success"><b>Video Uploaded Successfully</b></div>
                    }
                  </Panel>

                  <Panel key="1" header="Video Title" className="video-wrap">
                    <Form.Item
                      name="video_name"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please enter name",
                        },
                      ]}
                    >
          
                      <Input
                        type="text"
                        className="mt-3"
                      />
                    </Form.Item>
                    
                   
                  </Panel>
                </Collapse>

       
               
                <Form.Item className="text-center mt-5">
                  <Button
                    type="danger"
                    htmlType="submit"
                    className="mt-3"
                    style={{ background: "#B80000", borderColor: "#B80000" }}
                  >
                    Upload
                  </Button>
                </Form.Item>
              </Form>
              :
              <Row justify="center" className="!flex-col flex items-center">
                <Spin />
              </Row>
            }
          </div>
        </div>
      </div>
    </>
  );
}

let mapStateToProps = (state) => {
  if (state)
    return {

      isLoading: state.isLoading,
      
    };
};

export default connect(mapStateToProps, {

    storeArchiveVideo,

})(MainForm);
