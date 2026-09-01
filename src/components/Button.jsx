import "./Button.css";

function Button({ label, onClick, variant = "primary", disabled = false }) {
  return (
    <button
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {label}
    </button>
  );
}

export default Button;