import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../../utils/hooks";
import { ALL_USERS, CREATE_USER } from "../../utils/graphql";

function UserForm() {
  const { values, onChange, onSubmit } = useForm(createNewUserCallback, {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ errors: [] });
  const [registerUser, { error }] = useMutation(CREATE_USER, {
    variables: values,
    update(proxy, result) {
      console.log("result", result);
      setErrors({ errors: [] });
      const data = proxy.readQuery({
        query: ALL_USERS,
      });
      let newData = [...data.getAllUsers];
      newData = [result.data.registerUser.user, ...newData];
      proxy.writeQuery({
        query: ALL_USERS,
        data: {
          ...data,
          getAllUsers: {
            newData,
          },
        },
      });
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
          messages = ["All field is required"];
        } else {
          messages = [err.message];
        }
      }
      setErrors({ errors: messages });
    },
  });

  function createNewUserCallback() {
    registerUser();
  }
  return (
    <>
      <Form onSubmit={onSubmit} className="form-container">
        <h2>Create a User</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="username"
            onChange={onChange}
            value={values.username}
          />
          <Form.Input
            placeholder="firstName!"
            name="firstName"
            onChange={onChange}
            value={values.firstName}
          />
          <Form.Input
            placeholder="Last Name!"
            name="lastName"
            onChange={onChange}
            value={values.lastName}
          />
          <Form.Input
            placeholder="Email!"
            name="email"
            onChange={onChange}
            value={values.email}
          />
          <Form.Input
            placeholder="Password!"
            name="password"
            onChange={onChange}
            value={values.Password}
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

export default UserForm;
