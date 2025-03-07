import { Outlet } from "react-router-dom";
import Header from "./Header/header";
import SideNavbar from "./Sidenav/sideNav";
import { useAppDispatch, useAppSelector } from "../Redux/TsHooks";
import BackDrop from "../Common/backdrop";
import { openSideNav } from "../Redux/Slices/navSlice";

const Layout = () => {
  const { openNav } = useAppSelector((state) => state.nav);
  const dispatch = useAppDispatch();

  const handleToggleNav = () => {
    dispatch(openSideNav(!openNav));
  };

  return (
    <section className="layout-wrapper bg-[#eee] ">
      <div className="top-header">
        <Header />
      </div>

      <section className="body-wrapper flex items-start h-[calc(100vh-98px)] overflow-hidden">
        <article
          className={`side-nav min-w-[300px] md:min-w-[350px] max-w-[400px] h-full absolute z-30 md:static transition-all duration-500 ${
            openNav ? "left-0" : "-left-[200%]"
          }`}
        >
          <SideNavbar close={handleToggleNav} />
        </article>

        <article className="pages-wrapper h-full grow p-3 overflow-y-auto">
          <Outlet />
        </article>
        <BackDrop open={!openNav} close={handleToggleNav} />
      </section>
    </section>
  );
};

export default Layout;
