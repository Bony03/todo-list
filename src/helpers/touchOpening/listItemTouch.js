import { scrollLocker } from "../scrollLocker/scrollLocker";

export function itemTouch(toggleHandler, deleteHandler, id, categoryId) {
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
          Number(listItem.style.transform.replace(/[^-?0-9.0-9+]/g, "")) + posX2
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
        listItem.style.width = `${Math.round(listItem.offsetWidth - posX2)}px`;
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
          toggleHandler(id, categoryId);
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
          deleteHandler(id, categoryId);
        } else {
          listItem.style.transition = "all 0.5s";
          listItem.style.transform = `translateX(0px)`;
        }
      }
      scrollLocker();
    }
  };
}
