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

import Register from "./pages/Registro";

import Recover from "./pages/Recuperar";

import ModifyAddress from "./pages/Modificar-direccion";


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
        <Route path="/login" element={<Login />} />

        /**Registro */
        <Route path="/Registro" element={<Register />} />

        /**Recuperar */
        <Route path="/Recuperar" element={<Recover />}/>

        /**Modificar direccion */
        <Route path="/Modificar-direccion" element={<ModifyAddress />}/>

      </Routes>
    </Router>
  );
}

export default App;
