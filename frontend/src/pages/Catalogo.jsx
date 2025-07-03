import "../styles/style.css"
import HeaderBlue from "../components/HeaderBlue";
import Filter from "../components/Filter";
import Catalog from "../components/Catalog";
import Footer from "../components/Footer";

function Catalogo() {
    
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

export default Catalogo;