import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
const root = ReactDOM.createRoot(document.getElementById("root"));
// const client = new ApolloClient({
//   uri: "https://flyby-router-demo.herokuapp.com/",
//   cache: new InMemoryCache(),
// });
const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query GetLocations {
//         locations {
//           id
//           name
//           description
//           photo
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
