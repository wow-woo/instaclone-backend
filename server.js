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
import http from "http";

const app = express();

const apolloServer = new ApolloServer({
  // schema,
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (req) {
      return {
        parseForHashTag,
        getUpload,
        protectResolver,
        loggedInUser: await getUser(req?.headers?.token),
      };
    } else {
      return {
        loggedInUser: connection?.context?.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      return { loggedInUser: await getUser(token) };
    },
  },
});

apolloServer.applyMiddleware({ app });

app.use(logger("tiny"));

// app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(process.env.PORT, () =>
  console.log("apollo-server-express is running on ", process.env.PORT)
);
