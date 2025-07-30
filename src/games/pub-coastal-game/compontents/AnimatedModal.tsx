import React, { Children } from "react";

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

const AnimatedModal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(0,0,0,0.7)]">
      <div className="rounded-lg shadow-lg p-6 relative">
        {children}
      </div>
    </div>
  );
};

export default AnimatedModal;