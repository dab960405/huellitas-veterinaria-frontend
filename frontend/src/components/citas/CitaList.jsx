// src/components/citas/CitaList.jsx
import { FaEdit, FaTrash } from 'react-icons/fa';

/**
 * Tabla que muestra la lista de citas veterinarias.
 * Incluye badge de colores según el estado de la cita.
 */
function CitaList({ citas, onEdit, onDelete }) {

    /** Confirma y ejecuta la eliminación */
    const handleDelete = (id, motivo) => {
        if (window.confirm(`¿Está seguro de eliminar la cita "${motivo}"?`)) {
            onDelete(id);
        }
    };

    /**
     * Retorna la clase CSS para el badge de estado.
     * @param {string} estado - Estado de la cita.
     * @returns {string} Clase CSS correspondiente.
     */
    const getEstadoBadge = (estado) => {
        switch (estado) {
            case 'PROGRAMADA':
                return 'badge badge-primary';
            case 'COMPLETADA':
                return 'badge badge-success';
            case 'CANCELADA':
                return 'badge badge-danger';
            default:
                return 'badge';
        }
    };

    /**
     * Formatea la fecha para mostrar en formato legible.
     * @param {string} fecha - Fecha en formato YYYY-MM-DD.
     * @returns {string} Fecha formateada (ej: "01/03/2026").
     */
    const formatDate = (fecha) => {
        if (!fecha) return '-';
        const parts = fecha.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    };

    /**
     * Formatea la hora para mostrar sin segundos.
     * @param {string} hora - Hora en formato HH:MM:SS.
     * @returns {string} Hora formateada (ej: "09:00").
     */
    const formatTime = (hora) => {
        if (!hora) return '-';
        return hora.substring(0, 5);
    };

    if (citas.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state__icon">📅</div>
                <p>No hay citas registradas aún</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Mascota</th>
                        <th>Dueño</th>
                        <th>Motivo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {citas.map(cita => (
                        <tr key={cita.idCita}>
                            <td>{cita.idCita}</td>
                            <td>{formatDate(cita.fecha)}</td>
                            <td>{formatTime(cita.hora)}</td>
                            <td>{cita.nombreMascota}</td>
                            <td>{cita.nombreDueno}</td>
                            <td>{cita.motivo}</td>
                            <td>
                                <span className={getEstadoBadge(cita.estado)}>
                                    {cita.estado}
                                </span>
                            </td>
                            <td>
                                <div className="actions">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => onEdit(cita)}
                                    >
                                        <FaEdit /> Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(cita.idCita, cita.motivo)}
                                    >
                                        <FaTrash /> Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CitaList;