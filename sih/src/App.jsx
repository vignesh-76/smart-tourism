import VoiceAssistantPlain from "./VoiceAssistantPlain";
import Login from "./components/Login";
import Createaccount from "./components/firstlogin/Createaccount";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Useraccount from "./components/useraccount/Useraccount";
import Agenttourismdetaisl from "./components/agent/Agenttourismdetaisl";
import Agentdashboard from "./components/agent/Agentdashboard";
import Selectagent from "./components/tourist/Selectagent";
import Userhomepage from "./components/tourist/Userhomepage";
import Editaccount from "./components/agent/Editaccount";
import TouristMap from "./components/agent/Touristmap";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
       <Route path='/login' element={<Login/>}/>
      <Route path="/createaccount" element={<Createaccount/>}/>
      <Route path="/signup" element={<Login/>}/>
      <Route path="/useraccount/:id" element={<Useraccount/>}/>
      <Route path="/voice" element={<VoiceAssistantPlain/>}/>
      <Route path="/agenttourismdetaisl/:id" element={<Agenttourismdetaisl/>}/>
      <Route path="/agentdashboard/:id" element={<Agentdashboard/>}/>
      <Route path="/selectagent/:id" element={<Selectagent/>}/>
      <Route path="/userhomepage/:id" element={<Userhomepage/>}/>
      <Route path="/editaccount/:id/:account1" element={<Editaccount/>}/>
      <Route path="/touristmap/:id" element={<TouristMap/>}/>
    </Routes>
    </BrowserRouter>
  );
}
 