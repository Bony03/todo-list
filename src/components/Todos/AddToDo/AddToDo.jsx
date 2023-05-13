import { useState } from "react";
import Button from "../../Button/Button";
import FloatInput from "../../FloatInput/FloatInput";
import "./AddToDo.scss";
import Categories from "../../Categories/Categories";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../../store/selectors/selectors";
import {
  addCategory,
  addTodo,
  setCategoryName,
} from "../../../store/todo/todo.slice";
import Error from "../../Error/Error";
export default function AddToDo({ todoInput, setTodoInput, setOpenAddTodo }) {
  function todaysDayMonth() {
    const date = Date();

    return date.split(" ").slice(1, 3);
  }

  const day = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [openDay, setOpenDay] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);
  const dispatch = useDispatch();
  const [todayMonth, today] = todaysDayMonth();
  const [choosedCategory, setChoosedCategory] = useState("");
  const [choosedDay, setChoosedDay] = useState(today);
  const [choosedMonth, setChoosedMonth] = useState(todayMonth);
  const [inputHour, setInputHour] = useState(10);
  const [inputMinutes, setInputMinutes] = useState(30);
  const [addErrorMessage, setAddErrorMessage] = useState("");
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
      date: `${choosedMonth} ${choosedDay}, 2023`,
      time: `${inputHour}:${inputMinutes}`,
      categoryName: category.name,
    };
    dispatch(addTodo(task));
    setOpenAddTodo(false);
    setTodoInput("");
  }
  const categoriesArray = useSelector(categories);
  function addCategoryHandler() {
    dispatch(addCategory());
  }
  function inputHandler(id, name) {
    dispatch(setCategoryName({ id, name }));
  }
  return (
    <div className="main-add-todo">
      <div className="main-add-todo__container">
        <div className="main-add-todo__body">
          <form
            className="main-add-todo__form"
            onSubmit={(e) => {
              e.preventDefault();
              addHandler(todoInput);
            }}
          >
            <h3 className="main-add-todo__heading">Add new task</h3>
            {addErrorMessage && (
              <Error
                text={addErrorMessage}
                closeError={() => {
                  setAddErrorMessage("");
                }}
              />
            )}
            <FloatInput
              className="main-add-todo__input"
              onChange={(e) => setTodoInput(e.target.value)}
              value={todoInput}
              label="Enter task name..."
              backColor="#1a1a1a"
            />
          </form>
          <Categories
            categoriesArray={categoriesArray}
            addCategoryHandler={addCategoryHandler}
            inputHandler={inputHandler}
            setChoosedCategory={setChoosedCategory}
            choosedCategoryId={choosedCategory.id}
          />
          <div className="main-add-todo__date-heading">Enter Date and Time</div>
          <div className="main-add-todo__date">
            <div className="day">
              <h3
                className="day__heading"
                onClick={() => {
                  setOpenDay(!openDay);
                }}
              >
                {choosedDay}
              </h3>
              {openDay && (
                <div className="day__radio-container">
                  {day.map((i) => {
                    if (i === today) {
                      return (
                        <div
                          className="day__item"
                          onClick={() => {
                            setChoosedDay(i);
                            setOpenDay(false);
                          }}
                        >
                          {i}
                        </div>
                      );
                    }
                    return (
                      <div
                        className="day__item"
                        onClick={() => {
                          setChoosedDay(i);
                          setOpenDay(false);
                        }}
                      >
                        {i}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="month">
              <h3
                className="month__heading"
                onClick={() => {
                  setOpenMonth(!openMonth);
                }}
              >
                {choosedMonth}
              </h3>
              {openMonth && (
                <div className="month__radio-container">
                  {month.map((i) => {
                    if (i === todayMonth) {
                      return (
                        <div
                          className="month__item"
                          onClick={() => {
                            setChoosedDay(i);
                            setOpenMonth(false);
                          }}
                        >
                          {i}
                        </div>
                      );
                    }
                    return (
                      <div
                        className="month__item"
                        onClick={() => {
                          setChoosedMonth(i);
                          setOpenMonth(false);
                        }}
                      >
                        {i}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <input
              className="main-add-todo__hour"
              onChange={(e) => {
                setInputHour(e.target.value);
              }}
              onFocus={() => {
                setInputHour("");
              }}
              value={inputHour}
              type="number"
            />
            <span className="two__dots">:</span>
            <input
              className="main-add-todo__minutes"
              onChange={(e) => {
                setInputMinutes(e.target.value);
              }}
              onFocus={() => {
                setInputMinutes("");
              }}
              value={inputMinutes}
              type="number"
            />
          </div>
          <div className="main-add-todo__button">
            <Button
              className="main-add-todo__button-close"
              onClick={() => setOpenAddTodo(false)}
              text="Close"
            ></Button>
            <Button
              className="main-add-todo__button-add"
              onClick={() => {
                addHandler(todoInput, choosedCategory);
              }}
              text="Add task"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
