import { renderHook, act } from '@testing-library/react';
import { useDebouncedValue } from './useDebouncedValue';

jest.useFakeTimers();

describe('useDebouncedValue', () => {
  it('returns initial value immediately', () => {
     // 1. Render the hook and capture the result object.
    // The hook runs once immediately.
    const { result } = renderHook(() => useDebouncedValue('a', 300));
     // 2. Check the *current* returned value right away.
    // 'result.current' holds the value returned by the hook ('debounced').
    expect(result.current).toBe('a');
  });

  it('updates only after the delay', () => {
    // 1. Setup the hook with an initial value 'a'.
    const { result, rerender } = renderHook(
      ({ v }) => useDebouncedValue(v, 300),
      { initialProps: { v: 'a' } }
    );

    // 2. Change the input value to 'ab'.
    // This calls the cleanup function for 'a' and starts a new timer for 'ab'.
    rerender({ v: 'ab' });
    
    // 3. Check immediately after rerender.
    // The 'debounced' state hasn't changed yet because the timer hasn't finished.
    expect(result.current).toBe('a');

    // 4. Manually fast-forward time by 299ms (less than the 300ms delay).
    act(() => { jest.advanceTimersByTime(299); });
    // Still hasn't hit the threshold. The 'debounced' state is still 'a'.
    expect(result.current).toBe('a');

    // 5. Fast-forward the final 1ms to hit the 300ms mark.
    act(() => { jest.advanceTimersByTime(1); });
    // The timer finishes, setDebounced('ab') is called, causing a re-render.
    expect(result.current).toBe('ab');
  });

  it('cancels pending update when value changes again quickly', () => {
    // 1. Setup with 'a'
    const { result, rerender } = renderHook(
      ({ v }) => useDebouncedValue(v, 300),
      { initialProps: { v: 'a' } }
    );

    // 2. Change to 'ab' (Timer 1 started for 'ab'
    rerender({ v: 'ab' });

    // 3. Advance time partway (200ms)
    act(() => { jest.advanceTimersByTime(200); });

    // 4. Change again to 'abc' *before* the 300ms passed for 'ab'.
    // This calls the cleanup function (clearTimeout) for the 'ab' timer (Timer 1).
    // A new timer (Timer 2) is started for 'abc'
    rerender({ v: 'abc' });

    // 5. The value should still be 'a' because 'ab' was cancelled and 'abc' hasn't finished yet.
    expect(result.current).toBe('a');

    // 6. Advance time for the full 300ms required by the 'abc' timer
    act(() => { jest.advanceTimersByTime(300); });

    // 7. Timer 2 finishes, setDebounced('abc') runs, component re-renders
    expect(result.current).toBe('abc');
  });
});
