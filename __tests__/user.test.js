require("isomorphic-fetch");

describe("User Tests", () => {
  it("should be to get self users", async () => {
    expect.assertions(2);
    try {
      const response = await fetch(process.env.HASURA_ENDPOINT, {
        method: "POST",
        headers: {
          "x-hasura-admin-secret": "admin_secret",
          "x-hasura-role": "user",
          "x-hasura-user-id": "e4182c07-70b1-4638-a11e-979889a80593",
        },
        body: JSON.stringify({
          query: `query GetUser {
            users {
              id
              username
            }
          }
          `,
          variables: {},
        }),
      });
      const { data } = await response.json();

      expect(data.users.length).toEqual(1);
      expect(data.users[0].id).toEqual("e4182c07-70b1-4638-a11e-979889a80593");
    } catch (error) {
      console.log(error);
    }
  });

  it("should fail to get other user", async () => {
    expect.assertions(2);
    try {
      const response = await fetch(process.env.HASURA_ENDPOINT, {
        method: "POST",
        headers: {
          "x-hasura-admin-secret": "admin_secret",
          "x-hasura-role": "user",
          "x-hasura-user-id": "e4182c07-70b1-4638-a11e-979889a80593",
        },
        body: JSON.stringify({
          query: `query GetUser {
            users {
              id
              username
            }
          }
          `,
          variables: {},
        }),
      });

      const { data } = await response.json();

      expect(data.users.length).toEqual(1);
      expect(data.users[0].id).not.toEqual(
        "0aee3b94-0d3b-4073-b17e-04722ffcd991"
      );
    } catch (error) {
      console.log(error);
    }
  });
});
