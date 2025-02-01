type BInputProps = {
    type: "password" | "email" | "text";
    id: string;
    name: string;
    placeholder: string;
    label: string;
}

export const BInput = ({
    type,
    id,
    name,
    placeholder,
    label,
}: BInputProps) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                className="border border-gray-300 rounded p-2"
            />
        </div>
    );
}
