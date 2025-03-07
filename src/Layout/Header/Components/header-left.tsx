import { FaSearch } from "react-icons/fa";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import logo from "../../../assets/imgs/logo.svg";
import { useState } from "react";
import SearchModal from "./searchModal";
const HeaderLeft = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="header-left-section flex items-center gap-x-[2.5rem]">
      <div className="logo-image">
        <img
          src={logo}
          title="IZMA-logo"
          alt="IZMA-Logo"
          aria-description="IZMA-Logo"
          className="w-full h-full max-w-[85px] max-h-[25px]"
        />
      </div>

      <div className="header-searchbox hidden lg:block">
        <FormControl
          className="search-form [&>div>input]:py-[.7rem] w-[35ch] lg:w-[35ch] xl:w-[45ch]"
          sx={{
            backgroundColor: "white",
            borderRadius: "25px",
            ".MuiOutlinedInput-input": {
              padding: "6px",
            },
            "& fieldset": { borderColor: "primary.main", border: "none" },
          }}
          variant="outlined"
        >
          <OutlinedInput
            type="search"
            id="outlined-adornment-search"
            placeholder={"Search by name, job, title,..."}
            className="px-5"
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="search"
                  edge="start"
                  className="bg-[#48a74c] text-[#fff] p-2"
                >
                  <FaSearch className="w-[20px] h-[20px]" />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div className="collapsed-searchbox hidden md:block lg:hidden">
        <IconButton
          aria-label="search"
          edge="start"
          className="bg-[#48a74c] text-[#fff] p-2"
          onClick={handleOpen}
        >
          <FaSearch className="w-[20px] h-[20px]" />
        </IconButton>

        <SearchModal open={open} close={handleClose} />
      </div>
    </div>
  );
};

export default HeaderLeft;
