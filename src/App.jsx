import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Index from "./pages/Index.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Perfil from "./pages/Perfil.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default App;
