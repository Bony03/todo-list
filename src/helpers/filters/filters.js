export function filters(
  todosList,
  setTodosList,
  activeCategory,
  setActiveCategory,
  categoriesArray,
  setClearButton
) {
  return [
    (categoryId) => {
      setClearButton(true);
      if (!!todosList.length) {
        const filtered = todosList.filter(
          (todo) => todo.categoryId === categoryId
        );
        setTodosList(filtered);
      }
    },
    () => {
      if (categoriesArray[0]) {
        const newArray = [];
        if (activeCategory) {
          const categoryItem = categoriesArray.find(
            (category) => category.id === activeCategory
          );
          categoryItem.todos.forEach((todo) => newArray.push(todo));
          console.log(categoryItem);
        } else {
          categoriesArray.forEach((element) => {
            element.todos.forEach((todo) => newArray.push(todo));
          });
        }
        newArray.sort((a, b) => a.date - b.date);
        setTodosList(newArray);
      }
    },
    (period) => {
      setClearButton(true);
      const today = new Date().toDateString().slice(4, 15);
      const oneDay = 1000 * 60 * 60 * 24;
      if (categoriesArray[0]) {
        const newArray = [];
        let numberStartDay = Date.parse(today);
        let numberEndDay = 0;
        if (activeCategory) {
          const categoryItem = categoriesArray.find(
            (category) => category.id === activeCategory
          );
          categoryItem.todos.forEach((todo) => newArray.push(todo));
          console.log(categoryItem);
        } else {
          categoriesArray.forEach((element) => {
            element.todos.forEach((todo) => newArray.push(todo));
          });
        }
        switch (period) {
          case "today":
            numberEndDay = numberStartDay + oneDay;
            setTodosList(
              newArray.filter(
                (todo) =>
                  todo.date >= numberStartDay && todo.date <= numberEndDay
              )
            );
            break;
          case "tomorrow":
            numberStartDay = Date.parse(today) + oneDay;
            numberEndDay = numberStartDay + oneDay;
            setTodosList(
              newArray.filter(
                (todo) =>
                  todo.date >= numberStartDay && todo.date <= numberEndDay
              )
            );
            break;
          case "this week":
            const weekDay = new Date().toDateString().slice(0, 3);
            const weekArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            for (let index = 0; index < weekArray.length; index++) {
              if (weekArray[index] === weekDay) {
                numberStartDay = numberStartDay - oneDay * index;
                numberEndDay = numberStartDay + oneDay * 7;
                setTodosList(
                  newArray
                    .filter(
                      (todo) =>
                        todo.date >= numberStartDay && todo.date <= numberEndDay
                    )
                    .sort((a, b) => a.date - b.date)
                );
              }
            }
            break;
          default:
            break;
        }
      }
      return;
    },
    () => {
      setActiveCategory(false);
      setClearButton(false);
      const newArray = [];
      categoriesArray.forEach((element) => {
        element.todos.forEach((todo) => newArray.push(todo));
      });

      newArray.sort((a, b) => a.date - b.date);
      setTodosList(newArray);
    },
  ];
}
