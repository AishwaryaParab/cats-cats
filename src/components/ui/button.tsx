import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

const Button = ({ children, onClick, className, ariaLabel }: ButtonProps) => {
  return (
    <button
      className={`cursor-pointer bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
