import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Index from "./pages/Index";
import Catalogo from "./pages/Catalogo";
import Perfil from "./pages/Perfil";
import InicioAdmin from "./pages/InicioAdmin";
import CatalogoAdmin from "./pages/CatalogoAdmin";
import Usuarios from "./pages/Usuarios";

import Ficcion from "./pages/Ficcion";
import NoFiccion from "./pages/NoFiccion";
import InfantilJuvenil from "./pages/InfantilJuvenil";
import ReferenciaConsulta from "./pages/ReferenciaConsulta";
import ArtesHumanidades from "./pages/ArtesHumanidades";
import Educacion from "./pages/Educacion";
import Entretenimiento from "./pages/Entretenimiento";
import DetalleLibro from "./pages/DetalleLibro";

import Login from "./pages/Login";

import Register from "./pages/Registro";
import Verificar from "./pages/Verificar";

import Recover from "./pages/Recuperar";

import ModifyAddress from "./pages/Modificar-direccion";

import ConfirmAddress from "./pages/Confirmar-direccion";

import Pago from "./pages/Pago";
import DashboardAdmin from "./components/DashboardAdmin";


function App() {
  return (
    <Router>
      <Routes>
        /** Inicio */
        <Route path="/" element={<Index />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/inicioAdmin" element={<InicioAdmin />} />
        <Route path="/inicioAdmin" element={<DashboardAdmin />} />
        <Route path="/catalogoAdmin" element={<CatalogoAdmin />} />
        <Route path="/usuarios" element={<Usuarios />} />

        /** Categorias */
        <Route path="/ficcion" element={<Ficcion />} />
        <Route path="/NoFiccion" element={<NoFiccion />} />
        <Route path="/InfantilJuvenil" element={<InfantilJuvenil />} />
        <Route path="/ReferenciaConsulta" element={<ReferenciaConsulta />} />
        <Route path="/ArtesHumanidades" element={<ArtesHumanidades />} />
        <Route path="/educacion" element={<Educacion />} />
        <Route path="/entretenimiento" element={<Entretenimiento />} />
        <Route path="/libro/:id" element={<DetalleLibro />} />

        /**Login */
        <Route path="/login" element={<Login />} />

        /**Registro */
        <Route path="/Registro" element={<Register />} />
        <Route path="/verificar" element={<Verificar />} />

        /**Recuperar */
        <Route path="/Recuperar" element={<Recover />}/>

        /**Modificar direccion */
        <Route path="/Modificar-direccion" element={<ModifyAddress />}/>

        /**Confirmar direccion */
        <Route path="/Confirmar-direccion" element={<ConfirmAddress />}/>

        /**Pago */
        <Route path="/Pago" element={<Pago />}/>
      </Routes>
    </Router>
  );
}

export default App;
