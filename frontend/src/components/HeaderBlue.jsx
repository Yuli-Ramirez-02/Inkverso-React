import "../styles/style.css"; 

function HeaderBlue() {
    return(
        <>
        <div>
            <div className="blue__bar">
                    <div className="bar__content">
                        <div className="div__content">
                            <h1 className="title__inkverso">INKVERSO</h1>
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