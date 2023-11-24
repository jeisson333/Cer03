import { NavLink } from "react-router-dom"

import style from "./Header.module.css"

export default function Header(){
    return(
        <div className={style.header}>
        <img className={style.logoImage} src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg" alt="" />
        <div className={style.headerHolder}>
            <NavLink to ='/about'><h1 className={style.element}>Sobre Nosotros</h1></NavLink>
            <NavLink to = '/contact'><h1 className={style.element}>Contáctanos ✆</h1></NavLink>
            <NavLink  to = '/signIn'><button className={style.login}>Log In </button></NavLink>
        </div>
   
    </div>
    )
}