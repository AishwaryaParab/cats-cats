import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`cursor-pointer bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
