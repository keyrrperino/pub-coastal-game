import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(0,0,0,0.7)]">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        {onClose && <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>}
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;