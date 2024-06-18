import React from "react";

interface WarningButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const WarningButton: React.FC<WarningButtonProps> = ({
  onClick,
  disabled,
  className,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center h-10 px-4 py-2 m-1 text-white text-sm bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:bg-red-600 md:w-auto w-32 ${className}`}
    >
      {children}
    </button>
  );
};

export default WarningButton;
