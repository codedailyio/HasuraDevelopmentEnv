import { ApolloServer, gql } from "apollo-server-micro";
import { send } from "micro";
import microCors from "micro-cors";
import { Credentials } from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

const cors = microCors();

const typeDefs = gql`
  type FilePayload {
    filePath: String!
    url: String!
  }

  type Query {
    get_file(filePath: String): FilePayload
  }
`;

export const getS3Access = () => {
  const access = new Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const s3 = new S3({
    credentials: access,
    region: "us-west-2",
    signatureVersion: "v4",
  });

  return s3;
};

const get_s3_image = async ({ filePath }: { filePath: string }) => {
  const s3 = getS3Access();

  const signedUrlExpireSeconds = 60 * 60 * 2; // 2 hours

  // filePath = derived image path
  const url = await s3.getSignedUrlPromise("getObject", {
    Bucket: process.env.AWS_S3_STORAGE_BUCKET,
    Key: filePath,
    Expires: signedUrlExpireSeconds,
  });

  return {
    url: url,
  };
};

const resolvers = {
  Query: {
    get_file: async (parent, data: { filePath: string }, context) => {
      const { url } = await get_s3_image({ filePath: data.filePath });
      return {
        filePath: data.filePath,
        url: url,
      };
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
