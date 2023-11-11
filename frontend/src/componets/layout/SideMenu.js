import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserAlt, FaUserEdit, FaUserCircle, FaLock } from "react-icons/fa";

const SideMenu = () => {
  let location = useLocation();
  const [acitveMenuItem, setAcitveMenuItem] = useState(location.pathname);

  const menuItems = [
    {
      name: "Profile",
      url: "/me/profile",
      icon: <FaUserAlt />,
    },
    {
      name: "Update Profile",
      url: "/me/update_profile",
      icon: <FaUserEdit />,
    },
    {
      name: "Upload Avatar",
      url: "/me/upload_avatar",
      icon: <FaUserCircle />,
    },
    {
      name: "Update Password",
      url: "/me/update_password",
      icon: <FaLock />,
    },
  ];

  const handleMenuItemClick = (menuItemUrl) => {
      setAcitveMenuItem(menuItemUrl)
  }
  return (
    <div className="list-group mt-5 pl-4">
      {menuItems?.map((menuItem, index) => (
        <>
          <Link
            key={index}
            to={menuItem.url}
            className={`fw-bold list-group-item list-group-item-action ${
              acitveMenuItem.includes(menuItem.url) ? "active " : ""
            }`}
            aria-current={acitveMenuItem.includes(menuItem.url) ? "true " : "false"}
            onClick={() => handleMenuItemClick(menuItem.url)}
          >
            <i className={`fa-fw pe-2`}>{menuItem.icon}</i> {menuItem.name}
          </Link>
        </>
      ))}
    </div>
  );
};

export default SideMenu;
