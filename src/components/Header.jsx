import { brainwave } from "../assets";
import { navigation } from "../constants";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/design/Header";
import { useState } from "react";
import { disablePageScroll,enablePageScroll } from "scroll-lock";

const Header = () => {
  const pathName = useLocation();
  const [openNav, setOpenNav] = useState(false);
  // console.log(openNav);

  function handleClick(){
    if(!openNav){
      return
    }
    enablePageScroll()
    setOpenNav(false)
  }

  const toggleNav = () => {
    console.log(openNav)
    if(openNav){
      setOpenNav(false)
      enablePageScroll()
    }else{
      setOpenNav(true)
      disablePageScroll()
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50
        border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm w-full ${
          openNav ? "bg-n-8" : "bg-n-8/90 backdrop-blue-sm"
        }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={brainwave} alt="Brainwave" width={190} height={40} />
        </a>

        <nav
          className={`${
            openNav ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 
        lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div
            className="relative z-2 flex flex-col items-center 
          justify-center m-auto lg:flex-row"
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                onClick={handleClick}
                href={item.url}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg: -mr-0.25 lg:text-xs lg:font-semibold 
                ${
                  item.url === pathName.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>
          <HamburgerMenu />
        </nav>
        <a
          href="#signup"
          className="hidden button mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          New Account
        </a>
        <Button className="hidden lg:flex" href="#login">
          Sign In
        </Button>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNav}
        >
          <MenuSvg openNavigation={openNav} />
        </Button>
        {/* <button onClick={toggleNav}>button</button> */}
      </div>
    </div>
  );
};

export default Header;
