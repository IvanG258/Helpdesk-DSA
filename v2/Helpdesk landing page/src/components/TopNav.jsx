import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Avatar, Dropdown } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuOutlined, UserOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";

import SideRoute from "../routes/Routes";

const { Header } = Layout;

const TopNav = ({ role, userName, onLogout }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = !!role;
  const routes = SideRoute(role);

  const menuItems = routes.map((item) => ({
    key: item.link,
    icon: item.icon,
    label: <Link to={item.link}>{item.label}</Link>,
  }));

  const handleLogin = () => navigate("http://localhost:5173/");
  const handleLogout = () => onLogout && onLogout();

  const userMenu = (
    <Menu
      items={[
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: <span onClick={handleLogout} style={{ color: "red" }}>Sair</span>,
        },
      ]}
    />
  );

  return (
    <>
      <Header
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 20,
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ color: "#fff", fontSize: 20 }}>LOGO</div>

        <div className="desktop-menu" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
          />
        </div>

        <div className="desktop-actions" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!isAuthenticated ? (
            <Button type="primary" icon={<LoginOutlined />} onClick={handleLogin}>
              Entrar
            </Button>
          ) : (
            <Dropdown overlay={userMenu} placement="bottomRight">
              <div style={{ display: "flex", alignItems: "center", color: "#fff", cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} />
                <span style={{ marginLeft: 8 }}>{userName || "Usuário"}</span>
              </div>
            </Dropdown>
          )}
        </div>

        <Button
          icon={<MenuOutlined />}
          type="text"
          className="mobile-menu-button"
          style={{ color: "#fff", fontSize: 20, display: "none" }}
          onClick={() => setOpen(true)}
        />
      </Header>

      <Drawer title="Menu" placement="left" open={open} onClose={() => setOpen(false)}>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={() => setOpen(false)}
        />

        <div style={{ padding: 16 }}>
          {!isAuthenticated ? (
            <Button type="primary" block onClick={() => { setOpen(false); handleLogin(); }}>
              Entrar
            </Button>
          ) : (
            <Button danger block onClick={() => { setOpen(false); handleLogout(); }}>
              Sair
            </Button>
          )}
        </div>
      </Drawer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .desktop-actions { display: none !important; }
          .mobile-menu-button { display: inline-block !important; }
        }
      `}</style>
    </>
  );
};

export default TopNav;
