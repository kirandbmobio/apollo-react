import React from "react";
import App from "./App";
import { createHttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
