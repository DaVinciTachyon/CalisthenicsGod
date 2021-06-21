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

const getWeight = (weights) => {
  let weight = 0
  const date = new Date();
  date.setDate(date.getDate() - 7);
  if(weights) {
    const weights = weights.filter(weight =>
      new Date(weight.date).getTime() >= date.getTime()
    )
    weight = weights.length > 0 ?
      weights.reduce((mean, weight,  _, { length }) => mean + weight.value / length, 0) :
      weights[0].value
  }
  return weight
}

export { loadState, saveState, removeState, getWeight };
