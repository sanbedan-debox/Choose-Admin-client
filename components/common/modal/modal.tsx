import React from "react";
import useGlobalStore from "@/store/global";

const Modal: React.FC = () => {
  const { isModalOpen, setModalOpen, modalData } = useGlobalStore((state) => ({
    isModalOpen: state.isModalOpen,
    setModalOpen: state.setModalOpen,
    modalData: state.modalData,
  }));

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  if (!isModalOpen || !modalData) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      <div
        style={{
          background: "rgb(4,7,29)",
          backgroundColor:
            "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
        }}
        className="rounded shadow-lg max-w-md w-full z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-dot-white/[0.12] md:bg-dot-white/[0.15] p-6">
          <h2 className="text-xl mb-4 text-white">{modalData.title}</h2>
          {modalData.inputs.map((input, index) => (
            <div key={index} className="mb-4">
              <label className="block text-white">{input.label}</label>
              <input
                type={input.type}
                placeholder={input.placeholder}
                className="bg-secondary bg-opacity-30 text-sm rounded-lg w-full focus:outline-none block p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          ))}
          <div className="flex justify-end mt-4">
            {modalData.buttons.map((button, index) => (
              <button
                key={index}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={button.onClick}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
