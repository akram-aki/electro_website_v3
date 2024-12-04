import MarqueeItem from "./MarkeeItem";

const Marquee = () => {
  const upperMarquee = ["TEACH", "TO", "LEARN"];
  return (
    <div className="container mx-auto overflow-hidden p-5">
      <MarqueeItem images={upperMarquee} from={0} to={"-100%"} />
    </div>
  );
};

export default Marquee;
