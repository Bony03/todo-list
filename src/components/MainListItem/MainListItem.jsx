import { motion } from "framer-motion";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { scrollLocker } from "../../helpers/scrollLocker/scrollLocker";
import { deleteTodo, toggleTodo } from "../../store/todo/todo.slice";
import { itemTouch } from "../../helpers/touchOpening/listItemTouch";
import "./MainListItem.scss";
export default function MainListItem({
  id,
  name,
  date,
  category,
  categoryId,
  completed,
  deleteHandler,
  toggleHandler,
}) {
  const time = new Date(date).toString().slice(16, 21);
  const todoDate = new Date(date).toString().slice(4, 10);
  const item = useRef();

  const listTouchHandler = itemTouch(
    toggleHandler,
    deleteHandler,
    id,
    categoryId
  );
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
