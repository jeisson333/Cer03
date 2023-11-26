import React from 'react';
import styles from './Home.module.css';
import { FaListOl } from "react-icons/fa6";
import { FaFilterCircleDollar } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

export default function Home() {
    const productos = [
        {
            "Concepto": "Regla",
            "Valor": 1.20,
            "Estado": "Pagado"
        },
        {
            "Concepto": "Goma de borrar",
            "Valor": 0.75,
            "Estado": "Pendiente"
        },
        {
            "Concepto": "Plumón",
            "Valor": 3.50,
            "Estado": "Pendiente"
        },
        {
            "Concepto": "Pegamento",
            "Valor": 1.80,
            "Estado": "Pagado"
        },
        {
            "Concepto": "Calculadora",
            "Valor": 10.99,
            "Estado": "Pendiente"
        },
        {
            "Concepto": "Resaltador",
            "Valor": 1.25,
            "Estado": "Pagado"
        },
        {
            "Concepto": "Cinta adhesiva",
            "Valor": 1.50,
            "Estado": "Pendiente"
        },
        {
            "Concepto": "Tijeras",
            "Valor": 2.00,
            "Estado": "Pagado"
        },
        {
            "Concepto": "Folder",
            "Valor": 2.75,
            "Estado": "Pendiente"
        },
        {
            "Concepto": "Corrector líquido",
            "Valor": 1.90,
            "Estado": "Pagado"
        }
    ];


    return (
        <div className={styles.container}>
            <div className={`${styles.movimientos}`}>
                <h2>Movimientos</h2>
                <button className={styles.buttonNv}>Nueva venta</button>

                <button >Nuevo gasto</button>


            </div>
            <div className={styles.divider}></div>
            <div className={styles.filtrosContainer}>

                <button className={styles.buttons}><FaFilterCircleDollar /> Filtrar</button>
                <button className={styles.buttons}><FaListOl /> Ordenar</button>
                <div className={styles.buttonContainer}>
                    {/* <CiSearch /> */}
                    <input
                        type="search"
                        placeholder="Buscar concepto..."
                        className={styles.searchInput}
                    />

                </div>
            </div>

            <div className={styles.divider}></div>
            <table className={styles.productTable}>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Valor</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, index) => (
                        <tr key={index}>
                            <td>{producto.Concepto}</td>
                            <td>{producto.Valor}</td>
                            <td>{producto.Estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
