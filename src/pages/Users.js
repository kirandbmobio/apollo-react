import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import UserCard from "../components/Users/UserCard";
import UserForm from "../components/Users/UserForm.js";
import { ALL_USERS } from "../utils/graphql";

function Users() {
  const context = useContext(AuthContext);
  const { loading, data } = useQuery(ALL_USERS);
  let users;
  if (data) {
    let { getAllUsers } = data;
    users = getAllUsers;
  }
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
