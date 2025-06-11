import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Index from "./pages/Index";
import Catalogo from "./pages/Catalogo";
import Perfil from "./pages/Perfil";

import Ficcion from "./pages/Ficcion";
import NoFiccion from "./pages/NoFiccion";
import InfantilJuvenil from "./pages/InfantilJuvenil";
import ReferenciaConsulta from "./pages/ReferenciaConsulta";
import ArtesHumanidades from "./pages/ArtesHumanidades";
import Educacion from "./pages/Educacion";
import Entretenimiento from "./pages/Entretenimiento";

import Login from "./pages/Login";


function App() {
  return (
    <Router>
      <Routes>
        /** Inicio */
        <Route path="/" element={<Index />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/perfil" element={<Perfil />} />

        /** Categorias */
        <Route path="/ficcion" element={<Ficcion />} />
        <Route path="/no-ficcion" element={<NoFiccion />} />
        <Route path="/infantil-juvenil" element={<InfantilJuvenil />} />
        <Route path="/referencia-consulta" element={<ReferenciaConsulta />} />
        <Route path="/artes-humanidades" element={<ArtesHumanidades />} />
        <Route path="/educacion" element={<Educacion />} />
        <Route path="/entretenimiento" element={<Entretenimiento />} />

        /**Login */
      </Routes>
    </Router>
  );
}

export default App;
