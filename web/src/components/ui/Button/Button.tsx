import React, {MouseEventHandler} from 'react';

// styling
import "./Button.css"

interface ButtonProps {
    variant?: 'primary' | 'outline' | 'text';
    size?: 'sm' | 'md' | 'lg';
    ariaLabel?: string;
    ariaLabelledBy?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    withIcon?: boolean;
    btnClass?: string;
    loading?: boolean;
    name?: string;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({variant = 'primary', size = 'md', ariaLabel = '', ariaLabelledBy = '', disabled = false, btnClass = '', loading = false, name, onClick, children}) => {
    const getClasses = () => {
        const sizeClass = size ? `btn-${size}` : '';
        const variantClass = variant ? `button--${variant}` : '';
        const disabledClass = disabled ? 'btn-disabled' : '';
        const loadingClass = loading ? 'btn-loading' : '';
        const outlineClass = variant.includes('outline') ? 'btn-dashed' : '';

        return `${sizeClass} ${variantClass} ${outlineClass} ${disabledClass} ${loadingClass} ${btnClass}`;
    };

    return (
        <button
            name={name}
            className={`button ${getClasses()}`}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? (
                <span className="w-full flex justify-center">
                    Loading...
                </span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;