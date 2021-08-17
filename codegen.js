module.exports = {
  overwrite: true,
  generates: {
    "./src/anonymous/index.tsx": {
      schema: "http://localhost:8080/v1/graphql",
      documents: ["./src/anonymous/**/*.graphql"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        preResolveTypes: true,
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        constEnums: true,
        reactApolloVersion: 3,
      },
    },
    "./src/user/index.tsx": {
      schema: [
        {
          "http://localhost:8080/v1/graphql": {
            headers: {
              "x-hasura-role": "account",
              "x-hasura-admin-secret": "admin_secret",
            },
          },
        },
      ],
      documents: ["./src/user/**/*.graphql"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        preResolveTypes: true,
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        enumsAsTypes: true,
        constEnums: true,
        reactApolloVersion: 3,
      },
    },
    "./src/admin/index.ts": {
      schema: [
        {
          "http://localhost:8080/v1/graphql": {
            headers: {
              "x-hasura-role": "admin",
              "x-hasura-admin-secret": "admin_secret",
            },
          },
        },
      ],
      documents: ["./src/admin/**/*.graphql"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        preResolveTypes: true,
        skipTypename: false,
        enumsAsTypes: true,
        constEnums: true,
      },
    },
  },
};
