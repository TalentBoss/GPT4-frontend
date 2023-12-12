import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import FootyChat from "./components/FootyChat";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FootyChat />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
