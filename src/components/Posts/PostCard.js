import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import LikeButton from "./LikeButton";
import DeletePost from "./DeletePost";

import { dateFormat } from "../../utils/filter";

function PostCard({ post }) {
  const { user } = useContext(AuthContext);
  const { _id, title, createdAt, author } = post;
  function commentOnPost() {
    console.log("comment");
  }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header as={Link} to={`/posts/${_id}`}>
          {title}
        </Card.Header>
        <Card.Meta>{dateFormat(createdAt)}</Card.Meta>
        <Card.Description>{title}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton
          post={{ _id, title, createdAt, author }}
          user={user}
        ></LikeButton>
        <Button as="div" labelPosition="right" onClick={commentOnPost}>
          <Button color="blue" basic>
            <Icon name="comment" />
            Comment
          </Button>
          <Label basic color="blue" pointing="left">
            2,048
          </Label>
        </Button>
        {user && user.username === author.username && (
          <DeletePost postId={_id} />
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
