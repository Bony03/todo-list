import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  auth,
  user,
  categories,
  todosSc,
  todosEr,
} from "../../store/selectors/selectors";
import { saveTodos } from "../../store/todo/saveThunk/saveThunk";
import Header from "../../components/CompHeader/Header";
import MainImage from "../../components/MainImage/MainImage";
import MainProfileImage from "../../components/MainProfileImage/MainProfileImage";
import MainProfileName from "../../components/MainProfileName/MainProfileName";
import MainWeather from "../../components/MainWeather/MainWeather";
import MainAddToDo from "../../components/MainAddToDo/MainAddToDo";
import MainButtons from "../../components/MainButtons/MainButtons";
import MainList from "../../components/MainList/MainList";
import {
  deleteTodo,
  toggleTodo,
  addCategory,
  setCategoryName,
  addTodo,
} from "../../store/todo/todo.slice";
import Success from "../../components/CompSuccess/Success";
import { clearAllNotifications } from "../../store/system/system.slice";
import Error from "../../components/CompError/Error";
export default function Main() {
  const dispatch = useDispatch();
  const [todayMonth, today] = Date().split(" ").slice(1, 3);
  const [todoInput, setTodoInput] = useState("");
  const [addErrorMessage, setAddErrorMessage] = useState("");
  const [todosList, setTodosList] = useState([]);
  const [openAddTodo, setOpenAddTodo] = useState(false);

  const isAuth = useSelector(auth);
  const userData = useSelector(user);
  const todosSuccess = useSelector(todosSc);
  const todosError = useSelector(todosEr);
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
  function saveTodosHandler(todos) {
    dispatch(saveTodos(todos));
  }
  function deleteHandler(id, categoryId) {
    dispatch(deleteTodo({ id, categoryId }));
  }
  function toggleHandler(id, categoryId) {
    dispatch(toggleTodo({ id, categoryId }));
  }
  function addCategoryHandler() {
    dispatch(addCategory());
  }
  function setCategoryNameHandler(id, name) {
    dispatch(setCategoryName({ id, name }));
  }
  const [choosed, setChoosed] = useState({
    day: today,
    month: todayMonth,
    hour: 10,
    minutes: 30,
    category: "",
  });

  function addHandler(name, category) {
    if (!name) {
      setAddErrorMessage("Please enter task name");
      return;
    }
    if (!category) {
      setAddErrorMessage("Please choose the category");
      return;
    }
    const task = {
      id: Date.now(),
      name: name,
      categoryId: category.id,
      date: Date.parse(
        new Date(
          `${choosed.month} ${choosed.day}, 2023 ${choosed.hour}:${choosed.minutes}`
        )
      ),
      categoryName: category.name,
    };
    dispatch(addTodo(task));
    setOpenAddTodo(false);
    setTodoInput("");
  }
  function closeErrorHandler() {
    dispatch(clearAllNotifications());
  }
  return (
    <>
      <Header isAuth={isAuth} />
      <MainImage />
      <MainProfileImage />
      <MainProfileName name={userData.name} />
      <MainWeather />
      <MainButtons
        isAuth={isAuth}
        setOpenAddTodo={setOpenAddTodo}
        categoriesArray={categoriesArray}
        setTodosList={setTodosList}
        todosList={todosList}
        saveTodosHandler={saveTodosHandler}
      />
      <div className="notifications">
        <div className="notifications__container">
          {todosSuccess && (
            <Success
              text={todosSuccess}
              closeError={() => {
                closeErrorHandler();
              }}
            />
          )}
          {todosError && (
            <Error
              text={todosError}
              closeError={() => {
                closeErrorHandler();
              }}
            />
          )}
        </div>
      </div>

      {openAddTodo && (
        <MainAddToDo
          todoInput={todoInput}
          setTodoInput={setTodoInput}
          setOpenAddTodo={setOpenAddTodo}
          categoriesArray={categoriesArray}
          addCategoryHandler={addCategoryHandler}
          setCategoryNameHandler={setCategoryNameHandler}
          choosed={choosed}
          setChoosed={setChoosed}
          addErrorMessage={addErrorMessage}
          addHandler={addHandler}
          setAddErrorMessage={setAddErrorMessage}
        />
      )}
      <MainList
        todosList={todosList}
        deleteHandler={deleteHandler}
        toggleHandler={toggleHandler}
      />
    </>
  );
}
