export function quantToScrollToLeft(mediasContainer: HTMLDivElement) {
  const scrollPosition = mediasContainer.scrollLeft;

  if (scrollPosition <= 300) {
    return 0;
  }

  return scrollPosition - mediasContainer.getBoundingClientRect().width / 2;
}

export function quantToScrollToRight(mediasContainer: HTMLDivElement) {
  const scrollPosition = mediasContainer.scrollLeft;
  const maxScroll =
    mediasContainer.scrollWidth - mediasContainer.getBoundingClientRect().width;

  if (mediasContainer.scrollLeft >= maxScroll - 300) {
    return maxScroll;
  }

  return scrollPosition + mediasContainer.getBoundingClientRect().width / 2;
}
