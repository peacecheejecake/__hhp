export function createHooks(callback) {
  const _states = [];
  let _stateIndex = 0;

  const _memos = [];
  let _memoIndex = 0;

  const _createState = (initState) => {
    const index = _states.length;
    const setState = (newState) => {
      const state = _states[index][0];
      if (state !== newState) {
        _states[index][0] = newState;
        callback();
      }
    };
    _states.push([initState, setState]);
  };

  const _createMemo = (fn, refs) => {
    _memos.push([fn(), [...refs]]);
  };

  const useState = (initState) => {
    if (_states.length <= _stateIndex) {
      _createState(initState);
    }

    const state = _states[_stateIndex];
    _stateIndex += 1;

    return state;
  };

  const useMemo = (fn, refs) => {
    if (_memos.length <= _memoIndex) {
      _createMemo(fn, refs);
    }

    const [prevValue, prevRefs] = _memos[_memoIndex];
    let value = prevValue;
    let isRefChanged = refs.some((ref, index) => ref !== prevRefs[index]);
    if (isRefChanged) {
      value = fn();
    }

    _memos[_memoIndex] = [value, refs];
    _memoIndex += 1;

    return value;
  };

  const resetContext = () => {
    _stateIndex = 0;
    _memoIndex = 0;
  };

  return { useState, useMemo, resetContext };
}
