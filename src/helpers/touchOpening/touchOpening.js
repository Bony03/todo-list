import { scrollLocker } from "../scrollLocker/scrollLocker";

export function touchOpenning() {
  let posInitial = 0;
  let posFinal = 0;
  let posY1 = 0;
  let posY2 = 0;
  let clientY = 0;

  return (e, container) => {
    clientY = e.changedTouches[0].clientY;
    if (e.type === "touchstart") {
      posInitial = posY1 = clientY;
      container.current.style.transition = "";
      scrollLocker();
    }
    if (e.type === "touchmove") {
      posY2 = clientY - posY1;
      posY1 = clientY;
      if (Number(container.current.style.height.replace(/px/g, "")) < 200) {
        container.current.style.height = `${
          Number(container.current.style.height.replace(/px/g, "")) + posY2
        }px`;
      }
    }
    if (e.type === "touchend") {
      scrollLocker();
      posFinal = clientY;
      if (posInitial < posFinal) {
        if (
          Math.abs(posInitial - posFinal) >
          container.current.children[0].offsetHeight * 0.5
        ) {
          container.current.style.transition = "all 0.5s ";
          container.current.style.height = `${
            container.current.children[0].offsetHeight + 16
          }px`;
          container.current.style.padding = "0.5rem 1rem";
        } else {
          container.current.style.transition = "all 0.5s ";
          container.current.style.height = `0px`;
          container.current.style.padding = "0px 1rem";
        }
      } else {
        if (
          Math.abs(posInitial - posFinal) >
          container.current.children[0].offsetHeight * 0.5
        ) {
          container.current.style.transition = "all 0.5s ";
          container.current.style.height = `0px`;
          container.current.style.padding = "0px 1rem";
        } else {
          container.current.style.transition = "all 0.5s ";
          container.current.style.height = `${
            container.current.children[0].offsetHeight + 16
          }px`;
          container.current.style.padding = "0.5rem 1rem";
        }
      }
    }
  };
}
