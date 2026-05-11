import react from 'react';

function CarouselPrincipal() {

    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={3} aria-label="Slide 4" />
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={3} aria-label="Slide 4" />
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={4} aria-label="Slide 5" />
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={5} aria-label="Slide 6" />
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="images/Oferta-Carrousel.png" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="images/Oferta-Carrousel2.png" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="images/Oferta-Carrousel3.png" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="images/Oferta-Carrousel4.png" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="images/Oferta-Carrousel5.png" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="images/Oferta-Carrousel6.png" className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>


    );
}

export default CarouselPrincipal;