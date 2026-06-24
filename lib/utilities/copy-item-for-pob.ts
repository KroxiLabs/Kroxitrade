const EXCLUDED_FROM_COPY_SELECTOR = [
  "#btns-finer",
  ".finer-filtered-overlay",
  ".bt-maximum-sockets-warning"
].join(", ");

export const copyItemForPob = (row: HTMLElement): boolean => {
  const itemPopup = row.querySelector<HTMLElement>(".item-popup");
  const selection = window.getSelection();
  if (!itemPopup || !selection) return false;

  const hiddenElements = Array.from(
    itemPopup.querySelectorAll<HTMLElement>(EXCLUDED_FROM_COPY_SELECTOR)
  ).map((element) => ({
    element,
    display: element.style.getPropertyValue("display"),
    priority: element.style.getPropertyPriority("display")
  }));

  const savedRanges: Range[] = [];
  for (let index = 0; index < selection.rangeCount; index++) {
    savedRanges.push(selection.getRangeAt(index).cloneRange());
  }

  let copied = false;
  try {
    hiddenElements.forEach(({ element }) => {
      element.style.setProperty("display", "none", "important");
    });

    const range = document.createRange();
    range.selectNodeContents(itemPopup);
    selection.removeAllRanges();
    selection.addRange(range);
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  } finally {
    selection.removeAllRanges();
    savedRanges.forEach((range) => selection.addRange(range));

    hiddenElements.forEach(({ element, display, priority }) => {
      if (display) {
        element.style.setProperty("display", display, priority);
      } else {
        element.style.removeProperty("display");
      }
    });
  }

  return copied;
};
