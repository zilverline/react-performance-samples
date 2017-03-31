const initialState = [];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'ON':
      return state.concat(action.itemIndex);
    case 'OFF':
      const newState = state.slice();
      const index = newState.indexOf(action.itemIndex);
      newState.splice(index, 1);
      return newState;
    default:
      return state;
  }
}

export const turnOn = (index) => {
  return { type: 'ON', itemIndex: index };
}

export const turnOff = (index) => {
  return { type: 'OFF', itemIndex: index };
}
