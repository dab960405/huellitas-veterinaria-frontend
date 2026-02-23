// src/components/mascotas/MascotasPage.jsx
import { useState, useEffect } from 'react';
import { FaDog, FaSearch } from 'react-icons/fa';
import { mascotaService } from '../../services/api';
import MascotaForm from './MascotaForm';
import MascotaList from './MascotaList';

/**
 * Página principal del módulo de Mascotas.
 * Incluye buscador por nombre o documento del dueño.
 */
function MascotasPage() {
    const [mascotas, setMascotas] = useState([]);
    const [mascotaEdit, setMascotaEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMascotas();
    }, []);

    const loadMascotas = async () => {
        try {
            setLoading(true);
            const response = await mascotaService.getAll();
            setMascotas(response.data.data);
        } catch (error) {
            showAlert('Error al cargar las mascotas', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (formData) => {
        try {
            if (mascotaEdit) {
                await mascotaService.update(mascotaEdit.idMascota, formData);
                showAlert('Mascota actualizada exitosamente', 'success');
            } else {
                await mascotaService.create(formData);
                showAlert('Mascota creada exitosamente', 'success');
            }
            setMascotaEdit(null);
            loadMascotas();
        } catch (error) {
            const message = error.response?.data?.error || 'Error al guardar la mascota';
            showAlert(message, 'error');
        }
    };

    const handleEdit = (mascota) => {
        setMascotaEdit(mascota);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        try {
            await mascotaService.delete(id);
            showAlert('Mascota eliminada exitosamente', 'success');
            loadMascotas();
        } catch (error) {
            showAlert('Error al eliminar la mascota', 'error');
        }
    };

    const handleCancel = () => {
        setMascotaEdit(null);
    };

    /** Busca mascotas por nombre o documento del dueño */
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            loadMascotas();
            return;
        }
        try {
            const response = await mascotaService.search(searchTerm);
            setMascotas(response.data.data);
        } catch (error) {
            showAlert('Error en la búsqueda', 'error');
        }
    };

    const showAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 3000);
    };

    return (
        <>
            <h1 className="page-title">
                <FaDog /> Gestión de Mascotas
            </h1>

            {alert && (
                <div className={`alert alert-${alert.type}`}>
                    {alert.type === 'success' ? '✅' : '❌'} {alert.message}
                </div>
            )}

            <MascotaForm
                mascotaEdit={mascotaEdit}
                onSave={handleSave}
                onCancel={handleCancel}
            />

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por nombre de mascota o documento del dueño..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                    <FaSearch /> Buscar
                </button>
                <button className="btn btn-secondary" onClick={() => {
                    setSearchTerm('');
                    loadMascotas();
                }}>
                    Limpiar
                </button>
            </div>

            {loading ? (
                <div className="loading">Cargando mascotas...</div>
            ) : (
                <MascotaList
                    mascotas={mascotas}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
}

export default MascotasPage;