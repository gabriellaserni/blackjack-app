function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false
}) {
  const baseClasses =
    "rounded-[var(--radius)] px-[1.4rem] py-[0.7rem] text-[0.95rem] font-semibold cursor-pointer transition-transform duration-150 ease-in-out hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 max-sm:px-4 max-sm:py-2 max-sm:text-[0.85rem]";

  const variantClasses = {
    primary:
      "bg-[var(--color-accent)] text-[var(--color-table-bg)]",

    secondary:
      "bg-transparent text-[var(--color-text)] border-2 border-[var(--color-secondary)]",

    accent:
      "bg-[var(--color-accent)] text-[var(--color-table-bg)]",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}

export default Button;