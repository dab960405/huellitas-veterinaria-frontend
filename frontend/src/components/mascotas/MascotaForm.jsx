// src/components/mascotas/MascotaForm.jsx
import { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import { duenoService } from '../../services/api';

/**
 * Formulario para crear y editar mascotas.
 * Carga dinámicamente la lista de dueños para el select.
 */
function MascotaForm({ mascotaEdit, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        nombre: '',
        especie: '',
        raza: '',
        fechaNacimiento: '',
        idDueno: ''
    });
    const [duenos, setDuenos] = useState([]);

    /** Carga la lista de dueños para el select */
    useEffect(() => {
        loadDuenos();
    }, []);

    /** Carga los datos de la mascota cuando se va a editar */
    useEffect(() => {
        if (mascotaEdit) {
            setFormData({
                nombre: mascotaEdit.nombre || '',
                especie: mascotaEdit.especie || '',
                raza: mascotaEdit.raza || '',
                fechaNacimiento: mascotaEdit.fechaNacimiento || '',
                idDueno: mascotaEdit.idDueno || ''
            });
        }
    }, [mascotaEdit]);

    /** Obtiene los dueños desde la API */
    const loadDuenos = async () => {
        try {
            const response = await duenoService.getAll();
            setDuenos(response.data.data);
        } catch (error) {
            console.error('Error al cargar dueños:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nombre.trim() || !formData.especie.trim() ||
            !formData.raza.trim() || !formData.fechaNacimiento || !formData.idDueno) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }

        // Enviar con idDueno como número
        const dataToSend = {
            ...formData,
            idDueno: parseInt(formData.idDueno)
        };

        onSave(dataToSend);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            especie: '',
            raza: '',
            fechaNacimiento: '',
            idDueno: ''
        });
    };

    const handleCancel = () => {
        resetForm();
        onCancel();
    };

    return (
        <div className="form-container">
            <h3>{mascotaEdit ? '✏️ Editar Mascota' : '➕ Registrar Nueva Mascota'}</h3>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Nombre <span className="required">*</span></label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ej: Firulais"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Especie <span className="required">*</span></label>
                        <select
                            name="especie"
                            value={formData.especie}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>
                            <option value="Perro">Perro</option>
                            <option value="Gato">Gato</option>
                            <option value="Ave">Ave</option>
                            <option value="Conejo">Conejo</option>
                            <option value="Hamster">Hámster</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Raza <span className="required">*</span></label>
                        <input
                            type="text"
                            name="raza"
                            value={formData.raza}
                            onChange={handleChange}
                            placeholder="Ej: Labrador"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha de Nacimiento <span className="required">*</span></label>
                        <input
                            type="date"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            max={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Dueño <span className="required">*</span></label>
                        <select
                            name="idDueno"
                            value={formData.idDueno}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un dueño...</option>
                            {duenos.map(dueno => (
                                <option key={dueno.idDueno} value={dueno.idDueno}>
                                    {dueno.nombre} {dueno.apellido} - {dueno.documento}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn btn-success">
                        <FaSave /> {mascotaEdit ? 'Actualizar' : 'Guardar'}
                    </button>
                    {mascotaEdit && (
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                            <FaTimes /> Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default MascotaForm;