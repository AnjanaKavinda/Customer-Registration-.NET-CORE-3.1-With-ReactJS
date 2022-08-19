import '../src/Styles/css/main.css';
import Navbar from './Components/Navbar';
import {
  Routes,
  Route
} from "react-router-dom";
import Customer from './Components/Customer';

function App() {
  return (
    <>
    <Navbar />
    <div className="App">
        <Routes>
          <Route path="/" element={<Customer />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
