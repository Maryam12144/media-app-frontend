import React, { useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Upload,
  Radio,
  Input,
  Space,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'

const onFinish = (values) => {
};

const normFile = (e) => {

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

function VideoChannel() {
  return (
    <div>
      <div className="container mx-auto  my-10">
        <Row justify="center">
          <Col md={12}>
            <div className="site-card-border-less-wrapper">
              <Card title="Upload Video" className="mb-5">
                <Form onFinish={onFinish} layout="vertical">
                  <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload name="logo" action="/upload.do" listType="picture">
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item>
                    <Link to='/main-form'>Next</Link>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default VideoChannel;
