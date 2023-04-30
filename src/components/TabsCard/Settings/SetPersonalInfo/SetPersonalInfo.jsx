import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { setPersonalInfo } from "../../../../store/user/setPersonalInfoThunk/setPersonalInfo";
export default function SetPersonalInfo() {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({ name: "", surname: "" });
  const loading = useSelector((state) => state.system.loading);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setInfo({ name: "", surname: "" });
      }}
    >
      <input
        className="form-control"
        type="text"
        placeholder="Enter name..."
        onChange={(e) => setInfo({ ...info, name: e.target.value })}
        value={info.name}
      ></input>
      <input
        className="form-control"
        type="text"
        placeholder="Enter surname..."
        onChange={(e) => setInfo({ ...info, surname: e.target.value })}
        value={info.surname}
      ></input>
      <button
        className="btn btn-secondary"
        onClick={() =>
          dispatch(setPersonalInfo({ name: info.name, surname: info.surname }))
        }
      >
        {loading && (
          <Spinner
            animation="border"
            size="sm"
            className="spinner"
            variant="light"
          />
        )}
        Save name
      </button>
    </form>
  );
}
