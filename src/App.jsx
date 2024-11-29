import "./App.css";
import Header from "./components/Header/Index";
import Hero from "./components/Hero/Index";
import WhatDoWeProvide from "./components/WhatDoWeProvide/Index";
import Events from "./components/Events/Index";
function App() {
  return (
    <>
      <div className='mt-16 mx-24'>
        <Header />
        <Hero />
        <div className="h-[400px]"></div>
        <WhatDoWeProvide />
        <Events />
      </div>
    </>
  );
}

export default App;
