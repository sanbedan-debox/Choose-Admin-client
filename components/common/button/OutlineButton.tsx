import React from "react";

interface OutlinedButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  onClick,
  disabled,
  className,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center h-10 px-4 py-2 m-1 text-white text-sm border border-primary rounded-full transition-colors duration-300 transform hover:bg-primary hover:text-white focus:outline-none focus:bg-blue-400 md:w-auto w-32 ${className}`}
    >
      {children}
    </button>
  );
};

export default OutlinedButton;
