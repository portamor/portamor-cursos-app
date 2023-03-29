import React, { useState } from "react";

function ModalInscripcion({ show, onClose, onInscribirse }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onInscribirse(nombre, apellido);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
        ❌
        </button>
        <h2>Inscribirme al curso</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              required
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit">Inscribirme</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalInscripcion;
