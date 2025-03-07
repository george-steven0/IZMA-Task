import { AiOutlineMenu } from "react-icons/ai";
import { IconButton, Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux/TsHooks";
import { openSideNav } from "../../../Redux/Slices/navSlice";

const SwitchLayer = () => {
  const dispatch = useAppDispatch();
  const { openNav } = useAppSelector((state) => state.nav);

  const handleToggleNav = () => {
    dispatch(openSideNav(!openNav));
  };
  return (
    <div className="flex items-center gap-x-4">
      <div className="flex items-center justify-between bg-[#3D8E41] py-6 px-4 w-full rounded-md">
        <div>
          <p className="text-white font-medium text-base mb-2">
            UI Designer in Egypt
          </p>
          <p className="text-xs tracking-wide text-white font-extralight">
            70 job positions
          </p>
        </div>

        <div className="toggle-button-wrapper flex items-center gap-x-2">
          <span className="text-base font-light text-white">Set alert</span>
          <Switch size="medium" />
        </div>
      </div>

      <IconButton
        className="border rounded-sm md:hidden"
        onClick={handleToggleNav}
      >
        <AiOutlineMenu className="w-full h-full" />
      </IconButton>
    </div>
  );
};

export default SwitchLayer;
