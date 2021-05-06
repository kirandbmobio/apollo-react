import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/client";

import { useForm } from "../utils/hooks";

import { AuthContext } from "../context/auth";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({ errors: [] });

  const { values, onChange, onSubmit } = useForm(
    (credentials) => authenticateUser(),
    {
      username: "",
      password: "",
    }
  );

  // Lazy query for login user method
  const [
    authenticateUser,
    { called, loading, data, error },
  ] = useLazyQuery(LOGIN_USER, { variables: values });
  console.log(error, loading);
  // Store token if login is successful
  if (data) {
    context.login(data.authenticateUser);
    // window.localStorage.setItem("token", data.authenticateUser.token);
    props.history.push("/");
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        {/* <Form.Input
          label="Email"
          placeholder="Email....."
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
        /> */}
        <Form.Input
          label="Username"
          placeholder="Username....."
          type="text"
          name="username"
          value={values.username}
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
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    </div>
  );
}

const LOGIN_USER = gql`
  query authUser($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password) {
      token
      user {
        _id
        email
        username
        firstName
        lastName
      }
    }
  }
`;

export default Login;
