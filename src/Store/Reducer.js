const initialState = {
  message: " Subscribe to simplify",
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  if (action.type === "message change") {
    newState.message = "Thank you for subscribe";
  }
  return newState;
};

export default reducer;
