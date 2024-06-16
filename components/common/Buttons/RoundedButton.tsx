import React from "react";

interface RoundedButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  onClick,
  disabled,
  className,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-primary rounded-full hover:bg-white hover:text-primary focus:outline-none focus:bg-blue-400 md:w-auto w-32 ${className}`}
    >
      {children}
    </button>
  );
};

export default RoundedButton;
