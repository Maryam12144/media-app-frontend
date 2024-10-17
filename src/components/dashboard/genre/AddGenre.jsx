import React from 'react'
import { Layout, Form, Input, Button, Row, Col } from 'antd';
import Navbar from '../../Navbar';
import DashboardSider from '../DashboardSider';
import { addGenre } from "../../../reducer/Actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddGenre = (props) => {

    const { Content, Footer } = Layout;
    const [form] = Form.useForm()
    let { addGenre } = props;

    let navigate = useNavigate();
    const onFinish = (values) => {
        addGenre(values);
        setTimeout(() => {
            navigate("/admin/list-genre", { replace: true });
        }, 2000);
    };


    return (
        <>
            <Navbar />
            <Layout style={{ minHeight: '100vh' }} >
                <DashboardSider />
                <Layout className="site-layout" >
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Row justify="center">
                                <Col span={12}>
                                    <Form
                                        form={form}
                                        name="basic"
                                        onFinish={onFinish}
                                        autoComplete="off"
                                        layout='vertical'
                                    >
                                        <Form.Item
                                            label="Genre"
                                            name="name"
                                            rules={[{ required: true, message: 'Please add genre' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item >
                                            <Button type="danger" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>kanact.com ©2022 - Created by USA Software House</Footer>
                </Layout>
            </Layout>
        </>
    )
};

let mapStateToProps = (state) => {
    if (state) return {
        addGenre: state.addGenre
    };
};

export default connect(mapStateToProps, { addGenre })(AddGenre)