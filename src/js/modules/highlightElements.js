export function highlightElements(elements, highlight) {
  if (highlight) {
    elements.forEach(element => element.domNode.classList.add('sproggles-hover-element'));
  } else {
    elements.forEach(element => element.domNode.classList.remove('sproggles-hover-element'));
  }
}
