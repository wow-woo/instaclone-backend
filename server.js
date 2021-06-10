require("dotenv").config();
import { typeDefs, resolvers } from "./graphql/schema.js";
import { getUser, protectResolver } from "./graphql/users/users.utils.js";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import logger from "morgan";

const app = express();

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

apolloServer.applyMiddleware({ app });

app.set("/uploads", process.cwd() + "\\uploads");

app.use(logger("sdfsf"));

app.listen({ port: process.env.PORT }, () =>
  console.log("apollo-server-express is running on ", process.env.PORT)
);
