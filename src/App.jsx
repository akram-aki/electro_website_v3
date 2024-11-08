import "./App.css";
import Navbar from "./components/navbar/index";
import Button from "./components/button/Index";
function App() {
  return (
    <>
      <div className="w-52 justify-center flex items-center mt-52 ml-32">
        <Button>
          <p className="text-[#f4f4f2] font-medium">Click Me</p>
        </Button>
      </div>
      <Navbar></Navbar>
    </>
  );
}

export default App;
