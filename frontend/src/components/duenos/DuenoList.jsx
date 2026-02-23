// src/components/duenos/DuenoList.jsx
import { FaEdit, FaTrash } from 'react-icons/fa';

/**
 * Tabla que muestra la lista de dueños.
 * @param {Array} duenos - Lista de dueños a mostrar.
 * @param {Function} onEdit - Callback al presionar editar.
 * @param {Function} onDelete - Callback al presionar eliminar.
 */
function DuenoList({ duenos, onEdit, onDelete }) {

    /** Confirma y ejecuta la eliminación de un dueño */
    const handleDelete = (id, nombre) => {
        if (window.confirm(`¿Está seguro de eliminar a ${nombre}? Se eliminarán también sus mascotas y citas.`)) {
            onDelete(id);
        }
    };

    if (duenos.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state__icon">👤</div>
                <p>No hay dueños registrados aún</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {duenos.map(dueno => (
                        <tr key={dueno.idDueno}>
                            <td>{dueno.idDueno}</td>
                            <td>{dueno.nombre} {dueno.apellido}</td>
                            <td>{dueno.documento}</td>
                            <td>{dueno.telefono}</td>
                            <td>{dueno.email || '-'}</td>
                            <td>
                                <div className="actions">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => onEdit(dueno)}
                                    >
                                        <FaEdit /> Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(dueno.idDueno, dueno.nombre)}
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

export default DuenoList;