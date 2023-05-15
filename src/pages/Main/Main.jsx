import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import MainImage from "../../components/MainImage/MainImage";
import { auth, user } from "../../store/selectors/selectors";
import MainProfileImage from "../../components/MainProfileImage/MainProfileImage";
import MainProfileName from "../../components/MainProfileName/MainProfileName";
import MainWeather from "../../components/MainWeather/MainWeather";
import AddToDo from "../../components/Todos/AddToDo/AddToDo";
import MainButtons from "../../components/MainButtons/MainButtons";
import MainList from "../../components/MainList/MainList";
import { categories } from "../../store/selectors/selectors";
import "./Main.scss";
export default function Main() {
  const [todoInput, setTodoInput] = useState("");
  const isAuth = useSelector(auth);
  const userData = useSelector(user);
  const [openAddTodo, setOpenAddTodo] = useState(false);
  const [todosList, setTodosList] = useState([]);
  const categoriesArray = useSelector(categories);
  useEffect(() => {
    if (categoriesArray[0]) {
      const newArray = [];
      categoriesArray.forEach((element) => {
        element.todos.forEach((todo) => newArray.push(todo));
      });
      newArray.sort((a, b) => a.date - b.date);
      setTodosList(newArray);
    }
  }, [categoriesArray]);
  return (
    <div className="main">
      <Header isAuth={isAuth} />
      <MainImage />
      <MainProfileImage />
      <MainProfileName name={userData.name} surname={userData.surname} />
      <MainWeather />
      <MainButtons
        setOpenAddTodo={setOpenAddTodo}
        categoriesArray={categoriesArray}
        setTodosList={setTodosList}
        todosList={todosList}
      />
      {openAddTodo && (
        <AddToDo
          todoInput={todoInput}
          setTodoInput={setTodoInput}
          setOpenAddTodo={setOpenAddTodo}
          categoriesArray={categoriesArray}
        />
      )}
      <MainList todosList={todosList} />
    </div>
  );
}
