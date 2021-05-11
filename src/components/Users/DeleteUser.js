import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { ALL_USERS, DELETE_USER } from "../../utils/graphql";

function DeleteUser(props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteUserById] = useMutation(DELETE_USER, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: ALL_USERS,
      });
      let newData = [...data.getAllUsers];
      newData = [result.data.deleteUserById, ...newData];
      proxy.writeQuery({
        query: ALL_USERS,
        data: {
          ...data,
          getAllUsers: {
            newData,
          },
        },
      });
      setConfirmOpen(false);
      //   if (props.callback) {
      //     props.callback();
      //   }
    },
    variables: {
      id: props.userId,
    },
  });
  function deleteUser() {
    setConfirmOpen(true);
  }
  return (
    <>
      <Button as="div" floated="right" color="red" onClick={deleteUser}>
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteUserById}
      ></Confirm>
    </>
  );
}

export default DeleteUser;
