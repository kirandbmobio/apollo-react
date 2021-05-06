import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getAllPosts {
      _id
      title
      createdAt
      updatedAt
    }
  }
`;
