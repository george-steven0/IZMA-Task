import axios from "axios";
import "./App.css";

function App() {
  // axios.defaults.baseURL = "http://localhost:8081";
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  console.log(import.meta?.env.VITE_API_URL);

  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  return <></>;
}

export default App;
