import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  function onChange() {
    console.log("onchange");
  }
  function onSubmit() {
    console.log("submit");
  }
  return (
    <div>
      <Form onSubmit={onSubmit} noValidate>
        <h1>Login</h1>
        <Form.Input
          label="Email"
          placeholder="Email....."
          name="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password....."
          name="password"
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

export default Login;
