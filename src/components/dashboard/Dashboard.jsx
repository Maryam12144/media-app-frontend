import React, { useState } from 'react'
import Navbar from '../Navbar'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import DashboardSider from './DashboardSider';

const Dashboard = () => {


    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;

    return (
        <>
            <Navbar />
            <Layout style={{ minHeight: '100vh' }}>
                <DashboardSider />
                <Layout className="site-layout">
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            Bill is a cat.
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>kanact.com ©2022 - Created by USA Software House</Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default Dashboard