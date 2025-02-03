import { FieldError, FieldValues } from "react-hook-form";

type BInputProps = {
    type: "password" | "email" | "text";
    id: string;
    name?: string;
    placeholder?: string;
    label: string;
    errors?: FieldError | undefined
    onChange: (e: any) => void
    value?: string | undefined
    className?: string
}

export const BInput = ({
    type,
    id,
    name,
    placeholder,
    label,
    errors,
    className,
    ...props
}: BInputProps) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                maxLength={100}
                className="border border-gray-300 rounded p-2"
                {...props}
            />
            {
                errors && <span className="text-red-500 text-sm">{errors.message}</span>
            }
        </div>
    );
}
