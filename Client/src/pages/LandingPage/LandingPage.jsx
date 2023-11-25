
import Header from "../../components/Header/Header"

import style from "./LandingPage.module.css"

export default function LandingPage(){
    return(
        <div className={style.landingPage}>
            <Header/>
           
            <div className={style.sideInfo}>
                <h1 className={style.sideText}>Tu negocio a la mano y en todos tus dispositivos</h1>
                <p>¡No importa el tamaño! Aquí los pequeños negocios, comerciantes y emprendedores pueden digitalizar, monitorear y crecer las finanzas de su negocio.</p>
                <ul>
                    <li>Registra tus ventas, deudas y gastos.</li>
                    <li>Gestiona grandes inventarios desde tu computador</li>
                    <li>Crea tu catálogo virtual y vende en linea</li>
                    <li>Sincroniza tu información automáticamente en tu app y PC</li>
                </ul>
            </div>
            <div className={style.sideBox}>
                <img className={style.corporateImage} src="https://www.processmaker.com/wp-content/uploads/2019/02/corporate-shake-hands.jpg" alt="" />
                <h2>Espacio libre por si queremos añadir algo mas</h2>
            </div>
        </div>
        )
}