import "./App.css";
import Navbar from "./components/navbar/index";
import { Primary_button, Secondary_button } from "./components/button/Index";
import Hero from "./components/Hero";
import WhatDoWeProvide from "./components/WhatDoWeProvide";
import Header from "./components/Header";
function App() {
  return (
    <div className='mt-16 mx-24'>
      <Header />
      <Hero />
      <div className="h-[400px]"></div>

      <WhatDoWeProvide />
    </div>
  );
}

export default App;
