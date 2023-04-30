export const photoHandler = (file, ref) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    ref.current.src = e.target.result;
  };
  reader.readAsDataURL(file);
};
