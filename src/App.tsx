import axios from "axios";
import "./App.css";

function App() {
  axios.defaults.baseURL = "http://localhost:8081";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  return <></>;
}

export default App;
