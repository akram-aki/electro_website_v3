import StealScroll from "../stealScrollProjects/Index";
function Projects() {
  return (
    <>
      <>
        <div className="flex flex-col xl:ml-16">
          <div className="xl:w-1/12" />
          <h1 className="xl:w-5/12 font-semibold text-[#262525] xl:text-[35px] text-2xl xl:mb-0">
            Projects
          </h1>
          <div className="xl:w-6/12">
            <span className="font-semibold text-[#686868] xl:text-[22px]">
              Check out the most notable Projects hosted by Electro Scientific
              Club!
            </span>
            <div className="flex mt-16"></div>
          </div>
        </div>
        <StealScroll />
      </>
    </>
  );
}

export default Projects;
