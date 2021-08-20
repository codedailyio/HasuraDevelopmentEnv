import { ApolloServer, gql } from "apollo-server-micro";
import { send } from "micro";
import microCors from "micro-cors";

const cors = microCors();

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const resolvers = {
  Query: {
    sayHello(parent, args, context) {
      return "Hello World!";
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
export default apolloServer.start().then(() => {
  const handler = apolloServer.createHandler({
    path: "/api/file",
  });
  return cors((req, res) =>
    req.method === "OPTIONS" ? send(res, 200, "ok") : handler(req, res)
  );
});

export const config = {
  api: {
    bodyParser: false,
  },
};
