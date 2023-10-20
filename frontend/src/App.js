import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paths from "./Components/Routers/Route";
import Nav from "./Components/Navbar/Nav";
function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Nav />
      <Paths />
    </div>
  );
}

export default App;
