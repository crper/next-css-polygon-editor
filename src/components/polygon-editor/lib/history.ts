export interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export function createHistoryState<T>(initialPresent: T): HistoryState<T> {
  return {
    past: [],
    present: initialPresent,
    future: [],
  };
}

export function replacePresent<T>(history: HistoryState<T>, nextPresent: T): HistoryState<T> {
  return {
    ...history,
    present: nextPresent,
  };
}

export function pushHistory<T>(
  history: HistoryState<T>,
  nextPresent: T,
  isEqual: (a: T, b: T) => boolean
): HistoryState<T> {
  if (isEqual(history.present, nextPresent)) {
    return history;
  }

  return {
    past: [...history.past, history.present],
    present: nextPresent,
    future: [],
  };
}

export function undoHistory<T>(history: HistoryState<T>): HistoryState<T> {
  const previous = history.past.at(-1);

  if (!previous) {
    return history;
  }

  return {
    past: history.past.slice(0, -1),
    present: previous,
    future: [history.present, ...history.future],
  };
}

export function redoHistory<T>(history: HistoryState<T>): HistoryState<T> {
  const [next, ...restFuture] = history.future;

  if (!next) {
    return history;
  }

  return {
    past: [...history.past, history.present],
    present: next,
    future: restFuture,
  };
}
