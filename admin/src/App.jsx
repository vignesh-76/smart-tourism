
import Login from "./components/Login/Login";

import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from "./components/signup/Signup";
import Homepage from "./components/homepage.jsx/Homepage";
import Nextpage from "./components/homepage.jsx/Nextpage";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/homepage/:id" element={<Homepage/>}/>
      <Route path="/nextpage/:id/:state" element={<Nextpage/>}/>
     
    </Routes>
    </BrowserRouter>
  );
}
 