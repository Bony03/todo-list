import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { filters } from "../../helpers/filters/filters";
import Button from "../Button/Button";
import "./MainButtons.scss";
import { useSelector } from "react-redux";
import { auth } from "../../store/selectors/selectors";
export default function MainButtons({
  setOpenAddTodo,
  categoriesArray,
  setTodosList,
  todosList,
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(false);
  const [clearButton, setClearButton] = useState(false);

  const [
    onlyChoosedCategory,
    allSortedByDate,
    filterByDayTodos,
    clearFiltersHandler,
  ] = filters(
    todosList,
    setTodosList,
    activeCategory,
    setActiveCategory,
    categoriesArray,
    setClearButton
  );
  const isAuth = useSelector(auth);
  return (
    <div className="main-buttons">
      <div className="main-buttons__container">
        <div className="main-buttons__filters">
          <div className="main-buttons__categories main-categories">
            <ul className="main-categories__list">
              {categoriesArray.map((category) => {
                return (
                  <li
                    className={
                      activeCategory === category.id
                        ? "main-categories__item active"
                        : "main-categories__item"
                    }
                    key={category.id}
                  >
                    <input
                      type="button"
                      value={category.name}
                      onClick={() => {
                        setActiveCategory(category.id);
                        onlyChoosedCategory(category.id);
                      }}
                      disabled={
                        activeCategory === category.id ||
                        activeCategory === false
                          ? false
                          : true
                      }
                    />
                    <span count={category.todos.length}></span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="main-buttons__filters-body">
            <button
              className="main-buttons__all-todo"
              onClick={() => {
                allSortedByDate();
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.56212 3H17.4379C17.7312 3 18 2.56522 18 2C18 1.43478 17.7556 1 17.4379 1H6.56212C6.26884 1 6 1.43478 6 2C6 2.56522 6.2444 3 6.56212 3Z" />
                <path d="M17.4134 8H6.56212C6.26884 8 6 8.43478 6 9C6 9.52174 6.2444 10 6.56212 10H17.4379C17.7312 10 18 9.56522 18 9C17.9756 8.43478 17.7312 8 17.4134 8Z" />
                <path d="M17.4134 15H6.56212C6.26884 15 6 15.4348 6 16C6 16.5652 6.2444 17 6.56212 17H17.4379C17.7312 17 18 16.5652 18 16C18 15.4348 17.7312 15 17.4134 15Z" />
                <path d="M0.187373 4H3.81263C3.91039 4 4 3.13043 4 2C4 0.869565 3.91853 0 3.81263 0H0.187373C0.089613 0 0 0.869565 0 2C0 3.13043 0.0814664 4 0.187373 4Z" />
                <path d="M0.187373 18H3.81263C3.91039 18 4 17.1304 4 16C4 14.8696 3.91853 14 3.81263 14H0.187373C0.089613 14 0 14.8696 0 16C0 17.1304 0.0814664 18 0.187373 18Z" />
                <path d="M0.187373 11H3.81263C3.91039 11 4 10.1304 4 9C4 7.86957 3.91853 7 3.81263 7H0.187373C0.089613 7 0 7.86957 0 9C0 10.1304 0.0814664 11 0.187373 11Z" />
              </svg>
            </button>
            <div
              className={
                filtersOpen
                  ? "main-buttons__sort-date active"
                  : "main-buttons__sort-date"
              }
              onClick={() => {
                setFiltersOpen(!filtersOpen);
              }}
            >
              <svg
                width="18"
                height="16"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.5981 18.5C12.4434 20.5 9.55662 20.5 8.40192 18.5L0.607693 5C-0.547007 3 0.89637 0.5 3.20577 0.5H18.7942C21.1036 0.5 22.547 3 21.3923 5L13.5981 18.5Z" />
              </svg>

              {filtersOpen && (
                <div className="main-buttons__sort-date__body">
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="main-buttons__sort-date__item"
                    onClick={() => {
                      filterByDayTodos("today");
                    }}
                  >
                    today
                  </motion.div>
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="main-buttons__sort-date__item"
                    onClick={() => {
                      filterByDayTodos("tomorrow");
                    }}
                  >
                    tomorrow
                  </motion.div>
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="main-buttons__sort-date__item"
                    onClick={() => {
                      filterByDayTodos("this week");
                    }}
                  >
                    this week
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="main-buttons__body">
          <Button
            text="Add Todo"
            onClick={() => {
              setOpenAddTodo(true);
            }}
            className="main-buttons__add-todo"
          />
          {isAuth && (
            <button
              className="button main-buttons__save-todos"
              onClick={() => {}}
            >
              Save
            </button>
          )}
          <AnimatePresence>
            {clearButton && (
              <motion.button
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                className="button main-buttons__clear-filters"
                onClick={() => {
                  clearFiltersHandler();
                }}
              >
                Clear filters
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
