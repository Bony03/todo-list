export function scrollLocker() {
  const lock = window.document.querySelector("body");
  if (lock.classList.contains("lock")) {
    window.document.querySelector("body").classList.remove("lock");
  } else {
    window.document.querySelector("body").classList.add("lock");
  }
}
