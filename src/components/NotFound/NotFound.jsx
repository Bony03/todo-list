import Header from "../Header/Header";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Header />

      <div>
        <h5>
          Page not Found <Link>Home</Link>
        </h5>
      </div>
    </>
  );
}
