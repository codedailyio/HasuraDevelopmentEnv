Code for Action

```js
exports.onExecutePostLogin = async (event, api) => {
  const allowedRoles = (event.authorization && event.authorization.roles) || [];

  if (allowedRoles.length && event.user.email_verified) {
    api.idToken.setCustomClaim("https://hasura.io/jwt/claims", {
      "x-hasura-default-role": allowedRoles[0],
      "x-hasura-allowed-roles": allowedRoles,
      "x-hasura-user-id": event.user.user_id,
    });
  } else {
    api.access.deny("Email not verified");
  }
};
```


Example URL: 

https://[DOMAIN].us.auth0.com/authorize?response_type=id_token&redirect_uri=http://localhost:3000&client_id=[CLIENT_ID]&nonce=123
