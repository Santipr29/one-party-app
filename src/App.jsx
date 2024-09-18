import './App.css'; 
import logo from "./assets/logo.png"
import Body from './components/Body';

function App() {
  return (
    <div className="App">
      <img src={logo}/>
      <Body/>
    </div>
  );
}

export default App;
