import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getAllPosts {
      _id
      title
      createdAt
      updatedAt
      author {
        _id
        username
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CREATE_NEW_POST($newPost: PostInput!) {
    createNewPost(newPost: $newPost) {
      _id
      title
      content
      featuredImage
      updatedAt
      createdAt
      author {
        username
        _id
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GET_POST_BY_ID($id: ID!) {
    getPostById(id: $id) {
      _id
      title
      content
      featuredImage
      updatedAt
      createdAt
      author {
        username
        _id
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DELETE_POST_BY_ID($id: ID!) {
    deletePostById(id: $id) {
      id
      message
      success
    }
  }
`;

export const ALL_USERS = gql`
  query GET_ALL_USERS {
    getAllUsers {
      _id
      username
      email
      lastName
      firstName
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DELETE_USER($id: ID!) {
    deleteUserById(id: $id) {
      id
      message
      success
    }
  }
`;

export const CREATE_USER = gql`
  mutation REGISTER(
    $username: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      newUser: {
        username: $username
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      token
      user {
        _id
        username
        email
        lastName
        firstName
        createdAt
      }
    }
  }
`;
