import "../styles/style.css"
import HeaderBlue from "../components/HeaderBlue";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import Catalog from "../components/Catalog";


function ReferenciaConsulta() {
    return (
        <>
        <HeaderBlue/>        
        <div className="catalog__layout">
            <Filter/>
            <Catalog/>
        </div>
        <Footer/>
        </>
    );
}

export default ReferenciaConsulta;