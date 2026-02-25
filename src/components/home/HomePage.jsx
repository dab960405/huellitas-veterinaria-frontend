// src/components/home/HomePage.jsx
import { Link } from 'react-router-dom';
import { FaUserFriends, FaDog, FaCalendarAlt } from 'react-icons/fa';

/**
 * Página principal del sistema.
 * Muestra tarjetas de acceso rápido a cada módulo.
 */
function HomePage() {
    return (
        <>
            <section className="hero">
                <h2>🐾 Sistema de Gestión Veterinaria</h2>
                <p>Administre dueños, mascotas y citas de manera eficiente</p>
            </section>

            <section className="dashboard">
                <Link to="/duenos" className="dashboard-card">
                    <span className="dashboard-card__icon">
                        <FaUserFriends />
                    </span>
                    <h3>Dueños</h3>
                    <p>Gestionar propietarios de mascotas</p>
                </Link>

                <Link to="/mascotas" className="dashboard-card">
                    <span className="dashboard-card__icon">
                        <FaDog />
                    </span>
                    <h3>Mascotas</h3>
                    <p>Gestionar pacientes y sus datos</p>
                </Link>

                <Link to="/citas" className="dashboard-card">
                    <span className="dashboard-card__icon">
                        <FaCalendarAlt />
                    </span>
                    <h3>Citas</h3>
                    <p>Agendar y consultar citas médicas</p>
                </Link>
            </section>
        </>
    );
}

export default HomePage;