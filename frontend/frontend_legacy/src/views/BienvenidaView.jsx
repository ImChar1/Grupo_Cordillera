import React from 'react';
import { CardProducto } from '../components/CardProducto';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const BienvenidaView = () => {
    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col-xl-12'>
                    <h2 className='text-center mb-4'>
                        <FontAwesomeIcon icon={faStar} className="general-icon text-warning me-2" /> 
                        Productos destacados
                    </h2>
                </div>
            </div>

            <div className='row g-4'>
                <div className='col-xl-3 col-md-6'>
                    <CardProducto 
                        titulo='Lataffa' 
                        desc='Body Spray Armaf Odyssey Odyssey Home For Men 200 Ml'
                        ruta='/images/PerfubeArabe.jpg' 
                        rutaproducto='/producto/12' 
                    />
                </div>
                <div className='col-xl-3 col-md-6'>
                    <CardProducto 
                        titulo='Lataffa' 
                        desc='Perfume Mujer Lattafa Yara Tous EDP 100 Ml' 
                        ruta='/images/perfumearab.jpg' 
                        rutaproducto='/producto/13' 
                    />
                </div>
                {/* Puedes seguir agregando más columnas aquí */}
            </div>
        </div>
    );
};