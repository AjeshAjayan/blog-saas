type BSuccessTextProps = {
    children: React.ReactNode;
    className?: string
}


export const BSuccessText = ({ children, className }: BSuccessTextProps) => {
    return (
        <p className={
            `
                text-sm 
                text-gray-500 
                italic 
                transition-opacity 
                duration-500
                flex 
                gap-1 
                items-center 
                ${className}
            `
        }
        >
            { children }
            <svg
                className="w-6 h-6 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                />
            </svg>

        </p>
    )
}
