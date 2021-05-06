import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks";

import { AuthContext } from "../context/auth";

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({ errors: [] });
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { onChange, onSubmit, values } = useForm(signUpUser, initialState);

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.registerUser);
      props.history.push("/");
    },
    onError(err) {
      let messages = err.message.split(",").map((err) => {
        err = err.split("Path")[1];
        return err;
      });
      setErrors({ errors: messages });
    },
    variables: values,
  });

  function signUpUser() {
    registerUser();
  }

  return (
    <div className="form-container">
      {errors.errors.length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {errors.errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="UserName"
          placeholder="Username....."
          type="text"
          name="username"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="First Name"
          placeholder="First Name....."
          name="firstName"
          type="text"
          value={values.firstName}
          onChange={onChange}
        />
        <Form.Input
          label="Last Name"
          placeholder="Last Name....."
          name="lastName"
          type="text"
          value={values.lastName}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email....."
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password....."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password....."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
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
      }
    }
  }
`;

export default Register;
