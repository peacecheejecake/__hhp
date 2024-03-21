export function createHooks(callback) {
  const _states = [];
  let _stateIndex = 0;

  const _callback = () => {
    _stateIndex = 0;
    callback();
  };

  const _createState = (initState) => {
    let state = initState;
    const setState = (newState) => {
      if (state !== newState) {
        state = newState;
        _callback();
      }
    };

    return [state, setState];
  };

  const useState = (initState) => {
    if (_states.length <= _stateIndex) {
      _states.push(_createState(initState));
    }

    const state = _states[_stateIndex];
    _stateIndex += 1;

    return state;
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {};

  return { useState, useMemo, resetContext };
}
