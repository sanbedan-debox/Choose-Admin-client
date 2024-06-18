import React from "react";

interface TextButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const TextButton: React.FC<TextButtonProps> = ({
  onClick,
  disabled,
  className,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-primary text-sm transition-colors duration-300 transform hover:text-blue-600 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export default TextButton;
