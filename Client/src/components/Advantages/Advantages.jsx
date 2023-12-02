import React from 'react';
import { Rotate } from 'react-reveal';
import Style from './Advantages.module.css'

const Advantages = () => {
    return (
        <Rotate>
          <div className={Style.advantagesContainer}>
            {/* Container FREE */}
            <div className={Style.advantageContainer}>
              <h2 className={Style.title}>FREE</h2>
              <p className={Style.price}>$0.00</p>
              <ul className={Style.list}>
                <li className={Style.listItem}>Ventaja 1</li>
                <li className={Style.listItem}>Ventaja 2</li>
                <li className={Style.listItem}>Ventaja 3</li>
                {/* Agrega más ventajas según sea necesario */}
              </ul>
            </div>
    
            {/* Container BASIC */}
            <div className={Style.advantageContainer}>
              <h2 className={Style.title}>BASIC</h2>
              <p className={Style.price}>$10.00</p>
              <ul className={Style.list}>
                <li className={Style.listItem}>Ventaja 1</li>
                <li className={Style.listItem}>Ventaja 2</li>
                <li className={Style.listItem}>Ventaja 3</li>
                {/* Agrega más ventajas según sea necesario */}
              </ul>
            </div>
    
            {/* Container SUPER */}
            <div className={Style.advantageContainer}>
              <h2 className={Style.title}>SUPER</h2>
              <p className={Style.price}>$15.00</p>
              <ul className={Style.list}>
                <li className={Style.listItem}>Ventaja 1</li>
                <li className={Style.listItem}>Ventaja 2</li>
                <li className={Style.listItem}>Ventaja 3</li>
                {/* Agrega más ventajas según sea necesario */}
              </ul>
            </div>
          </div>
        </Rotate>
      );
    };
    
    export default Advantages;
