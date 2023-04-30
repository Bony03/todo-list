import { Link } from "react-router-dom";

export default function MenuLink({ children, path, onClick, className, img }) {
  return (
    <Link
      className={className ? `link__button ${className}` : "link__button"}
      to={path}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
