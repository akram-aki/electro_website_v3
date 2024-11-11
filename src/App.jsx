import "./App.css";
import Navbar from "./components/navbar/index";
import { Primary_button, Secondary_button } from "./components/button/Index";
function App() {
  return (
    <>
      <div className="w-52 justify-center flex   items-center mt-52 ml-32">
        <Primary_button>
          <p className="text-[#f4f4f2] font-medium">Click Me</p>
        </Primary_button>
      </div>
      <Navbar></Navbar>
      <div className="flex justify-center mt-20">
        <Secondary_button style={{ fontWeight: 500, fontSize: 15 }}>
          Development process
        </Secondary_button>
      </div>
    </>
  );
}

export default App;
