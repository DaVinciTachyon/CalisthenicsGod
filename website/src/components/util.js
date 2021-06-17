const loadState = (name) => {
  try {
    const serializedState = localStorage.getItem(name);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (name, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(name, serializedState);
  } catch (err) {
    console.log(err);
  }
};

const removeState = (name) => {
  localStorage.removeItem(name);
};

export { loadState, saveState, removeState };
