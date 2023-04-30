import Col from "react-bootstrap/Col";
import AddToDo from "./AddToDo/AddToDo";
import List from "./List/List";
import SaveButton from "./SaveButton/SaveButton";
import Success from "../Success/Success";
import { useSelector, useDispatch } from "react-redux";
import { todosSc } from "../../store/selectors/selectors";
import { useEffect, useState } from "react";
import { setTodosSuccess } from "../../store/system/system.slice";
import Filters from "../Filters/Filters";
import Categories from "../Categories/Categories";

export default function Todos({
  todoInput,
  setTodoInput,
  submitHandler,
  doneHandler,
  deleteHandler,
  todoList,
  editHandler,
  isAuth,
}) {
  const [filteredArray, setFilteredArray] = useState(todoList);
  const dispatch = useDispatch();
  const todosSuccess = useSelector(todosSc);
  useEffect(() => {
    setTimeout(() => {
      dispatch(setTodosSuccess(""));
    }, 2000);
  }, [todosSuccess]);

  function doneFilter() {
    const tempArray = todoList.filter((item) => item.completed === true);
    setFilteredArray(tempArray);
  }
  function editedFilter() {
    const tempArray = todoList.filter((item) => !!item.edit);
    setFilteredArray(tempArray);
  }
  function ongoingFilter() {
    const tempArray = todoList.filter((item) => item.completed === false);
    setFilteredArray(tempArray);
  }
  function allFilter() {
    const tempArray = JSON.parse(JSON.stringify(todoList));
    setFilteredArray(tempArray);
  }
  useEffect(() => {
    setFilteredArray(todoList);
  }, [todoList]);
  return (
    <>
      <Col
        lg={true}
        style={{
          padding: 0,
          marginTop: "calc(var(--bs-gutter-x) * .5)",
        }}
      >
        <AddToDo
          todoInput={todoInput}
          setTodoInput={setTodoInput}
          submitHandler={submitHandler}
        />
        <Filters
          doneFilter={doneFilter}
          editedFilter={editedFilter}
          ongoingFilter={ongoingFilter}
          allFilter={allFilter}
        />
        {todosSuccess && <Success text={todosSuccess} />}
        <List
          doneHandler={doneHandler}
          deleteHandler={deleteHandler}
          todoList={filteredArray}
          editHandler={editHandler}
        />
        {isAuth && <SaveButton />}
      </Col>
      <Col>
        <Categories />
      </Col>
    </>
  );
}