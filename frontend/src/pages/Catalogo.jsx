import "../styles/style.css"
import Footer from "../components/Footer";
import Filter from "../components/Filter";

import { useState, useEffect } from "react";

function Catalogo() {
    
    return (
        <>
        <div>
            <div className="blue__bar">
                    <div className="footer__content">
                        <div className="footer__div">
                            <h1 className="footer__inkverso">INKVERSO</h1>
                        </div>

                        <div className="icons">
                            <img className="icons__cart" src="src/assets/bx-cart.svg" alt="Logo Facebook" />
                        </div>
                    </div>
            </div>
        </div>

        <Filter/>

        <Footer/>
        </>
    );
}

export default Catalogo;