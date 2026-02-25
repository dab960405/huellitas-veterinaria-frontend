// src/components/duenos/DuenoForm.jsx
import { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

/**
 * Formulario para crear y editar dueños.
 * @param {Object} duenoEdit - Dueño a editar (null si es nuevo).
 * @param {Function} onSave - Callback al guardar exitosamente.
 * @param {Function} onCancel - Callback al cancelar la edición.
 */
function DuenoForm({ duenoEdit, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        documento: '',
        telefono: '',
        email: '',
        direccion: ''
    });

    /** Carga los datos del dueño cuando se va a editar */
    useEffect(() => {
        if (duenoEdit) {
            setFormData({
                nombre: duenoEdit.nombre || '',
                apellido: duenoEdit.apellido || '',
                documento: duenoEdit.documento || '',
                telefono: duenoEdit.telefono || '',
                email: duenoEdit.email || '',
                direccion: duenoEdit.direccion || ''
            });
        }
    }, [duenoEdit]);

    /** Maneja los cambios en los inputs del formulario */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /** Maneja el envío del formulario */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación: no permitir campos vacíos obligatorios
        if (!formData.nombre.trim() || !formData.apellido.trim() ||
            !formData.documento.trim() || !formData.telefono.trim()) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }

        onSave(formData);
        resetForm();
    };

    /** Limpia el formulario */
    const resetForm = () => {
        setFormData({
            nombre: '',
            apellido: '',
            documento: '',
            telefono: '',
            email: '',
            direccion: ''
        });
    };

    /** Cancela la edición y limpia el formulario */
    const handleCancel = () => {
        resetForm();
        onCancel();
    };

    return (
        <div className="form-container">
            <h3>{duenoEdit ? '✏️ Editar Dueño' : '➕ Registrar Nuevo Dueño'}</h3>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Nombre <span className="required">*</span></label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ej: Carlos"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Apellido <span className="required">*</span></label>
                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            placeholder="Ej: García"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Documento <span className="required">*</span></label>
                        <input
                            type="text"
                            name="documento"
                            value={formData.documento}
                            onChange={handleChange}
                            placeholder="Ej: 1001234567"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Teléfono <span className="required">*</span></label>
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="Ej: 3001234567"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Ej: correo@email.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            placeholder="Ej: Calle 10 #20-30"
                        />
                    </div>
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn btn-success">
                        <FaSave /> {duenoEdit ? 'Actualizar' : 'Guardar'}
                    </button>
                    {duenoEdit && (
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                            <FaTimes /> Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default DuenoForm;