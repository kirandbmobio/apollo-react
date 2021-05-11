import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { DELETE_POST, FETCH_POSTS_QUERY } from "../../utils/graphql";

function DeletePost(props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePostById] = useMutation(DELETE_POST, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      let newData = [...data.getAllPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getAllPosts: {
            newData,
          },
        },
      });
      setConfirmOpen(false);
      if (props.callback) {
        props.callback();
      }
    },
    variables: {
      id: props.postId,
    },
  });
  function deletePost() {
    setConfirmOpen(true);
  }
  return (
    <>
      <Button as="div" floated="right" color="red" onClick={deletePost}>
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostById}
      ></Confirm>
    </>
  );
}

export default DeletePost;
