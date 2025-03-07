import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const DashboardFilter = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex items-center w-fit">
      <span>Sorting by:</span>
      <div>
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="text-[#48A74C] capitalize flex items-center gap-x-1"
        >
          Top match
          <FaAngleDown />
        </Button>
        <Menu
          id="fade-menu"
          elevation={0}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <div className="flex items-center gap-x-2 text-[#404040] p-3">
            <span>Sorting by:</span>
            <div
              className="flex items-center gap-x-1 text-sm text-[#48A74C] cursor-pointer"
              onClick={handleClose}
            >
              Top match
              <FaAngleUp />
            </div>
          </div>
          <Divider />
          <MenuItem onClick={handleClose}>Top match</MenuItem>
          <MenuItem onClick={handleClose}>Newest</MenuItem>
          <MenuItem onClick={handleClose}>Latest</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default DashboardFilter;
