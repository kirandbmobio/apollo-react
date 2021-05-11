import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import DeleteUser from "./DeleteUser";

import { dateFormat } from "../../utils/filter";

function UserCard(props) {
  const { user } = useContext(AuthContext);
  const {
    singleUser: { _id, createdAt, firstName, lastName, email, username },
  } = props;
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header as={Link} to={`/users/${_id}`}>
          {username}
        </Card.Header>
        <Card.Meta>{dateFormat(createdAt)}</Card.Meta>
        <Card.Description>{firstName + " " + lastName}</Card.Description>
        <Card.Description>{email}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {user && user.username !== username && <DeleteUser userId={_id} />}
      </Card.Content>
    </Card>
  );
}

export default UserCard;
