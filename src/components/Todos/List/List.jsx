import React from "react";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
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
    <Container fluid="md">
      <div className="todos-list">
        <div className="todos-list__heading">To Do!</div>
        <ul className="todos-list__list">
          {todoList.map((todo) => (
            <motion.li
              className={
                todo.completed
                  ? "todos-list__item completed"
                  : "todos-list__item"
              }
              key={todo.id}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {todo.text}
              {todo.edit && (
                <span className="edited__todo">
                  Edited: {dateFormatter(todo.edit)}
                </span>
              )}
              <Dropdown
                style={{ display: "flex", flexDirection: "row-reverse" }}
              >
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                ></Dropdown.Toggle>
                <EditButton
                  id={todo.id}
                  editHandler={editHandler}
                  text={todo.text}
                />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => deleteHandler(todo.id)}>
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => doneHandler(todo.id)}>
                    {todo.completed ? "Ongoing" : "Done"}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </motion.li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
