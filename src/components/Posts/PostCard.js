import React from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const { _id, title, createdAt } = post;
  function likePost() {
    console.log("likePost");
  }
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
        <Card.Meta>{moment(createdAt, "x").fromNow()}</Card.Meta>
        <Card.Description>{title}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          as="div"
          labelPosition="right"
          onClick={likePost}
          style={{ marginBottom: 10 }}
        >
          <Button color="teal" basic>
            <Icon name="heart" />
            Like
          </Button>
          <Label basic color="teal" pointing="left">
            2,048
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentOnPost}>
          <Button color="blue" basic>
            <Icon name="comment" />
            Comment
          </Button>
          <Label basic color="blue" pointing="left">
            2,048
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
