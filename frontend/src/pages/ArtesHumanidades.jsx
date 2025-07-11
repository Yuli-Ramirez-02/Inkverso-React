import "../styles/style.css"
import HeaderBlue from "../components/HeaderBlue";
import Footer from "../components/Footer";
import Catalog from "../components/Catalog";
import Filter from "../components/Filter";

function ArtesHumanidades() {
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

export default ArtesHumanidades;