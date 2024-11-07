import React from 'react';
import './modal.css'; // Asegúrate de agregar los estilos para el modal

function Modal({ showModal, onClose, children }) {
  if (!showModal) return null; // Si el modal no debe mostrarse, no lo renderizamos

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;