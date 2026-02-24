// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/home/HomePage';
import DuenosPage from './components/duenos/DuenosPage';
import MascotasPage from './components/mascotas/MascotasPage';
import CitasPage from './components/citas/CitasPage';

/**
 * Componente principal de la aplicación.
 * Define todas las rutas del sistema usando React Router.
 */
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="duenos" element={<DuenosPage />} />
                    <Route path="mascotas" element={<MascotasPage />} />
                    <Route path="citas" element={<CitasPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;