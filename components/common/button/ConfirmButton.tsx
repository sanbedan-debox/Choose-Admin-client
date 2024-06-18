import React from "react";

interface ConfirmButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  onClick,
  disabled,
  className,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center h-10 px-4 py-2 m-1 text-white text-sm bg-green-500 rounded-full transition-colors duration-300 transform hover:bg-green-600 focus:outline-none focus:bg-green-400 md:w-auto w-32 ${className}`}
    >
      {children}
    </button>
  );
};

export default ConfirmButton;
