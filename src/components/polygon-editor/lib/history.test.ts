import { describe, expect, it } from 'vitest';
import { createHistoryState, pushHistory, redoHistory, undoHistory } from './history';

describe('history helpers', () => {
  it('pushes undo and redo states', () => {
    const initial = createHistoryState({ value: 1 });
    const next = pushHistory(initial, { value: 2 }, (a, b) => a.value === b.value);
    expect(next.past).toEqual([{ value: 1 }]);
    expect(undoHistory(next).present).toEqual({ value: 1 });
    expect(redoHistory(undoHistory(next)).present).toEqual({ value: 2 });
  });
});
