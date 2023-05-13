import Button from "../Button/Button";

export default function MainButtons({ setOpenAddTodo }) {
  return (
    <div>
      <Button
        text="Add Todo"
        onClick={() => {
          setOpenAddTodo(true);
        }}
        className="main-buttons__add-todo"
      />
    </div>
  );
}
