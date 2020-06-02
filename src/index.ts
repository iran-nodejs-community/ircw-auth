import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";

const typeDefs = gql`
  type Greating {
    name: String
    ls: String
  }
  extend type Query {
    hello: Greating
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return { name: "Hello", ls: "world!" };
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});
const app = express();
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
