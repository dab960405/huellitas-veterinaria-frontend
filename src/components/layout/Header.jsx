// src/components/layout/Header.jsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaPaw } from 'react-icons/fa';

/**
 * Componente Header con navegación responsive.
 * Incluye menú hamburguesa para dispositivos móviles.
 */
function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    /** Alterna la visibilidad del menú en móvil */
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    /** Cierra el menú al hacer click en un enlace */
    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">
                    <FaPaw /> Huellitas
                </Link>

                <nav className={`header__nav ${menuOpen ? 'active' : ''}`}>
                    <NavLink to="/" onClick={closeMenu}>
                        Inicio
                    </NavLink>
                    <NavLink to="/duenos" onClick={closeMenu}>
                        Dueños
                    </NavLink>
                    <NavLink to="/mascotas" onClick={closeMenu}>
                        Mascotas
                    </NavLink>
                    <NavLink to="/citas" onClick={closeMenu}>
                        Citas
                    </NavLink>
                </nav>

                <button className="header__menu-btn" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </header>
    );
}

export default Header;