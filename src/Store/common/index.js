const initialState = {
  message: " Subscribe to simplify",
  errors: [],
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "message change":
      newState.message = "Thanks for subscribe";
    case "Set Errors":
      newState.errors = action.payload;
  }
  return newState;
};

export default reducer;
