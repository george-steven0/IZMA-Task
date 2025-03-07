import { BiMenu } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import { FaBriefcase } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { RxTriangleDown } from "react-icons/rx";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import BackDrop from "../../../Common/backdrop";
import { Link } from "react-router-dom";
const HeaderRight = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [collapse, setCollapse] = useState<boolean>(true);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const navList = [
    {
      id: "home",
      name: "Home",
      icon: <CiHome />,
      href: "/",
    },
    {
      id: "jobs",
      name: "Jobs",
      icon: <FaBriefcase />,
      href: "/jobs",
    },
    {
      id: "Employers",
      name: "Employers",
      icon: <FaUsers />,
      href: "/employers",
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: <IoMdNotificationsOutline />,
      href: "/notifications",
    },
    {
      id: "messages",
      name: "Messages",
      icon: <FiMessageSquare />,
      href: "/messages",
    },
  ];
  const settingList = [
    {
      id: "setting",
      name: "Setting and privacy",
    },
    {
      id: "Language",
      name: "Languages",
    },
    {
      id: "Help",
      name: "Help",
    },
  ];

  return (
    <>
      <section className="header-right-section-container h-auto md:h-full flex flex-row-reverse items-center gap-x-[1.8rem] md:gap-x-[1.5rem] xl:gap-x-[2.6rem]">
        <div className="account-icon-menu">
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings" onClick={handleClick}>
              <div className="flex flex-col items-center justify-between md:min-h-[70px] relative">
                <IconButton
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  className="w-[60px] h-[60px]  md:w-[40px] md:h-[40px]"
                  onClick={handleCollapse}
                >
                  <Avatar className="w-full h-full">M</Avatar>
                </IconButton>
                <p className="items-center cursor-pointer font-[400] capitalize text-[16px] text-[#E6E6E6] hidden md:flex">
                  Profile <RxTriangleDown />
                </p>

                <div
                  onClick={handleCollapse}
                  className="account-menu-icon-collapsed md:hidden absolute bottom-0 right-0 z-0 bg-[#F0F0F0] rounded-[50%] w-[25px] h-[25px] text-center flex flex-col items-center justify-center"
                >
                  <BiMenu className="text-[#707070] w-fit m-auto" />
                </div>
              </div>
            </Tooltip>
          </Box>

          <Menu
            className="hidden md:block"
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <div className="py-3 px-4">
              <div className="flex items-center gap-x-2 w-full justify-between">
                <div className="flex items-center gap-x-2">
                  <Avatar />
                  <div>
                    <p className="text-base font-semibold">User</p>
                    <span className="text-sm text-[#707070]">
                      UI UX Designer
                    </span>
                  </div>
                </div>

                <IconButton className="p-1">
                  <FaAngleRight className="text-[#C4C3C3]" />
                </IconButton>
              </div>
            </div>

            <Divider />
            <MenuItem onClick={handleClose}>Setting and privacy</MenuItem>
            <MenuItem onClick={handleClose}>Language</MenuItem>
            <MenuItem onClick={handleClose}>Help</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose} className="text-red-500">
              Logout
            </MenuItem>
          </Menu>

          <div
            className={`collapsed-menu bg-white w-full text-black h-screen block md:hidden absolute z-20 top-0 transition-all duration-500 ${
              collapse ? "-left-full" : "left-0"
            } max-w-[350px]`}
          >
            <div className="collapsed-menu-items [&>li]:my-2 [&>li]:text-lg">
              <div className="py-3 px-4">
                <div className="flex items-center gap-x-2 w-full justify-between">
                  <div className="flex items-center gap-x-2">
                    <Avatar />
                    <div>
                      <p className="text-base font-semibold">User</p>
                      <span className="text-sm text-[#707070]">
                        UI UX Designer
                      </span>
                    </div>
                  </div>

                  <IconButton className="p-1" onClick={handleCollapse}>
                    <FaAngleRight className="text-[#C4C3C3]" />
                  </IconButton>
                </div>
              </div>
              <Divider />

              <ul className="flex flex-wrap gap-y-2 [&>li]:basis-full [&>li]:flex [&>li]:items-center [&>li]:my-1 [&>li]:gap-x-3 [&>li>svg]:text-[#7D7D7D] [&>li>svg]:text-xl">
                {navList?.map((item) => (
                  <MenuItem key={item?.id}>
                    {item?.icon}
                    <span>{item?.name}</span>
                  </MenuItem>
                ))}
              </ul>

              <Divider />

              {settingList?.map((item) => (
                <MenuItem key={item?.id} onClick={handleClose}>
                  {item?.name}
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={handleClose} className="text-red-500">
                Logout
              </MenuItem>
            </div>
          </div>
          <BackDrop open={collapse} close={handleCollapse} />
        </div>

        <ul className="flex-row-reverse items-center gap-x-[1.8rem] md:gap-x-[1.5rem] xl:gap-x-[2.6rem] h-full hidden md:flex">
          {navList?.map((item) => (
            <Link to={item?.href} key={item?.id} className="top-nav-list">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title={item?.id}>
                  <div className="flex flex-col items-center justify-between min-h-[70px]">
                    <IconButton
                      size="small"
                      // sx={{ ml: 2 }}
                      aria-controls={open ? item?.id : undefined}
                      aria-haspopup="true"
                      className="w-[40px] h-[40px]"
                    >
                      <div className="w-full h-full text-[#7D7D7D] [&>svg]:w-full [&>svg]:h-full">
                        {item?.icon}
                      </div>
                    </IconButton>
                    <p className="flex items-center gap-x-[2px] cursor-pointer font-[400] text-[16px] capitalize text-[#E6E6E6]">
                      {item?.id}
                    </p>
                  </div>
                </Tooltip>
              </Box>
            </Link>
          ))}
        </ul>
      </section>
    </>
  );
};

export default HeaderRight;
