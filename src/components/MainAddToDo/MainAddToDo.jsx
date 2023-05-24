import { useState } from "react";
import Button from "../CompButton/Button";
import FloatInput from "../CompFloatInput/FloatInput";
import "./MainAddToDo.scss";
import MainCategories from "../MainCategories/MainCategories";
import Error from "../CompError/Error";
import PopUpContainer from "../CompPopUpContainer/PopUpContainer";
export default function MainAddToDo({
  todoInput,
  setTodoInput,
  setOpenAddTodo,
  categoriesArray,
  addCategoryHandler,
  setCategoryNameHandler,
  choosed,
  setChoosed,
  addErrorMessage,
  addHandler,
  setAddErrorMessage,
}) {
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

  return (
    <PopUpContainer>
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
            <MainCategories
              categoriesArray={categoriesArray}
              addCategoryHandler={addCategoryHandler}
              setCategoryNameHandler={setCategoryNameHandler}
              setChoosed={setChoosed}
              choosed={choosed}
            />
            <div className="main-add-todo__date-heading">
              Enter Date and Time
            </div>
            <div className="main-add-todo__date">
              <div className="day">
                <h3
                  className="day__heading"
                  onClick={() => {
                    setOpenDay(!openDay);
                  }}
                >
                  {choosed.day}
                </h3>
                {openDay && (
                  <div className="day__radio-container">
                    {day.map((i) => {
                      return (
                        <div
                          className="day__item"
                          onClick={() => {
                            setChoosed({ ...choosed, day: i });
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
                  {choosed.month}
                </h3>
                {openMonth && (
                  <div className="month__radio-container">
                    {month.map((i) => {
                      return (
                        <div
                          className="month__item"
                          onClick={() => {
                            setChoosed({ ...choosed, month: i });
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
                  setChoosed({ ...choosed, hour: e.target.value });
                }}
                onFocus={() => {
                  setChoosed({ ...choosed, hour: "" });
                }}
                value={choosed.hour}
                type="number"
              />
              <span className="two__dots">:</span>
              <input
                className="main-add-todo__minutes"
                onChange={(e) => {
                  setChoosed({ ...choosed, minutes: e.target.value });
                }}
                onFocus={() => {
                  setChoosed({ ...choosed, minutes: "" });
                }}
                value={choosed.minutes}
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
                  addHandler(todoInput, choosed.category);
                }}
                text="Add task"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </PopUpContainer>
  );
}
