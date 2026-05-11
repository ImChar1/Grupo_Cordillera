import react from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


function CardProducto(props) {

    return (
        <div className="card h-100 w-100 shadow-sm border-0 d-flex flex-column" style={{ width: '18rem' }}>
            <img src={props.ruta} className="card-img-top" alt="..." />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{props.titulo}</h5>
                <p className="card-text">{props.desc}</p>
                <Link to={props.rutaproducto} className="btn btn-success mt-auto d-block"> <FontAwesomeIcon icon={faEye} /> Ver detalles</Link>
            </div>
        </div>
    );
}

export default CardProducto;