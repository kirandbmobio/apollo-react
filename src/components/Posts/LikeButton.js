import React, { useState, useEffect } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import gql from "graphql-tag";

function LikeButton({ post, user }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && post.author.username === user.username) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, post]);

  const likeBtn = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
        Like
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
        Like
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
      Like
    </Button>
  );

  function likePost() {
    console.log("likePost");
  }

  return (
    <Button
      as="div"
      labelPosition="right"
      onClick={likePost}
      style={{ marginBottom: 10 }}
    >
      {likeBtn}
      <Label basic color="teal" pointing="left">
        2,048
      </Label>
    </Button>
  );
}

export default LikeButton;
