import "../styles/style.css"; 
import { Link } from "react-router-dom";


function HeaderBlue() {
    return(
        <>
        <div>
            <div className="blue__bar">
                    <div className="bar__content">
                        <div className="div__content">
                            <Link  to="/" className="title__inkverso">INKVERSO</Link>
                        </div>

                        <div className="icons">
                            <img className="icons__cart" src="src/assets/bx-cart.svg" alt="Logo Facebook" />
                        </div>
                    </div>
            </div>
        </div>
        </>
    );
}

export default HeaderBlue;