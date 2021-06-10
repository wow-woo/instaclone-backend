require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./graphql/schema.js";
import { getUser, protectResolver } from "./graphql/users/users.utils.js";

const apolloServer = new ApolloServer({
  // schema,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      protectResolver,
      loggedInUser: await getUser(req?.headers?.token),
    };
  },
});

apolloServer
  .listen({ port: process.env.PORT })
  .then(() => console.log("server is running on " + process.env.PORT));
