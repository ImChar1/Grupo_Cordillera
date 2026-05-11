import react from 'react';
import CarouselPrincipal from '../components/card';
import CardProducto from '../components/card';
import { Link } from "react-router-dom";
import { faBars, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Bienvenida() {

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-xl-12'>
                    <br />
                    <h2 className='text-center mb-4'>
                        <FontAwesomeIcon icon={faStar} className="general-icon" />Productos destacados
                    </h2>
                    <br />
                </div>
            </div>

            <div className='row'>
                <div className='col-xl-3'>
                    <CardProducto titulo='Lataffa' desc='Body Spray Armaf Odyssey Odyssey Home For Men 200 Ml'
                        ruta='/images/PerfubeArabe.jpg' rutaproducto='/producto/12' />
                </div>
                <div className='col-xl-3'>
                    <CardProducto titulo='Lataffa' desc='Perfume Mujer Lattafa Yara Tous EDP 100 Ml' ruta='/images/perfumearab.jpg' rutaproducto='/producto/15' />
                </div>
                <div className='col-xl-3'>
                    <CardProducto titulo='Lataffa' desc='Perfume Mujer Lattafa Fakhar Gold Extrait EDP 100 Ml' ruta='/images/perfume.jpg' rutaproducto='/producto/13' />
                </div>
                <div className='col-xl-3'>
                    <CardProducto titulo='Lataffa' desc='Perfume Hombre Lattafa Ana Abiyedh Rouge EDP 60 Ml'
                        ruta='/images/PerfubeArabe2.jpg' rutaproducto='/producto/11' />
                </div>
            </div>
            <br />
            <div className='text-center d-grid gap-2 col-6 mx-auto'>
            </div>
        </div>

    );

}

export default Bienvenida;