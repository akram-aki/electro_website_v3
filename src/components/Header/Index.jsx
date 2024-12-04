import React from "react";
import logo from "../../assets/LOGO.png";
import LanguageLogo from "../../assets/LanguageLogo.svg";
function Header() {
  return (
    <>
      <div className="w-11/12">
        <div className="flex justify-between">
          <a href="">
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "32px",
              }}
            />
          </a>
          <div className="flex items-center">
            <img
              src={LanguageLogo}
              width={21}
              height={24}
              alt="Language Logo"
            />
            <a className="ml-10 text-[#262625] text-[18px] font-semibold w-10/12">
              Arabic{" "}
            </a>
          </div>
        </div>
        <div className="w-1/12" />
      </div>
      <div className="h-[107px]" />
    </>
  );
}

export default Header;
