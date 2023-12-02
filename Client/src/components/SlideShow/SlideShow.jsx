// SlideShow.js

import React, { useState, useEffect } from 'react';
import { Fade } from 'react-reveal';
import Style from './SlideShow.module.css';

const SlideShow = () => {
    const [images, setImages] = useState([
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2-UYxsZRUcmungz5IuM6l8Vr7gGkDAnCFqQ&usqp=CAU',
        'https://previews.123rf.com/images/yupiramos/yupiramos1707/yupiramos170725878/82984411-dise%C3%B1o-aislado-gr%C3%A1fico-del-ejemplo-del-vector-del-icono-de-la-estad%C3%ADstica.jpg',
        'https://thumbs.dreamstime.com/b/concepto-m%C3%B3vil-de-las-finanzas-de-la-contabilidad-y-de-las-estad%C3%ADsticas-53023921.jpg',
        'https://www.bbva.com/wp-content/uploads/2018/04/plan-negocios-empresas-bbva-1920x1281.jpg',
        'https://cdn.shopify.com/s/files/1/0229/0839/files/business-plan-de-negocios.jpg?v=1634725362',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdb1C37xwRiEmKf6xtlBhNPea6ZqkfumTuXTp-8xITVE-_JeGeHeIE2kwU4rOkZka3gPw&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDqO0x7ew6v0Vml4Bmgoete2jKh_kwkW0wWw',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ky2bLxA4AVe1OhsL9OAQrWq3mChPixPumQ&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwZx9dK0Ma4ysc66c93nHgU5BCs2pgmZuKWg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPpOhlT5nR8xtptirmEIPQs5IyP2dwRMvlNA&usqp=CAU'
    ]);    
    
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const changeImage = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setTimeout(changeImage, 8000); // Ajusta el intervalo a 8000 para un cambio más lento
        };

        const timeoutId = setTimeout(changeImage, 8000); // Iniciar el cambio de imagen

        return () => clearTimeout(timeoutId); // Limpiar el timeout al desmontar el componente
    }, [currentIndex, images.length]);

    const getGridItems = () => {
        const gridItems = [];
        const totalItems = 3 * 3;
        for (let i = 0; i < totalItems; i++) {
            const imageIndex = (i + currentIndex) % images.length;
            const image = images[imageIndex];

            gridItems.push(
                <Fade key={i} delay={i * 200}>
                    <div className={Style.gridItem}>
                        <img
                            src={image}
                            alt={`Imagen ${imageIndex + 1}`}
                            className={Style.image}
                        />
                    </div>
                </Fade>
            );
        }
        return gridItems;
    };

    return (
        <div className={Style.containerSlideshow}>
            <div className={Style.slideShowContainer}>
                <div className={Style.gridContainer}>{getGridItems()}</div>
            </div>
        </div>
    );
};

export default SlideShow;