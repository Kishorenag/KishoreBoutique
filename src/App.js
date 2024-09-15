import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import MyRoutes from "./MyRoutes";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";

export const API_URL = "https://fakestoreapi.com"
// export const API_URL = "http://localhost:5000"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
