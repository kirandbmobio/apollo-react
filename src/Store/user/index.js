import { FetchUsers } from "./actions";

const initialState = {
  message1: " Subscribe to simplify",
  users: [],
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "FETCH_USERS":
      let result = FetchUsers();
      newState.loading = result.loading;
      newState.users = result.users;
  }
  return newState;
};

export default userReducer;
