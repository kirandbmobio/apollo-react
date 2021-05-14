import { useQuery } from "@apollo/client";
import { ALL_USERS } from "../../utils/graphql";

export const FetchUsers = () => {
  const { loading, data } = useQuery(ALL_USERS);
  let users;
  if (data) {
    let { getAllUsers } = data;
    users = getAllUsers;
  }
  return { loading, users };
};
