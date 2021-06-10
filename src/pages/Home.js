import React, { useContext } from "react";
import { Grid, Transition } from "semantic-ui-react";
import { useSelector, useDispatch, useStore } from "react-redux";

import { AuthContext } from "../context/auth";
import PostCard from "../components/Posts/PostCard";
import PostForm from "../components/Posts/PostForm.js";

function Home() {
  const context = useContext(AuthContext);
  /* states */
  //   const posts =
  let posts = useSelector((state) => state.postReducer.posts);
  let loading = useSelector((state) => state.postReducer.loading);
  let dispatch = useDispatch();
  dispatch({ type: "FETCH_POSTS" });
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {context.user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading Posts ........</h1>
        ) : (
          <Transition.Group>
            {posts.length > 0 &&
              posts.map((post) => (
                <Grid.Column key={post._id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
