import "../styles/style.css"
import HeaderBlue from "../components/HeaderBlue";
import Footer from "../components/Footer";
import Catalog from "../components/Catalog";
import Filter from "../components/Filter";

function Educacion() {
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

export default Educacion;