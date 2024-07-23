const Button = ({ label, styles, icon, type, onClick }) => {
  return (
    <button onClick={onClick} type={type || "button"} className={` ${styles}`}>
      {icon && <div className="ml-2 ">{icon}</div>}
      {label}
    </button>
  );
};

export default Button;
