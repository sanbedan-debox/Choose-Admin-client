// import React, { useEffect } from "react";
// import ReactDOM from "react-dom";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   width?: "sm" | "md" | "lg";
// }

// const ReusableModal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   children,
//   width = "md",
// }) => {
//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       if ((event.target as Element).classList.contains("modal-overlay")) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("click", handleOutsideClick);
//     } else {
//       document.removeEventListener("click", handleOutsideClick);
//     }

//     return () => document.removeEventListener("click", handleOutsideClick);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const widthClasses = {
//     sm: "w-1/4",
//     md: "w-1/2",
//     lg: "w-3/4",
//   };

//   return ReactDOM.createPortal(
//     <div className="modal-overlay fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//       <div
//         style={{
//           background: "rgb(4,7,29)",
//           backgroundColor:
//             "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
//         }}
//         className={`rounded shadow-lg ${widthClasses[width]} z-10`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="bg-dot-white/[0.12] md:bg-dot-white/[0.15] p-6">
//           {children}
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default ReusableModal;

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
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        style={{
          background: "rgb(4,7,29)",
          backgroundColor:
            "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
        }}
        className={`rounded shadow-lg ${widthClasses[width]} z-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-4 py-2 rounded-t dark:border-gray-600">
          <div className="flex items-center space-x-4"></div>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="bg-dot-white/[0.12] md:bg-dot-white/[0.15] p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ReusableModal;
