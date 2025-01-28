import '../Styles/App.css';
import LandingPage from '../Components/LandingPage';
import LoginSignup from '../Components/LoginSignup';
import SizeBasedCalc from '../Components/SizeBasedCalc';
import CoalMinedBasedCalc from './CoalMinedBasedCalc';
import AnalysePage from './AnalysePage';
import ProfilePage from './ProfilePage';
import TranspostBasedCalc from '../Components/TransportBasedCalc';
import MachineryBasedCalc from '../Components/MachineryBasedCalc';
import HistoryPage from './HistoryPage';
import HowItWorks from './HowItWorks'
// import Selectorhome from './Selectorhome';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/loginsignup' element={<LoginSignup/>}></Route>     
        <Route path='/sizebasedcalc' element={<SizeBasedCalc/>}></Route>
        <Route path='/coalminedbasedcalc' element={<CoalMinedBasedCalc/>}></Route>
        <Route path='/analyse' element={<AnalysePage/>}></Route>
        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/transportbasedcalc' element={<TranspostBasedCalc/>}></Route>
        <Route path='/machinerybasedcalc' element={<MachineryBasedCalc/>}></Route>
        <Route path='/history' element={<HistoryPage/>}></Route>
        <Route path='/howitworks' element={<HowItWorks/>}></Route>
        {/* <Route path='/selector' element={<Selectorhome/>}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
