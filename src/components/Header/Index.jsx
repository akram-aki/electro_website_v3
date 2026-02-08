import React from "react";
import logo from "../../assets/LOGO.png";
import LanguageLogo from "../../assets/LanguageLogo.svg";
function Header({ hidden, ...attributes }) {
  return (
    <div {...attributes}>
      <div className="w-full">
        <div className="flex justify-between">
          <a href="/">
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "32px",
              }}
            />
          </a>
        </div>
      </div>
      {/* <div className="lg:h-[107px]" /> */}
    </div>
  );
}

export default Header;
