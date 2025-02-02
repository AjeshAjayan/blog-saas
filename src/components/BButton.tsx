type BButtonProps = {
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  disabled?: boolean;
}

export const BButton = ({ type, children, disabled }: BButtonProps) => {
  return (
    <button
      type={type}
      className="bg-secondary text-white p-2 rounded w-full"
      disabled={disabled}
    >
      {children}
    </button>
  );
}
