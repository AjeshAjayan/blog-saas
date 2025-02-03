type BButtonProps = {
	children: React.ReactNode;
	type: "submit" | "reset" | "button";
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
}

export const BButton = ({ type, children, disabled, onClick, className }: BButtonProps) => {
	return (
		<button
			type={type}
			className={
				`
					bg-secondary 
					text-white 
					p-2 
					rounded 
					w-full 
					${className}
        `
			}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
