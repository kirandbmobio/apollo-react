import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";

import PostCard from "../components/Posts/PostCard";

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  console.log(data);
  let posts;
  if (data) {
    let { getAllPosts } = data;
    posts = getAllPosts;
  }
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading Post .....</h1>
        ) : (
          posts.length > 0 &&
          posts.map((post) => (
            <Grid.Column key={post._id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getAllPosts {
      _id
      title
      createdAt
      updatedAt
    }
  }
`;

export default Home;
