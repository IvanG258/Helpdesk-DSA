import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Drawer } from 'antd';
import { useMediaQuery } from 'react-responsive';
import Routes from "../routes/Routes"
import TopNav from "../components/TopNav"
const { Content } = Layout;
const LayoutAdmin = () => {
    // const menuItems = Routes(role);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ height: '100vh', overflow: 'hidden' }}>
            <Layout
                
            >
                <TopNav />

                <Content
                    style={{
                      
                        minHeight: 280,
                        overflowY: 'auto',
                        height: 'calc(100vh - 64px)',
                        background: '#fff',
                        borderRadius: '10px',
                        
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};


export default LayoutAdmin;