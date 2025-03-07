import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { searchModal } from "../../../Types/types";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "#fff",
  // border: "2px solid #ddd",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const SearchModal = ({ open, close }: searchModal) => {
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormControl
          className="search-form [&>div>input]:py-[.9rem] w-full m-auto border border-[#ddd]"
          sx={{
            backgroundColor: "white",
            borderRadius: "25px",
            ".MuiOutlinedInput-input": {
              padding: "6px",
            },
            "& fieldset": { borderColor: "primary.main", border: "none" },
            ".MuiInputBase-root": { width: "100%" },
          }}
          variant="outlined"
        >
          <OutlinedInput
            type="search"
            id="outlined-adornment-search"
            placeholder={"Search by name, job, title,..."}
            className="px-6 w-full py-1"
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
      </Box>
    </Modal>
  );
};

export default SearchModal;
