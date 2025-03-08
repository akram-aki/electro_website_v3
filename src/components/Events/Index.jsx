import { Secondary_button } from "../button/Index";
import StealScroll from "../stealScrollEvents/Index";
import DownIcon from "../../assets/DownIcon.svg";
function Events() {
  return (
    <>
      <div className="flex flex-col xl:ml-16 -mt-[230px]">
        <div className="xl:w-1/12" />
        <h1 className="xl:w-5/12 font-semibold text-[#262525] xl:text-[35px] text-2xl xl:mb-0">
          Events
        </h1>
        <div className="xl:w-6/12">
          <span className="font-semibold text-[#686868] xl:text-[22px]">
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
