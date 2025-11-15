import React, { useEffect, useState } from "react";
import "./Input.css"
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: "text" | "email" | "password" | "url" | "number" | "date";
    placeholder?: string;
    inputClasses?: string;
    readonly?: boolean;
    preValue?: string | number;
}

const TextInput: React.FC<TextInputProps> = ({type = "text", placeholder, inputClasses = "", readonly = false, preValue = "", ...rest}) => {
    const [value, setValue] = useState<string | number>(preValue);

    useEffect(() => {
        setValue(preValue);
    }, [preValue]);

    return (
        <input
            className={`field__input ${inputClasses}`}
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            readOnly={readonly}
            {...rest}
        />
    );
};

export default TextInput;