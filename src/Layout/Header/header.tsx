import HeaderLeft from "./Components/header-left";
import HeaderRight from "./Components/header-right";

const Header = () => {
  return (
    <section className="header-wrapper p-3 bg-[#161616] text-white h-[98px] flex flex-col ">
      <div className="flex justify-between items-center flex-row-reverse md:flex-row w-full max-w-[94%] m-auto h-auto">
        <section className="header-left-section-wrapper">
          <HeaderLeft />
        </section>
        <section className="header-right-section-wrapper h-auto md:h-full">
          <HeaderRight />
        </section>
      </div>
    </section>
  );
};

export default Header;
