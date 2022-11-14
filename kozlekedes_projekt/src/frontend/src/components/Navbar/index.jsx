import "./index.scss";
import { NavLink} from 'react-router-dom';
import {faHome,faXmark} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function NavBar() {
    return (
        <>
        <div className='nav-bar'>
   
    <nav>
    <NavLink
            exact="true" 
            activeclassname="active" 
            to="/">
            <FontAwesomeIcon icon={faHome} color="#ffffff"/>
        </NavLink>
        
        
        <div className="dropdown">
            <p className="dropp">Menetrendek</p>
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
            </div>
        </div>
        <NavLink
            exact="true"
            activeclassname="active"
            className="news-link" 
            to="/News">
            Hírfolyam
        </NavLink>
        <NavLink
            exact="true" 
            activeclassname="active" 
            className="help"
            to="/Help">
            Segítség
        </NavLink>
        <NavLink
            exact="true" 
            activeclassname="active" 
            className="price-link"
            to="/price">
            Áraink
        </NavLink>
        <NavLink
            exact="true" 
            activeclassname="active" 
            to="/">
            Bejelentkezés/Regisztráció
        </NavLink>
        <NavLink
            exact="true" 
            activeclassname="active" 
            className="profil-link"
            to="/profil">
            Profil
        </NavLink>
        <NavLink
            exact="true" 
            activeclassname="active" 
            className="logout"
            to="/">
            <FontAwesomeIcon icon={faXmark} color='#ffffff'/>
        </NavLink>
        
    </nav>
    
</div>
      </>
    );
}
export default NavBar;