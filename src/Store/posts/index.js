import { FetchPosts } from "./actions";

const initialState = {
  message1: " Subscribe to simplify",
  posts: [],
  loading: false,
};

const postReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "FETCH_POSTS":
      let result = FetchPosts();
      newState.loading = result.loading;
      newState.posts = result.posts;
  }
  return newState;
};

export default postReducer;
