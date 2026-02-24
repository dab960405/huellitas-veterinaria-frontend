// src/components/citas/CitasPage.jsx
import { useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { citaService } from '../../services/api';
import CitaForm from './CitaForm';
import CitaList from './CitaList';

/**
 * Página principal del módulo de Citas.
 * Permite agendar, editar, eliminar y consultar citas veterinarias.
 */
function CitasPage() {
    const [citas, setCitas] = useState([]);
    const [citaEdit, setCitaEdit] = useState(null);
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);

    /** Carga todas las citas al montar el componente */
    useEffect(() => {
        loadCitas();
    }, []);

    /** Obtiene la lista de citas desde la API */
    const loadCitas = async () => {
        try {
            setLoading(true);
            const response = await citaService.getAll();
            setCitas(response.data.data);
        } catch (error) {
            showAlert('Error al cargar las citas', 'error');
        } finally {
            setLoading(false);
        }
    };

    /** Guarda una cita (crear o actualizar) */
    const handleSave = async (formData) => {
        try {
            if (citaEdit) {
                await citaService.update(citaEdit.idCita, formData);
                showAlert('Cita actualizada exitosamente', 'success');
            } else {
                await citaService.create(formData);
                showAlert('Cita agendada exitosamente', 'success');
            }
            setCitaEdit(null);
            loadCitas();
        } catch (error) {
            const message = error.response?.data?.error || 'Error al guardar la cita';
            showAlert(message, 'error');
        }
    };

    /** Prepara una cita para edición */
    const handleEdit = (cita) => {
        setCitaEdit(cita);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /** Elimina una cita */
    const handleDelete = async (id) => {
        try {
            await citaService.delete(id);
            showAlert('Cita eliminada exitosamente', 'success');
            loadCitas();
        } catch (error) {
            showAlert('Error al eliminar la cita', 'error');
        }
    };

    /** Cancela la edición */
    const handleCancel = () => {
        setCitaEdit(null);
    };

    /** Muestra una alerta temporal de 3 segundos */
    const showAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 3000);
    };

    return (
        <>
            <h1 className="page-title">
                <FaCalendarAlt /> Gestión de Citas
            </h1>

            {/* Alertas */}
            {alert && (
                <div className={`alert alert-${alert.type}`}>
                    {alert.type === 'success' ? '✅' : '❌'} {alert.message}
                </div>
            )}

            {/* Formulario */}
            <CitaForm
                citaEdit={citaEdit}
                onSave={handleSave}
                onCancel={handleCancel}
            />

            {/* Tabla de citas */}
            {loading ? (
                <div className="loading">Cargando citas...</div>
            ) : (
                <CitaList
                    citas={citas}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
}

export default CitasPage;