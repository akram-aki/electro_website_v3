import "./App.css";
import StealScroll from "./components/stealScroll/Index";
import Header from "./components/Header/Index";
import Hero from "./components/Hero/Index";
import WhatDoWeProvide from "./components/WhatDoWeProvide/Index";
function App() {
  return (
    <>
      <div className='mt-16 mx-24'>
        <Header />
        <Hero />
        <div className="h-[400px]"></div>
        <WhatDoWeProvide />
        <StealScroll />
      </div>
    </>
  );
}

export default App;
