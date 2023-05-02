import { useState } from "react";
import Button from "../../Button/Button";
import FloatInput from "../../FloatInput/FloatInput";
import "./AddToDo.scss";
import Categories from "../../Categories/Categories";
import { useDispatch } from "react-redux";
export default function AddToDo(props) {
  const { submitHandler, todoInput, setTodoInput, setAddTodo } = props;

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
  const [choosedDay, setChoosedDay] = useState(today);
  const [choosedMonth, setChoosedMonth] = useState(todayMonth);
  const [inputHour, setInputHour] = useState(10);
  const [inputMinutes, setInputMinutes] = useState(30);
  function addHandler(todoInput, category) {
    if (category) {
      const task = {
        payload: {
          id: Date.now(),
          name: todoInput,
          category,
          dateAndTime: `${choosedMonth} ${choosedDay}, 2023 ${inputHour}:${inputMinutes}`,
        },
      };
    }
    const task = {
      payload: {
        id: Date.now(),
        name: todoInput,
        category: "My tasks",
        dateAndTime: `${choosedMonth} ${choosedDay}, 2023 ${inputHour}:${inputMinutes}`,
      },
    };
  }
  return (
    <div className="main-add-todo">
      <div className="main-add-todo__container">
        <div className="main-add-todo__body">
          <form
            className="main-add-todo__form"
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler(todoInput);
            }}
          >
            <h3 className="main-add-todo__heading">Add new task</h3>
            <FloatInput
              className="main-add-todo__input"
              onChange={(e) => setTodoInput(e.target.value)}
              value={todoInput}
              label="Enter task name..."
              backColor="#1a1a1a"
            />
          </form>
          <Categories />
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
              onClick={() => setAddTodo(false)}
              text="Close"
            ></Button>
            <Button
              className="main-add-todo__button-add"
              onClick={() => {
                submitHandler(todoInput);
                setAddTodo(false);
              }}
              text="Add task"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
