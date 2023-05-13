import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import MainImage from "../../components/MainImage/MainImage";
import Button from "../../components/Button/Button";
import { deleteTodo, toggleTodo, editTodo } from "../../store/todo/todo.slice";
import { auth, user } from "../../store/selectors/selectors";
import "./Main.scss";
import MainProfileImage from "../../components/MainProfileImage/MainProfileImage";
import MainProfileName from "../../components/MainProfileName/MainProfileName";
import MainWeather from "../../components/MainWeather/MainWeather";
import AddToDo from "../../components/Todos/AddToDo/AddToDo";
import MainButtons from "../../components/MainButtons/MainButtons";
import MainList from "../../components/MainList/MainList";
export default function Main() {
  const [todoInput, setTodoInput] = useState("");
  const dispatch = useDispatch();
  const isAuth = useSelector(auth);
  const userData = useSelector(user);
  const [openAddTodo, setOpenAddTodo] = useState(false);
  const [todosList, setTodosList] = useState([]);
  const categoryList = useSelector((state) => state.todo);
  useEffect(() => {
    if (categoryList[0]) {
      setTodosList(categoryList[0].todos);
    }
  }, [categoryList, todosList]);
  return (
    <div className="main">
      <Header isAuth={isAuth} />
      <MainImage />
      <MainProfileImage />
      <MainProfileName name={userData.name} surname={userData.surname} />
      <MainWeather />
      <MainButtons setOpenAddTodo={setOpenAddTodo} />
      {openAddTodo && (
        <AddToDo
          todoInput={todoInput}
          setTodoInput={setTodoInput}
          setOpenAddTodo={setOpenAddTodo}
        />
      )}
      <MainList todosList={todosList} />
    </div>
  );
}
