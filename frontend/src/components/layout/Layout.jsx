// src/components/layout/Layout.jsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout principal que envuelve todas las páginas.
 * Usa Outlet de React Router para renderizar las rutas hijas.
 */
function Layout() {
    return (
        <>
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout;