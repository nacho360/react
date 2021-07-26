import './App.css';
import {BrowserRouter,Route} from "react-router-dom"
import Login from './Pages/Login';
import Home from "./Pages/Home"
import RegistroPage from "./Pages/RegistroPage"
import DetallePage from "./Pages/DetallePage"
import Compra from "./Pages/Compra"
import Menu from "./Components/Menu"
import ABMPage from './Pages/ABMPage';

function App() {

  return (
    <BrowserRouter>
      <Menu />
      <Route path="/home" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/registro" exact component={RegistroPage} />
      <Route path="/producto/:id" exact component={DetallePage} />
      <Route path="/compra" exact component={Compra} />
      <Route path="/catalogo" exact component={ABMPage} />
    </BrowserRouter>
  );
}

export default App;
