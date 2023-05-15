import MainItem from "../MainItem/MainItem";
import "./MainList.scss";
export default function MainList({ todosList }) {
  return (
    <div className="todo-list">
      <div className="todo-list__container">
        <div className="todo-list__heading">Tasks</div>
        <ul className="todo-list__list">
          {!!todosList.length && <span className="todo-list__line"></span>}
          {todosList.map((todo) => {
            return (
              <MainItem
                id={todo.id}
                name={todo.name}
                date={todo.date}
                category={todo.category}
                categoryId={todo.categoryId}
                completed={todo.completed}
                key={todo.id}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
