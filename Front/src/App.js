import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home/home";

function App() {
  const urlBackend = "https://alfapassword-api.azurewebsites.net/";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login url={urlBackend} />} />
        <Route path="/home" element={<Home url={urlBackend} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
