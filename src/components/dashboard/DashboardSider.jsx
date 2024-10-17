import React from "react";
import { Layout, Menu } from "antd";
import {
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const DashboardSider = () => {
  const { Sider } = Layout;
  const { SubMenu } = Menu;

  return (
    <>
      <Sider collapsible style={{ background: "#b80000" }}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/admin"> Dashboard </Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Genre">
            <Menu.Item key="3">
              {" "}
              <Link to="/admin/add-genre"> Add Genre </Link>{" "}
            </Menu.Item>
            <Menu.Item key="4">
              {" "}
              <Link to="/admin/list-genre"> List Genre </Link>{" "}
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Teams">
            <Menu.Item key="6">Students</Menu.Item>
            <Menu.Item key="8">Evaluators</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default DashboardSider;
