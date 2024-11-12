import React from 'react';
import './modal.css'; // Asegúrate de que este archivo esté importado

function ModalSucursal({ showModal, onClose, children }) {
  if (!showModal) return null; // Si el modal no debe mostrarse, no lo renderizamos

  return (
    <div className="modal" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal cierre el modal
      >
        {/* Cruz de cierre en la esquina superior derecha */}
        <button className="close-btn" onClick={onClose}>X</button>
        
        {/* Aquí se muestra el contenido que se pasa como 'children' */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalSucursal;