import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { saveTodos } from "../../../store/todo/saveThunk/saveThunk";
import { useDispatch, useSelector } from "react-redux";
export default function SaveButton() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  return (
    <OverlayTrigger
      key="top"
      placement="bottom"
      overlay={
        <Tooltip>
          Please note that the button <strong>overwrites</strong> the tasks that
          were previously saved with the current ones. The next time you log in,{" "}
          <strong>the current</strong> progress will be displayed.
        </Tooltip>
      }
    >
      <Button
        className="px-5"
        style={{ margin: "0.75rem" }}
        variant="dark"
        onClick={() => {
          dispatch(saveTodos(todos));
        }}
      >
        Save
      </Button>
    </OverlayTrigger>
  );
}
