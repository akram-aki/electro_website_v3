import "./App.css";
import Header from "./components/Header/Index";
import Hero from "./components/Hero/Index";
import WhatDoWeProvide from "./components/WhatDoWeProvide/Index";
import Events from "./components/Events/Index";
import Nav from "./components/navbar/index";
import Markee from "./components/Markee/Index";
function App() {
  return (
    <>
      <div className=" mt-16 mx-16">
        <Header />
        <Nav></Nav>
        <Hero />
        <Markee />
        <WhatDoWeProvide />
        <Events />
      </div>
    </>
  );
}

export default App;
