import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-55 bg-black/50 flex items-center justify-center px-4">
      <div className="relative bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl w-full max-w-xl max-h-[93vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white hover:bg-red-700 rounded-full flex items-center justify-center text-base font-bold"
          aria-label="Close modal"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
