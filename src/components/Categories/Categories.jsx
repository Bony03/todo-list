import { useState } from "react";
import "./Categories.scss";
export default function Categories({
  categoriesArray,
  addCategoryHandler,
  inputHandler,
  setChoosedCategory,
  choosedCategoryId,
}) {
  let timer;
  return (
    <div className="categories">
      <div className="categories__container">
        <h5 className="categories__heading">Choose category</h5>
        <ul className="categories__list">
          {categoriesArray.map((category) => {
            if (category.id === choosedCategoryId) {
              return (
                <li className="categories__item active" key={category.id}>
                  <input
                    type="button"
                    onDoubleClick={(e) => {
                      e.target.type = "input";
                    }}
                    onChange={(e) => {
                      inputHandler(category.id, e.target.value);
                    }}
                    value={category.name}
                    onTouchEnd={(e) => {
                      clearTimeout(timer);
                      return false;
                    }}
                    onTouchStart={(e) => {
                      timer = setTimeout(() => {
                        e.target.type = "input";
                      }, 700);

                      setChoosedCategory(category.id);
                      return false;
                    }}
                    onClick={() => {
                      setChoosedCategory({
                        id: category.id,
                        name: category.name,
                      });
                    }}
                    onBlur={(e) => (e.target.type = "button")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.type = "button";
                      }
                    }}
                  />
                  <span count={category.todos.length}></span>
                </li>
              );
            }
            return (
              <li className="categories__item" key={category.id}>
                <input
                  type="button"
                  onDoubleClick={(e) => {
                    e.target.type = "input";
                  }}
                  onChange={(e) => {
                    inputHandler(category.id, e.target.value);
                  }}
                  value={category.name}
                  onTouchEnd={() => {
                    clearTimeout(timer);
                    return false;
                  }}
                  onTouchStart={(e) => {
                    timer = setTimeout(() => {
                      e.target.type = "input";
                    }, 700);
                    return false;
                  }}
                  onClick={() => {
                    setChoosedCategory({
                      id: category.id,
                      name: category.name,
                    });
                  }}
                  onBlur={(e) => (e.target.type = "button")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.target.type = "button";
                    }
                  }}
                />
                <span count={category.todos.length}></span>
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => {
            addCategoryHandler();
          }}
        >
          Add category
        </button>
      </div>
    </div>
  );
}
