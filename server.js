require("dotenv").config();
import { typeDefs, resolvers } from "./graphql/schema.js";
import {
  getUser,
  protectResolver,
  getUpload,
  parseForHashTag,
} from "./graphql/users/users.utils.js";
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
      parseForHashTag,
      getUpload,
      protectResolver,
      loggedInUser: await getUser(req?.headers?.token),
    };
  },
});
app.use(logger("tiny"));

app.use("/static", express.static("uploads"));

app.listen({ port: process.env.PORT }, () =>
  console.log("apollo-server-express is running on ", process.env.PORT)
);

apolloServer.applyMiddleware({ app });
