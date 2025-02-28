import "./App.css";
import Header from "./components/Header/Index";
import Hero from "./components/Hero/Index";
import WhatDoWeProvide from "./components/WhatDoWeProvide/Index";
import Events from "./components/Events/Index";
import Nav from "./components/navbar/index";
import Markee from "./components/Markee/Index";
import Projects from "./components/Projects/Index";
import Footer from "./components/Footer/Index";
function App() {
  return (
    <>
      <div className="xl:mt-16 xl:mx-16 mt-8 mx-6">
        <Header />
        <div className="hidden"><Nav /></div>
        <div className="xl:my-[220px] my-[110px] flex flex-col">
          <Hero />
          <div className="mx-auto xl:mx-0">
            <Markee />
          </div>

        </div>

        <WhatDoWeProvide />
        <Events />
        {/* <Projects /> */}
      </div>
      <Footer />

    </>
  );
}

export default App;
