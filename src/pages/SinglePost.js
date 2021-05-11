import React, { useContext } from "react";
import { Grid, Card } from "semantic-ui-react";
import { useQuery } from "@apollo/client";

import { GET_POST_BY_ID } from "../utils/graphql";
import { dateFormat } from "../utils/filter";
import { AuthContext } from "../context/auth";

import LikeButton from "../components/Posts/LikeButton";
import DeletePost from "../components/Posts/DeletePost";

function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const { loading, data } = useQuery(GET_POST_BY_ID, {
    variables: { id: postId },
  });
  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (loading) {
    postMarkup = <p>Loading Page......</p>;
  } else {
    let {
      getPostById: { _id, title, content, createdAt, author },
    } = data;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>{dateFormat(createdAt)}</Card.Meta>
                <Card.Description>{content}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton
                  user={user}
                  post={{ _id, title, content, author }}
                />
                {user && user.username === author.username && (
                  <DeletePost postId={_id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return <div>{postMarkup}</div>;
}

export default SinglePost;
