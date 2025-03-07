type backdropProps = {
  open: boolean;
  close: () => void;
};
const BackDrop = ({ open, close }: backdropProps) => {
  return (
    <div
      onClick={close}
      className={`md:hidden bg-[rgba(0,0,0,.3)] backdrop-blur-md absolute top-0 left-0 right-0 bottom-0 z-10 ${
        open ? "hidden" : "block"
      }`}
    ></div>
  );
};

export default BackDrop;
