import React from 'react';
import './modal.css'; 

function ModalSucursal({ showModal, onClose, children }) {
  if (!showModal) return null; // Si el modal no debe mostrarse, no lo renderizamos

  return (
    <div className="modal">
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal cierre el modal
      >
        {/* Cruz de cierre en la esquina superior derecha */}
        <button id="close-modal-btn" className="close-btn" onClick={onClose}>x</button>
        
        {/* Contenido del modal */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalSucursal;