import { BiArrowBack } from "react-icons/bi";
import { MdOutlineSaveAlt } from "react-icons/md";
import { MdOutlineDragIndicator } from "react-icons/md";
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { useEffect, useState } from "react";
import { getNavList, track, updateNav } from "../../Redux/Slices/navSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/TsHooks";
import { Divider, IconButton, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { MdExpandMore } from "react-icons/md";
import { useDrag, useDrop } from "react-dnd";
import { navListItem } from "../../Types/types";

const SideNavbar = ({ close }: { close: () => void }) => {
  const dispatch = useAppDispatch();
  const { navlist } = useAppSelector((state) => state?.nav);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editingChildItemId, setEditingChildItemId] = useState<number | null>(
    null
  );
  const [editedChildTitle, setEditedChildTitle] = useState<string>("");

  useEffect(() => {
    dispatch(getNavList());
  }, [dispatch]);

  // accordion list
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  //   console.log(navlist);

  // dnd

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [reorderedNavlist, setReorderedNavlist] =
    useState<navListItem[]>(navlist);

  useEffect(() => {
    setReorderedNavlist(navlist);
  }, [navlist]);

  const handleSettingsClick = () => {
    setIsDragging(!isDragging);
  };

  const handleSave = () => {
    dispatch(updateNav(reorderedNavlist));
    setIsDragging(false);
  };

  const handleCancel = () => {
    setReorderedNavlist(navlist);
    setIsDragging(false);
  };

  const moveNavItem = (dragIndex: number, hoverIndex: number) => {
    // console.log("Moved item from index:", dragIndex, "to index:", hoverIndex);
    const draggedItem = reorderedNavlist[dragIndex];
    const newNavList = [...reorderedNavlist];
    newNavList.splice(dragIndex, 1);
    newNavList.splice(hoverIndex, 0, draggedItem);
    setReorderedNavlist(newNavList);
    const trackValues = {
      id: draggedItem?.id,
      from: dragIndex,
      to: hoverIndex,
    };
    // console.log(trackValues);

    dispatch(track(trackValues));
  };

  const moveChildNavItem = (
    parentId: number,
    dragIndex: number,
    hoverIndex: number
  ) => {
    const updatedNavList = reorderedNavlist.map((item) => {
      if (item.id === parentId && item.children) {
        const draggedItem = item.children[dragIndex];
        const newChildren = [...item.children];
        newChildren.splice(dragIndex, 1);
        newChildren.splice(hoverIndex, 0, draggedItem);
        return { ...item, children: newChildren };
      }
      return item;
    });
    setReorderedNavlist(updatedNavList);
  };

  const handleVisibilityToggle = (id: number) => {
    const updatedNavList = reorderedNavlist.map((item) => {
      if (item.id === id) {
        return { ...item, visible: item.visible === false };
      }
      return item;
    });
    setReorderedNavlist(updatedNavList);
  };

  const handleChildVisibilityToggle = (parentId: number, childId: number) => {
    const updatedNavList = reorderedNavlist.map((item) => {
      if (item.id === parentId && item.children) {
        const updatedChildren = item.children.map((child) => {
          if (child.id === childId) {
            return { ...child, visible: child.visible === false };
          }
          return child;
        });
        return { ...item, children: updatedChildren };
      }
      return item;
    });
    setReorderedNavlist(updatedNavList);
  };

  const handleEditClick = (id: number, title: string) => {
    setEditingItemId(id);
    setEditedTitle(title);
  };

  const handleChildEditClick = (id: number, title: string) => {
    setEditingChildItemId(id);
    setEditedChildTitle(title);
  };

  const handleChildTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedChildTitle(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleSaveEdit = (id: number) => {
    const updatedNavList = reorderedNavlist.map((item) => {
      if (item.id === id) {
        return { ...item, title: editedTitle };
      }
      return item;
    });
    setReorderedNavlist(updatedNavList);
    setEditingItemId(null);
  };

  const handleSaveChildEdit = (parentId: number, childId: number) => {
    const updatedNavList = reorderedNavlist.map((item) => {
      if (item.id === parentId && item.children) {
        const updatedChildren = item.children.map((child) => {
          if (child.id === childId) {
            return { ...child, title: editedChildTitle };
          }
          return child;
        });
        return { ...item, children: updatedChildren };
      }
      return item;
    });
    setReorderedNavlist(updatedNavList);
    setEditingChildItemId(null);
  };

  const DraggableItem = ({
    item,
    index,
  }: {
    item: navListItem;
    index: number;
  }) => {
    const [{ isDragging: dragging }, drag] = useDrag(() => ({
      type: "NAV_ITEM",
      item: { index },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }));

    const [, drop] = useDrop(() => ({
      accept: "NAV_ITEM",
      hover: (draggedItem: { index: number }) => {
        if (draggedItem.index !== index) {
          moveNavItem(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    }));

    return (
      <div
        ref={(node) => {
          if (node) {
            drag(drop(node));
          }
        }}
        style={{ opacity: dragging ? 0.5 : 1 }}
      >
        <div
          key={item?.id}
          className="bg-[#F7F7F7] rounded-sm flex items-center justify-between"
        >
          {editingItemId === item.id ? (
            <TextField
              value={editedTitle}
              onChange={handleTitleChange}
              onBlur={() => handleSaveEdit(item.id)}
              autoFocus
              size="small"
            />
          ) : (
            <p className="py-3 px-4 text-base font-medium cursor-move flex items-center gap-x-1">
              <MdOutlineDragIndicator />
              {item?.title}
            </p>
          )}

          <div className="flex items-center gap-x-2">
            {editingItemId === item.id ? (
              <IconButton
                size="small"
                onClick={() => handleEditClick(item.id, item.title)}
              >
                <MdOutlineSaveAlt />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                onClick={() => handleEditClick(item.id, item.title)}
              >
                <FiEdit2 />
              </IconButton>
            )}
            <IconButton
              size="small"
              onClick={() => handleVisibilityToggle(item.id)}
            >
              {item.visible === false ? <ImEyeBlocked /> : <ImEye />}
            </IconButton>
          </div>
        </div>
        {item.children &&
          item.children.map((child, childIndex) => (
            <DraggableChildItem
              key={child.id}
              parentId={item.id}
              item={child}
              index={childIndex}
            />
          ))}
      </div>
    );
  };

  const DraggableChildItem = ({
    parentId,
    item,
    index,
  }: {
    parentId: number;
    item: navListItem;
    index: number;
  }) => {
    const [{ isDragging: dragging }, drag] = useDrag(() => ({
      type: "CHILD_NAV_ITEM",
      item: { parentId, index, childId: item.id },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }));

    const [, drop] = useDrop(() => ({
      accept: "CHILD_NAV_ITEM",
      hover: (draggedItem: {
        parentId: number;
        index: number;
        childId: number;
      }) => {
        if (
          draggedItem.parentId === parentId &&
          draggedItem.childId !== item.id
        ) {
          moveChildNavItem(parentId, draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    }));

    return (
      <div
        ref={(node) => {
          if (node) {
            drag(drop(node));
          }
        }}
        style={{ opacity: dragging ? 0.5 : 1 }}
      >
        <div
          key={item?.id}
          className="bg-[#f7f7f7] rounded-sm flex items-center justify-between ml-4"
        >
          {editingChildItemId === item.id ? (
            <TextField
              value={editedChildTitle}
              onChange={handleChildTitleChange}
              onBlur={() => handleSaveChildEdit(parentId, item.id)}
              autoFocus
              size="small"
            />
          ) : (
            <p className="py-3 px-4 text-base font-medium cursor-move flex items-center gap-x-1">
              <MdOutlineDragIndicator />
              {item?.title}
            </p>
          )}

          <div className="flex items-center gap-x-2">
            {editingChildItemId === item.id ? (
              <IconButton
                size="small"
                onClick={() => handleChildEditClick(item.id, item.title)}
              >
                <MdOutlineSaveAlt />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                onClick={() => handleChildEditClick(item.id, item.title)}
              >
                <FiEdit2 />
              </IconButton>
            )}
            <IconButton
              size="small"
              onClick={() => handleChildVisibilityToggle(parentId, item.id)}
            >
              {item.visible === false ? <ImEyeBlocked /> : <ImEye />}
            </IconButton>
          </div>
        </div>
      </div>
    );
  };

  //   console.log(reorderedNavlist);

  return (
    <>
      <div className="nav-list-wrapper bg-white shadow-sm h-full overflow-y-auto">
        <section className="list-header flex items-center justify-between p-4 text-lg">
          <div className="flex items-center gap-x-2">
            <IconButton onClick={close}>
              <BiArrowBack className="md:hidden text-xl" />
            </IconButton>
            <p className="font-medium">Menu</p>
          </div>

          {isDragging ? (
            <div className="flex justify-end">
              <IconButton onClick={handleCancel}>
                <AiOutlineCloseCircle className="text-red-500" />
              </IconButton>
              <IconButton onClick={handleSave}>
                <AiOutlineCheckCircle className="text-[#3D8E41]" />
              </IconButton>
            </div>
          ) : (
            <IconButton onClick={handleSettingsClick}>
              <CiSettings className="w-[30px] h-[30px] text-black" />
            </IconButton>
          )}
        </section>

        <Divider />

        <section className="flex flex-wrap [&>div]:basis-full [&>div]:mb-2 [&>div]:p-[6px] [&>div]:rounded-lg text-[#404040] p-4">
          {reorderedNavlist?.map((item, index) =>
            isDragging ? (
              <DraggableItem key={item?.id} item={item} index={index} />
            ) : item?.children && item?.children?.length !== 0 ? (
              <div key={item?.id}>
                <Accordion
                  disabled={item?.visible === false}
                  elevation={0}
                  expanded={expanded === item?.title}
                  onChange={handleChange(item?.title)}
                  className={`bg-[#F7F7F7]`}
                  sx={{
                    ".MuiAccordion-root": { boxShadow: "0" },
                    ".MuiPaper-root": { boxShadow: "0" },
                    "&.Mui-disabled": {
                      cursor: "not-allowed",
                    },
                  }}
                >
                  <AccordionSummary
                    sx={{ width: "100%" }}
                    expandIcon={<MdExpandMore />}
                  >
                    <Typography
                      className="font-medium"
                      component="span"
                      sx={{ width: "100%", flexShrink: 0 }}
                    >
                      {item?.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="bg-white">
                    <ul>
                      {item?.children?.map((child) => (
                        <li key={child?.id}>
                          <p
                            className={`py-2 px-4 text-base font-medium ${
                              child?.visible === false
                                ? "opacity-50 cursor-not-allowed"
                                : "opacity-100"
                            }`}
                          >
                            {child?.title}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </div>
            ) : (
              <div key={item?.id}>
                <p
                  className={`py-3 px-2 text-base font-medium ${
                    item?.visible === false
                      ? "cursor-not-allowed"
                      : "cursor-auto"
                  } bg-[#F7F7F7] rounded-md`}
                >
                  <span
                    className={`${
                      item?.visible === false ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    {item?.title}
                  </span>
                </p>
              </div>
            )
          )}
        </section>
      </div>
    </>
  );
};
export default SideNavbar;
