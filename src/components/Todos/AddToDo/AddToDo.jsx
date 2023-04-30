import React from "react";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FloatInput from "../../FloatInput/FloatInput";

export default function AddToDo(props) {
  const { submitHandler, todoInput, setTodoInput } = props;
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler(todoInput);
        }}
      >
        <FloatInput
          onChange={(e) => setTodoInput(e.target.value)}
          value={todoInput}
          label="Enter task"
        />

        <Button
          style={{ padding: "10px 20px" }}
          onClick={() => submitHandler(todoInput)}
        >
          Add
        </Button>
      </form>
    </>
  );
}
