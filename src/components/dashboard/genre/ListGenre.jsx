import React, { useEffect } from 'react'
import { Layout, Form, Input, Button, Row, Col, Table, Tag, Space } from 'antd';
import Navbar from '../../Navbar';
import DashboardSider from '../DashboardSider';
import { getGenre, delGenre } from "../../../reducer/Actions";
import { connect } from "react-redux";
import {
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";


const ListGenre = (props) => {

    const { Content, Footer } = Layout;
    let { getGenre, genre, delGenre } = props;

    useEffect(() => {
        getGenre();
    }, [])

    function deleteGenre(id) {
        delGenre(id);
    }

    const columns = [
        {
            title: 'Genre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (row) => (
                <Space size="middle">
                    <EditOutlined className="mr-1" />
                    <DeleteOutlined onClick={() => deleteGenre(row.id)} />
                </Space>
            ),
        },
    ];


    return (
        <>
            <Navbar />
            <Layout style={{ minHeight: '100vh' }} >
                <DashboardSider />
                <Layout className="site-layout" >
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Table columns={columns} dataSource={genre} />
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
        genre: state.genre,
    };
};

export default connect(mapStateToProps, { getGenre, delGenre })(ListGenre)