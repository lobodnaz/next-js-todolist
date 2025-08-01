"use client";

import { DatabaseOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { key: "/", label: <Link href="/">Home</Link>, icon: <HomeOutlined /> },
  {
    key: "/tasks",
    label: <Link href="/tasks">Tasks</Link>,
    icon: <DatabaseOutlined />,
  },
];

const NavMenu = () => {
  const pathname = usePathname();

  return (
    <Menu
      theme="dark"
      items={items}
      defaultSelectedKeys={["/"]}
      selectedKeys={[pathname]}
      style={{ borderRight: 0 }}
      className="nav-menu"
    />
  );
};

export default NavMenu;
