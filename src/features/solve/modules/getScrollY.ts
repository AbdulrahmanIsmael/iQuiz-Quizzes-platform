export function getScrollY() {
  const scrollYPos: number = +JSON.parse(
    localStorage.getItem("scrollYPosition") as string
  );
  if (scrollYPos) window.scrollTo({ behavior: "instant", top: scrollYPos });
}
