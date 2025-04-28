import DownIcon from "../../assets/DownIcon.svg";
import ellipseImage from "../../assets/Ellipse 8.png";

import { Secondary_button } from "../button/Index";

function Hero() {
  return (
    <div className="relative grid md:grid-cols-[6fr_6fr] gap-16 md:gap-32 mt-10 mb-10">
      {/* <div
        style={{
          position: "absolute",
          top: "-60px", // Adjust the top position as needed
          left: "-19px", // Adjust the left position as needed
          width: "200px",
          height: "200px",
          backgroundImage: `url(${ellipseImage})`,
          backgroundSize: "150px 150px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left top",
        }}
        className="z-0"
      ></div> */}
      <h1 className="font-bold text-4xl md:text-[44px] leading-tight z-0 text-main">
        We are a <span className="text-[#70a939]">quick-growing </span>
        community of highly passionate and motivated members.
      </h1>
      <div className="">
        <p className="uppercase text-[#4F4F4D]">
          <span className="text-[#96C390]"> ELECTRO CLUB</span> IS A
          student-driven space at the university of boumerdes, algeria.
          <br></br>
          <br></br>
          founded in 2011, we exceed at hosting events, sharing our passion with
          members, and showcasing our ELECTRONICS CREATIONS.
        </p>
        <div className="flex mt-14 gap-8 justify-center mr-10 md:justify-start">
          <Secondary_button>
            <div className="flex gap-8">
              <img src={DownIcon} alt="Down Icon" />
              Check us out!
            </div>
          </Secondary_button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
