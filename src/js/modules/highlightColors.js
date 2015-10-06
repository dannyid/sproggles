export function highlightColors(elements, highlight) {
  if (highlight) {
    elements.forEach(element => element.classList.add('sproggles-hover-element'));
  } else {
    elements.forEach(element => element.classList.remove('sproggles-hover-element'));
  }
}
