import React, { useState } from 'react';

import { Layout, Menu, theme } from 'antd';
import { Outlet, Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
                    <Menu.Item key={"1"}>
                        <Link to={'/admin'}>Dashbord</Link>
                    </Menu.Item>
                    <Menu.Item key={"2"}>
                        <Link to={'/admin/list'}>List Musics</Link>
                    </Menu.Item>
                    <Menu.Item key={"3"}>
                        <Link to={'/admin/category'}>List Category</Link>
                    </Menu.Item>
                    <Menu.Item key={"4"}>
                        <Link to={'/admin/user'}>List User</Link>
                    </Menu.Item>
                    <Menu.Item key={"5"}>
                        <Link to={'/admin/genre'}>List Genre</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>

                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;