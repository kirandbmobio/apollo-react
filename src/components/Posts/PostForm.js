import React from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../../utils/hooks";
import { FETCH_POSTS_QUERY } from "../../utils/graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createNewPostCallback, {
    title: "",
    content: "",
  });
  const [createNewPost, { error }] = useMutation(CREATE_POST, {
    variables: { newPost: values },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      let newData = [...data.getAllPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getAllPosts: {
            newData,
          },
        },
      });
      values.title = "";
      values.content = "";
    },
  });

  function createNewPostCallback() {
    console.log(values);
    createNewPost();
  }
  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a Post</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi World!"
          name="title"
          onChange={onChange}
          value={values.title}
        />
        <Form.Input
          placeholder="Content!"
          name="content"
          onChange={onChange}
          value={values.content}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
}

const CREATE_POST = gql`
  mutation CREATE_NEW_POST($newPost: PostInput!) {
    createNewPost(newPost: $newPost) {
      _id
      title
      content
      featuredImage
      updatedAt
      createdAt
    }
  }
`;

export default PostForm;
