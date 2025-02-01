type BButtonProps = {
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
}

export const BButton = ({ type, children }: BButtonProps) => {
  return (
    <button
      type={type}
      className="bg-secondary text-white p-2 rounded w-full"
    >
      {children}
    </button>
  );
}
