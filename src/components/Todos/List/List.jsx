import EditButton from "./EditButton/EditButton";
import { dateFormatter } from "../../../helpers/dateFormat/dateFormatter";
import "./List.scss";
import { motion } from "framer-motion";
export default function List({
  deleteHandler,
  doneHandler,
  todoList,
  editHandler,
}) {
  return (
    <div className="todos-list">
      <div className="todo-list__container">
        <div className="todo-list__heading">Tasks</div>
        <ul className="todo-list__list">
          <span></span>
          <li className="todo-list__item">Loh</li>
        </ul>
      </div>
    </div>
  );
}
