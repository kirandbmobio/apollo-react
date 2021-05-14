import React, { useContext } from "react";
import { Grid, Transition } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import { AuthContext } from "../context/auth";
import UserCard from "../components/Users/UserCard";
import UserForm from "../components/Users/UserForm.js";

function Users() {
  const context = useContext(AuthContext);
  const users = useSelector((state) => state.userReducer.users);
  const loading = useSelector((state) => state.userReducer.loading);
  let dispatch = useDispatch();
  dispatch({ type: "FETCH_USERS" });

  return (
    <>
      <Grid>
        <Grid.Row>
          {context.user && (
            <Grid.Column>
              <UserForm />
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Users</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>Loading User .....</h1>
          ) : (
            <Transition.Group>
              {users.length > 0 &&
                users.map((singleUser) => (
                  <Grid.Column
                    key={singleUser._id}
                    style={{ marginBottom: 20 }}
                  >
                    <UserCard singleUser={singleUser} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Users;
