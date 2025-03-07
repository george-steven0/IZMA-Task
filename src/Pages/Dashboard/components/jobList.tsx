import { BsCalendar } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { CgPinAlt } from "react-icons/cg";
import { Divider, IconButton } from "@mui/material";
import { AiFillCodepenCircle } from "react-icons/ai";
import { BiGame } from "react-icons/bi";
import { BiRocket } from "react-icons/bi";
import { useState } from "react";
const JobList = () => {
  const jobList = [
    {
      id: 1,
      title: "Gaming UI designer",
      co: "Rockstar Games",
      address: "ElMansoura, Egypt",
      duration: "10 days ago",
      types: [
        { id: 1, title: "0 - 3y of exp" },
        { id: 2, title: "Full time" },
        { id: 3, title: "remote" },
      ],
      footer: "Creative / Design    -   IT / Software development  -  Gaming ",
      icon: <BiRocket />,
    },

    {
      id: 2,
      title: "Senior UX UI Designer",
      co: "Egabi",
      address: "Cairo, Egypt",
      duration: "month ago",
      types: [
        { id: 1, title: "0 - 3y of exp" },
        { id: 2, title: "Full time" },
        { id: 3, title: "Hybrid" },
      ],
      footer: "Creative / Design    -   IT / Software development",
      icon: <BiGame />,
    },

    {
      id: 3,
      title: "React Frontend developer",
      co: "Magara",
      address: "Cairo, Egypt",
      duration: "month ago",
      types: [
        { id: 1, title: "5 - 7y of exp" },
        { id: 2, title: "Freelance" },
        { id: 3, title: "Remote" },
      ],
      footer: "Creative / Design    -   IT / Software development",
      icon: <AiFillCodepenCircle />,
    },
  ];

  const [activeTab, setactiveTab] = useState<number>(1);

  const handleActiveTab = (active: number) => {
    setactiveTab(active);
  };
  return (
    <>
      {jobList?.map((item, index) => (
        <div
          onClick={() => handleActiveTab(item?.id)}
          key={item?.id}
          className={`p-5 flex flex-row-reverse mb-4 rounded-md item-start justify-between ${
            activeTab === index + 1
              ? "bg-[#f3fdf3] border border-[#3d8e4179]"
              : "bg-white"
          }  shadow-sm cursor-pointer`}
        >
          <div className="fav-wrapper">
            <IconButton className="bg-white border border-[#C4C3C3]">
              <FaHeart className="text-[#C4C3C3] text-base" />
            </IconButton>
          </div>

          <div className="flex flex-col justify-around items-start">
            <div className="flex items-center gap-x-3 mb-3">
              <span className="text-4xl">{item?.icon}</span>
              <div>
                <p className="text-lg font-medium">{item?.title}</p>
                <p className="text-[#14A077] text-xs font-semibold">
                  {item?.co}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-x-3 my-2">
              <div className="flex items-center gap-x-1 text-xs">
                <CgPinAlt />
                {item?.address}
              </div>
              <div className="flex items-center gap-x-1 text-xs">
                <BsCalendar />
                {item?.duration}
              </div>
            </div>

            <div className="flex items-center gap-x-2">
              {item?.types?.map((type) => (
                <p
                  key={type?.id}
                  className="p-2 bg-[#F7F7F7] text-xs text-[#707070]"
                >
                  {type?.title}
                </p>
              ))}
            </div>

            <Divider />

            <div className="mt-4 text-sm text-[#707070]">{item?.footer}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobList;
