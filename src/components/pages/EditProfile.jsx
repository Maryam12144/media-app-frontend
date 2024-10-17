import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { Form, Input, Button, Checkbox, Upload, message, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../reducer/Actions";
import { connect } from "react-redux";
import ImgCrop from 'antd-img-crop';
import 'antd/dist/antd.css';
const getSrcFromFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};
const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const EditProfile = (props) => {

  let { updateUser, user } = props;
  let navigate = useNavigate();
  const updateProfile = () => {
  };
  // const [fileList, setFileList] = useState([])
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  let userData = localStorage.getItem("user");
  let userInfo = JSON.parse(userData);
  const onFinish = (values) => {
    console.log(fileList['file'].originFileObj, 'Received values of form: ', values.upload);
    let formData = new FormData();
    for (let [key, value] of Object.entries(values)) {
      if (value != undefined && value != '') {
        formData.append(key, value);
      }
    }
    formData.append('file', fileList);
    formData.append('file', fileList['file'].originFileObj);
    updateUser(formData).then(() =>
      navigate("/profile", { replace: true })
    )
    console.log("Success:", values, fileList);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const handleChange = (info) => {
    console.log(info.file)
    // if (info.file.status === "done") {
    setFileList(info);
    setPreview(info)
    getBase64(info.file.originFileObj, (imageUrl) => {
      setImageUrl(imageUrl);
      setLoading(false);
    });
    // }
  };
  const onChange = ({ fileList: newFileList }) => {
    console.log(newFileList[0].originFileObj, 'k')
    setFileList(newFileList);
    getBase64(newFileList[0].file.originFileObj, (imageUrl) => {
      setImageUrl(imageUrl);
      setLoading(false);
    });
  };
  const onPreview = async (file) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);
    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };
  const onUploadFile = (e) => {
    let files = e.target.files[0];
    const objectUrl = URL.createObjectURL(files)
    setPreview(objectUrl)
    setFileList(files);
  };
  return (
    <>
      <div className="main-wrapper">
        <div className="wrap">
          <Navbar />
          <Link to="/profile">
            <ArrowLeftOutlined className="!text-white mx-3" />
          </Link>
          <div className="px-7 py-5">
            <h2 className="text-white font-bold">Prosonal Detail</h2>
            <Form
              className="editForm"
              name="edit_form"
              initialValues={{
                full_name: userInfo ? userInfo.full_name : "",
                email: userInfo ? userInfo.email : "",
                phone_number: userInfo ? userInfo.phone_number : "",
                country: userInfo ? userInfo.country : "",
                state: userInfo ? userInfo.state : "",
                city: userInfo ? userInfo.city : "",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              {
                preview &&
                <Avatar src={`${imageUrl}`} className="m-3" size={74} />
              }

              <Form.Item
                name="upload"
                label="Upload"

              >
                <ImgCrop rotate>
                  <Upload name="logo" action="/upload.do" listType="picture"
                    beforeUpload={beforeUpload}
                    showUploadList={false}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onPreview={onPreview}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </ImgCrop>
              </Form.Item>
              {/* <ImgCrop rotate>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  id="output"
                  fileList={fileList}
                  // onChange={onChange}
                  // showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onPreview={onPreview}
                  // beforeUpload={beforeUpload}
                >
                  { fileList.length < 3 && '+ Upload'}
                </Upload>
              </ImgCrop> */}
              {/* <ImgCrop grid rotate>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 3 && '+ Upload'}
                </Upload>
              </ImgCrop> */}
              <Form.Item
                label="First Name"
                name="first_name"
                className="text-white mb-2"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="last_name"
                className="text-white mb-2"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone_number"
              >
                <Input />
              </Form.Item>
              {/* <h2 className="text-white mt-10 font-bold">Address Detail</h2>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Country" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: "State" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "City" }]}
              >
                <Input />
              </Form.Item> */}
              <Form.Item>
                <div className="text-center">
                  <Button
                    type="danger"
                    htmlType="submit"
                    className="mt-3 "
                    style={{ background: "#B80000", borderColor: "#B80000" }}
                  >
                    Save
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
let mapStateToProps = (state) => {
  if (state)
    return {
      user: state.user,
    };
};
export default connect(mapStateToProps, {
  updateUser,
})(EditProfile);