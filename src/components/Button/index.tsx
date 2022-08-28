import React, { ButtonHTMLAttributes } from 'react';

interface IButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

const Button: React.FC<IButtonsProps> = ({ className, loading, ...rest }) => {
    return (
        <button
            className={`bg-primary ${
                loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-white hover:text-primary hover:border-primary'
            } text-white px-3 py-2 rounded-md transition border-2 border-transparent ${className}`}
            disabled={loading || rest.disabled}
            {...rest}
        >
            {loading ? 'Carregando...' : rest.children}
        </button>
    );
};

export default Button;
