import { Secondary_button } from "../button/Index";
import StealScroll from "../stealScrollEvents/Index";
import DownIcon from "../../assets/DownIcon.svg";
function Events() {
  return (
    <>
      <div className="flex flex-col ml-16">
        <div className="w-1/12" />
        <h1 className="w-5/12 font-semibold text-[#262525] text-[35px] ">
          Events
        </h1>
        <div className="w-6/12">
          <span className="font-semibold text-[#686868] text-[22px]">
            Check out the most notable Events hosted by Electro Scientific Club!
          </span>
          <div className="flex mt-16">
          </div>
        </div>
      </div>
      <StealScroll />
    </>
  );
}

export default Events;
