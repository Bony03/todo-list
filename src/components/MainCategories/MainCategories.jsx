import "./MainCategories.scss";
export default function MainCategories({
  categoriesArray,
  addCategoryHandler,
  setCategoryNameHandler,
  choosed,
  setChoosed,
}) {
  let timer;
  return (
    <div className="categories">
      <div className="categories__container">
        <h5 className="categories__heading">Choose category</h5>
        <ul className="categories__list">
          {categoriesArray.map((category) => {
            if (category.id === choosed.category.id) {
              return (
                <li className="categories__item active" key={category.id}>
                  <input
                    type="button"
                    onDoubleClick={(e) => {
                      e.target.type = "input";
                    }}
                    onChange={(e) => {
                      setCategoryNameHandler(category.id, e.target.value);
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

                      setChoosed({
                        ...choosed,
                        category: {
                          id: category.id,
                          name: category.name,
                        },
                      });
                      return false;
                    }}
                    onClick={() => {
                      setChoosed({
                        ...choosed,
                        category: {
                          id: category.id,
                          name: category.name,
                        },
                      });
                    }}
                    onBlur={(e) => {
                      setChoosed({
                        ...choosed,
                        category: {
                          id: category.id,
                          name: category.name,
                        },
                      });
                      e.target.type = "button";
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setChoosed({
                          ...choosed,
                          category: {
                            id: category.id,
                            name: category.name,
                          },
                        });
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
                    setCategoryNameHandler(category.id, e.target.value);
                  }}
                  value={category.name}
                  onTouchEnd={() => {
                    clearTimeout(timer);
                    setChoosed({
                      ...choosed,
                      category: {
                        id: category.id,
                        name: category.name,
                      },
                    });
                    return false;
                  }}
                  onTouchStart={(e) => {
                    timer = setTimeout(() => {
                      e.target.type = "input";
                    }, 700);
                    return false;
                  }}
                  onClick={() => {
                    setChoosed({
                      ...choosed,
                      category: {
                        id: category.id,
                        name: category.name,
                      },
                    });
                  }}
                  onBlur={(e) => {
                    e.target.type = "button";
                    setChoosed({
                      ...choosed,
                      category: {
                        id: category.id,
                        name: category.name,
                      },
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.target.type = "button";
                      setChoosed({
                        ...choosed,
                        category: {
                          id: category.id,
                          name: category.name,
                        },
                      });
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
