import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../../utils/hooks";
import { FETCH_POSTS_QUERY, CREATE_POST } from "../../utils/graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createNewPostCallback, {
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({ errors: [] });
  const [createNewPost, { error }] = useMutation(CREATE_POST, {
    variables: { newPost: values },
    update(proxy, result) {
      setErrors({ errors: [] });
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
    onError(err) {
      let messages;
      if (err.message.includes(",")) {
        messages = err.message.split(",").map((err) => {
          err = err.split("Path")[1];
          return err;
        });
      } else {
        if (err.message.includes(400)) {
          messages = ["Both field is required"];
        } else {
          messages = [err.message];
        }
      }
      setErrors({ errors: messages });
    },
  });

  function createNewPostCallback() {
    createNewPost();
  }
  return (
    <>
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
      {errors.errors.length > 0 && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            {errors.errors.map((serror, i) => (
              <li key={i}>{serror}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default PostForm;
