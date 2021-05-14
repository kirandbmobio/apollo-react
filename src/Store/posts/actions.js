import { useQuery } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../../utils/graphql";

export const FetchPosts = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  let posts;
  if (data) {
    let { getAllPosts } = data;
    posts = getAllPosts;
  }
  return { loading, posts };
};
