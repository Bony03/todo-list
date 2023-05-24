import MainListItem from "../MainListItem/MainListItem";
import "./MainList.scss";
export default function MainList({ todosList, deleteHandler, toggleHandler }) {
  return (
    <div className="todo-list">
      <div className="todo-list__container">
        <div className="todo-list__heading">Tasks</div>
        <ul className="todo-list__list">
          {!!todosList.length && <span className="todo-list__line"></span>}
          {todosList.map((todo) => {
            return (
              <MainListItem
                id={todo.id}
                name={todo.name}
                date={todo.date}
                category={todo.category}
                categoryId={todo.categoryId}
                completed={todo.completed}
                key={todo.id}
                deleteHandler={deleteHandler}
                toggleHandler={toggleHandler}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
