import { motion } from "framer-motion";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { scrollLocker } from "../../helpers/scrollLocker/scrollLocker";
import { deleteTodo, toggleTodo } from "../../store/todo/todo.slice";

import "./MainItem.scss";
export default function MainItem({
  id,
  name,
  date,
  category,
  categoryId,
  completed,
}) {
  const time = new Date(date).toString().slice(16, 21);
  const todoDate = new Date(date).toString().slice(4, 10);
  const dispatch = useDispatch();
  const item = useRef();
  function listTouchOpenning() {
    let posInitial = 0;
    let posFinal = 0;
    let posX1 = 0;
    let posX2 = 0;
    let clientX = 0;
    let initialWidth;
    return (e, container) => {
      clientX = e.changedTouches[0].clientX;
      const listItem = container.current.children[1].children[1];
      const doneButton = container.current.children[0].children[0];
      const deleteButton = container.current.children[0].children[1];
      if (e.type === "touchstart") {
        listItem.style.transition = "";
        posInitial = posX1 = clientX;
        initialWidth = listItem.offsetWidth;
        scrollLocker();
      }
      if (e.type === "touchmove") {
        posX2 = clientX - posX1;
        posX1 = clientX;
        if (clientX - posInitial > -132 && clientX - posInitial < 0) {
          listItem.style.width = `${initialWidth}px`;
          if (doneButton.classList.contains("done")) {
            doneButton.classList.remove("done");
          }
          deleteButton.classList.add("delete");
          listItem.style.transform = `translateX(${(
            Number(listItem.style.transform.replace(/[^-?0-9.0-9+]/g, "")) +
            posX2
          ).toFixed(2)}px)`;
          if (clientX - posInitial > -120) {
            container.current.style.boxShadow = "none";
          }
          if (clientX - posInitial <= -120) {
            container.current.style.boxShadow = "0 0 5px 2px #b71a12";
          }
        } else if (clientX - posInitial >= 0 && clientX - posInitial < 132) {
          if (deleteButton.classList.contains("delete")) {
            deleteButton.classList.remove("delete");
          }
          doneButton.classList.add("done");
          listItem.style.width = `${Math.round(
            listItem.offsetWidth - posX2
          )}px`;
          if (clientX - posInitial < 115) {
            container.current.style.boxShadow = "none";
          }
          if (clientX - posInitial >= 115) {
            container.current.style.boxShadow = "0 0 5px 2px #098b53";
          }
        }
      }
      if (e.type === "touchend") {
        posFinal = clientX;
        if (posInitial < posFinal) {
          if (Math.abs(posInitial - posFinal) > 115) {
            dispatch(toggleTodo({ id, categoryId }));
            listItem.style.transition = "all 0.5s";
            listItem.style.width = `${initialWidth}px`;
            container.current.style.boxShadow = "none";
          } else {
            listItem.style.transition = "all 0.5s";
            listItem.style.transform = `translateX(0px)`;
            listItem.style.width = `${initialWidth}px`;
            container.current.style.boxShadow = "none";
          }
        } else {
          if (Math.abs(posInitial - posFinal) > 120) {
            dispatch(deleteTodo({ id, categoryId }));
          } else {
            listItem.style.transition = "all 0.5s";
            listItem.style.transform = `translateX(0px)`;
          }
        }
        scrollLocker();
      }
    };
  }
  const listTouchHandler = listTouchOpenning();
  return (
    <motion.li
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className={
        completed ? "todo-list__item item completed" : "todo-list__item item"
      }
      key={id}
      ref={item}
    >
      <div className="item__buttons">
        <div className="item__button ">
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.325 0C5.0625 0 0 5.0625 0 11.325C0 17.5875 5.0625 22.6875 11.325 22.6875C17.5875 22.6875 22.6875 17.5875 22.6875 11.325C22.6875 5.0625 17.5875 0 11.325 0ZM11.325 21C6 21 1.6875 16.65 1.6875 11.325C1.6875 6 6 1.6875 11.325 1.6875C16.65 1.6875 21 6.0375 21 11.3625C21 16.65 16.65 21 11.325 21Z" />
            <path d="M14.55 7.83749L10.0875 12.1875L8.0625 10.2C7.725 9.86249 7.2 9.89999 6.8625 10.2C6.525 10.5375 6.5625 11.0625 6.8625 11.4L9.2625 13.725C9.4875 13.95 9.7875 14.0625 10.0875 14.0625C10.3875 14.0625 10.6875 13.95 10.9125 13.725L15.75 9.07499C16.0875 8.73749 16.0875 8.21249 15.75 7.87499C15.4125 7.53749 14.8875 7.53749 14.55 7.83749Z" />
          </svg>
          <span>Done</span>
        </div>
        <div className="item__button">
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.325 0C5.0625 0 0 5.0625 0 11.325C0 17.5875 5.0625 22.6875 11.325 22.6875C17.5875 22.6875 22.6875 17.5875 22.6875 11.325C22.6875 5.0625 17.5875 0 11.325 0ZM11.325 21C6 21 1.6875 16.65 1.6875 11.325C1.6875 6 6 1.6875 11.325 1.6875C16.65 1.6875 21 6.0375 21 11.3625C21 16.65 16.65 21 11.325 21Z" />
            <path d="M14.775 7.83751C14.4375 7.50001 13.9125 7.50001 13.575 7.83751L11.325 10.125L9.03748 7.83751C8.69998 7.50001 8.17498 7.50001 7.83748 7.83751C7.49998 8.17501 7.49998 8.70001 7.83748 9.03751L10.125 11.325L7.83748 13.6125C7.49998 13.95 7.49998 14.475 7.83748 14.8125C7.98748 14.9625 8.21247 15.075 8.43747 15.075C8.66248 15.075 8.88748 15 9.03748 14.8125L11.325 12.525L13.6125 14.8125C13.7625 14.9625 13.9875 15.075 14.2125 15.075C14.4375 15.075 14.6625 15 14.8125 14.8125C15.15 14.475 15.15 13.95 14.8125 13.6125L12.525 11.325L14.8125 9.03751C15.1125 8.70001 15.1125 8.17501 14.775 7.83751Z" />
          </svg>
          <span>Delete</span>
        </div>
      </div>
      <div
        className="item__container"
        onTouchStart={(e) => {
          listTouchHandler(e, item);
        }}
        onTouchMove={(e) => {
          listTouchHandler(e, item);
        }}
        onTouchEnd={(e) => {
          listTouchHandler(e, item);
        }}
      >
        <div className="item__date">
          {time} <span>{todoDate}</span>
        </div>
        <div className="item__name">
          <h3 className="item__title">{name}</h3>
          <h5 className="item__category">{category}</h5>
        </div>
      </div>
    </motion.li>
  );
}
