import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import Todos from "../../components/Todos/Todos";
import MainImage from "../../components/MainImage/MainImage";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  addEditedTodo,
} from "../../store/todo/todo.slice";
import { auth, todos, user } from "../../store/selectors/selectors";
import "./Main.scss";
import MainProfileImage from "../../components/MainProfileImage/MainProfileImage";
import MainProfileName from "../../components/MainProfileName/MainProfileName";
import MainWeather from "../../components/MainWeather/MainWeather";
export default function Main() {
  const [todoInput, setTodoInput] = useState("");
  const [todoId, setTodoId] = useState("");
  const dispatch = useDispatch();
  const todoList = useSelector(todos);
  const isAuth = useSelector(auth);
  const userData = useSelector(user);
  const submitHandler = (todo) => {
    if (todoId) {
      const example = {
        id: todoId,
        text: todo,
        completed: false,
      };
      dispatch(addEditedTodo(example));
      setTodoInput("");
      setTodoId("");
      return;
    }
    if (todo) {
      const example = {
        id: Date.now(),
        text: todo,
        completed: false,
      };
      dispatch(addTodo(example));
      setTodoInput("");
    }
  };
  const deleteHandler = (id) => {
    dispatch(deleteTodo(id));
  };
  const doneHandler = (id) => {
    dispatch(toggleTodo(id));
  };
  const editHandler = (id, text) => {
    dispatch(editTodo(id));
    setTodoInput(text);
    setTodoId(id);
  };
  return (
    <div className="main">
      <Header isAuth={isAuth} />
      <MainImage />
      <MainProfileImage />
      <MainProfileName name={userData.name} surname={userData.surname} />
      <MainWeather />
      <Todos
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        submitHandler={submitHandler}
        doneHandler={doneHandler}
        deleteHandler={deleteHandler}
        todoList={todoList}
        editHandler={editHandler}
        isAuth={isAuth}
      />
    </div>
  );
}
