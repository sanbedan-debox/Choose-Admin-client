import React from "react";

interface IconButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  disabled,
  className,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center h-10 px-3 py-2 m-1 text-white text-sm transition-colors duration-300 transform bg-primary rounded-full hover:bg-white hover:text-primary focus:outline-none focus:bg-blue-400 md:w-auto w-10 ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
