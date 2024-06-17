import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: "sm" | "md" | "lg";
}

const ReusableModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  width = "md",
}) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if ((event.target as Element).classList.contains("modal-overlay")) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: "w-1/4",
    md: "w-1/2",
    lg: "w-3/4",
  };

  return ReactDOM.createPortal(
    <div
      className="modal-overlay fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        style={{
          background: "rgb(4,7,29)",
          backgroundColor:
            "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
        }}
        className={`rounded shadow-lg ${widthClasses[width]} w-full z-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-dot-white/[0.12] md:bg-dot-white/[0.15] p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ReusableModal;
