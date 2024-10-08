// import { fadeIn } from "@/util/utils";
// import { AnimatePresence, motion } from "framer-motion";
// import React, { useEffect } from "react";
// import ReactDOM from "react-dom";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   width?: "xs" | "sm" | "md" | "ml" | "lg" | "xl";
//   title: string;
//   comments?: string;
// }

// const ReusableModal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   children,
//   width = "md",
//   title,
//   comments,
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

//   const widthClasses = {
//     xs: "w-1/5",
//     sm: "w-1/4",
//     md: "w-1/3",
//     ml: "w-1/2",
//     lg: "w-3/4",
//     xl: "w-full",
//   };

//   return ReactDOM.createPortal(
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             variants={fadeIn("up", "tween", 0, 0.3)}
//             initial="hidden"
//             animate="show"
//             exit="hidden"
//             className={`rounded shadow-lg bg-white ${widthClasses[width]} z-10`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="py-5 px-6">
//               <div className="flex items-start justify-between py-2 rounded-t">
//                 <div className="flex items-center space-x-4">
//                   <h2 className="text-2xl font-bold text-black">{title}</h2>
//                 </div>
//                 <button
//                   type="button"
//                   className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-primary dark:hover:text-white"
//                   onClick={onClose}
//                 >
//                   <svg
//                     className="w-3 h-3"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 14 14"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                     />
//                   </svg>
//                   <span className="sr-only">Close modal</span>
//                 </button>
//               </div>
//               {comments && <p className="text-gray-500 mb-4">{comments}</p>}
//               {children}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>,
//     document.body
//   );
// };

// export default ReusableModal;

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { fadeIn } from "@/util/utils";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: "xs" | "sm" | "md" | "ml" | "lg" | "xl" | "dxl";
  title: string;
  comments?: string;
}

const ReusableModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  width = "md",
  title,
  comments,
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

  const widthClasses = {
    xs: "w-11/12 lg:w-1/5",
    sm: "w-11/12 lg:w-1/4 ",
    md: "w-11/12 lg:w-1/3 ",
    ml: "w-11/12 lg:w-1/2 ",
    lg: "w-11/12 lg:w-3/4 ",
    xl: "w-11/12 lg:w-[95vw] ",
    dxl: "w-11/12 lg:w-11/12",
  };

  if (!isOpen) return;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay fixed inset-0 bg-black bg-opacity-45 flex items-center justify-center z-50"
        >
          <motion.div
            variants={fadeIn("up", "tween", 0, 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className={`rounded shadow-lg bg-white ${widthClasses[width]}  max-h-[100vh] overflow-auto z-10`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-5 px-6">
              <div className="flex items-start justify-between py-2 rounded-t">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-black">{title}</h2>
                </div>
                <button
                  type="button"
                  className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-primary dark:hover:text-white"
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
              {comments && (
                <p
                  className="text-gray-700
           mb-4"
                >
                  {comments}
                </p>
              )}
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ReusableModal;
