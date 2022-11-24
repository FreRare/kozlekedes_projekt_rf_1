import React from "react";
import "./index.scss";
import { NavLink} from 'react-router-dom';
import {faHome,faXmark} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useEffect, useState} from "react";


function NavBar() {

    const [bevagyjelentkezeveBaszod, setBevagyjelentkezeveBaszod] = useState();

    if(!bevagyjelentkezeveBaszod && sessionStorage.getItem('loggedin')) {
        setBevagyjelentkezeveBaszod(JSON.parse(sessionStorage.getItem('loggedin')));
        console.log(bevagyjelentkezeveBaszod);
    }

    return (
        <>
        <div className='nav-bar'>
    <nav>
        {!bevagyjelentkezeveBaszod && <NavLink
            exact="true" 
            activeclassname="active" 
            to="/">
            <FontAwesomeIcon icon={faHome} color="#ffffff"/>
        </NavLink>}
        <div className="dropdown">
            <p className="dropp" content="Menetrendek"><span>Menetrendek</span></p>
            <div className="dropdown-content">
                <NavLink 
                    exact="true"
                    activeclassname="active"
                    className="menetrendek-link-busz"
                    to="/menetrendek/bus">
                    Busz
                </NavLink>
                <NavLink 
                    exact="true"
                    activeclassname="active"
                    className="menetrendek-link-villamos"
                    to="/menetrendek/villamos">
                    Villamos
                </NavLink>
                <NavLink 
                    exact="true"
                    activeclassname="active"
                    className="menetrendek-link-troli"
                    to="/menetrendek/troli">
                    Troli
                </NavLink>
                <NavLink
                    exact="true"
                    activeclassname="active"
                    className="menetrendek-link-busz"
                    to="/Menetrendek/AdminMenu">
                    Szerkesztés
                </NavLink>
            </div>
        </div>
        {bevagyjelentkezeveBaszod &&
            <NavLink
            exact="true"
            activeclassname="active"
            className="news-link"
            to="/News">
            Hírfolyam
        </NavLink>}
        { !bevagyjelentkezeveBaszod &&
            <NavLink
                exact="true"
                activeclassname="active"
                to="/">
                Bejelentkezés/Regisztráció
            </NavLink>
        }
        {bevagyjelentkezeveBaszod &&
            <NavLink
                exact="true"
                activeclassname="active"
                className="profil-link"
                to="/profil">
                Profil
            </NavLink>
        }
        {bevagyjelentkezeveBaszod &&
            (
                <NavLink
                exact="true"
                activeclassname="active"
                className="logout"
                onClick={()=>{
                    sessionStorage.removeItem('loggedin');
                }}
                to="/">
                <FontAwesomeIcon icon={faXmark} color='#ffffff'/>
                </NavLink>
            )
        }
        <NavLink
            exact="true"
            activeclassname="active"
            className="help"
            to="/Help">
            Segítség
        </NavLink>
        
    </nav>
    
</div>
      </>
    );
}
export default NavBar;