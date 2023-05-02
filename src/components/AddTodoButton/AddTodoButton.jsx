import React from "react";
import Button from "../Button/Button";
import "./AddTodoButton.scss";
export default function AddTodoButton({ setAddTodo }) {
  return (
    <Button
      text="Add Todo"
      onClick={() => {
        setAddTodo(true);
      }}
      className="add-todo__button"
    />
  );
}
