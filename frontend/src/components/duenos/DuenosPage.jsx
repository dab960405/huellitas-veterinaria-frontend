// src/components/duenos/DuenosPage.jsx
import { useState, useEffect } from 'react';
import { FaUserFriends, FaSearch } from 'react-icons/fa';
import { duenoService } from '../../services/api';
import DuenoForm from './DuenoForm';
import DuenoList from './DuenoList';

/**
 * Página principal del módulo de Dueños.
 * Contiene el formulario, buscador y tabla.
 */
function DuenosPage() {
    const [duenos, setDuenos] = useState([]);
    const [duenoEdit, setDuenoEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);

    /** Carga todos los dueños al montar el componente */
    useEffect(() => {
        loadDuenos();
    }, []);

    /** Obtiene la lista de dueños desde la API */
    const loadDuenos = async () => {
        try {
            setLoading(true);
            const response = await duenoService.getAll();
            setDuenos(response.data.data);
        } catch (error) {
            showAlert('Error al cargar los dueños', 'error');
        } finally {
            setLoading(false);
        }
    };

    /** Guarda un dueño (crear o actualizar) */
    const handleSave = async (formData) => {
        try {
            if (duenoEdit) {
                await duenoService.update(duenoEdit.idDueno, formData);
                showAlert('Dueño actualizado exitosamente', 'success');
            } else {
                await duenoService.create(formData);
                showAlert('Dueño creado exitosamente', 'success');
            }
            setDuenoEdit(null);
            loadDuenos();
        } catch (error) {
            const message = error.response?.data?.error || 'Error al guardar el dueño';
            showAlert(message, 'error');
        }
    };

    /** Prepara un dueño para edición */
    const handleEdit = (dueno) => {
        setDuenoEdit(dueno);
        // Scroll al formulario
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /** Elimina un dueño */
    const handleDelete = async (id) => {
        try {
            await duenoService.delete(id);
            showAlert('Dueño eliminado exitosamente', 'success');
            loadDuenos();
        } catch (error) {
            showAlert('Error al eliminar el dueño', 'error');
        }
    };

    /** Cancela la edición */
    const handleCancel = () => {
        setDuenoEdit(null);
    };

    /** Busca dueños por término */
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            loadDuenos();
            return;
        }
        try {
            const response = await duenoService.search(searchTerm);
            setDuenos(response.data.data);
        } catch (error) {
            showAlert('Error en la búsqueda', 'error');
        }
    };

    /** Muestra una alerta temporal */
    const showAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 3000);
    };

    return (
        <>
            <h1 className="page-title">
                <FaUserFriends /> Gestión de Dueños
            </h1>

            {/* Alertas */}
            {alert && (
                <div className={`alert alert-${alert.type}`}>
                    {alert.type === 'success' ? '✅' : '❌'} {alert.message}
                </div>
            )}

            {/* Formulario */}
            <DuenoForm
                duenoEdit={duenoEdit}
                onSave={handleSave}
                onCancel={handleCancel}
            />

            {/* Buscador */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por nombre, apellido o documento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                    <FaSearch /> Buscar
                </button>
                <button className="btn btn-secondary" onClick={() => {
                    setSearchTerm('');
                    loadDuenos();
                }}>
                    Limpiar
                </button>
            </div>

            {/* Tabla */}
            {loading ? (
                <div className="loading">Cargando dueños...</div>
            ) : (
                <DuenoList
                    duenos={duenos}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
}

export default DuenosPage;