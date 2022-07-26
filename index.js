const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const app = express();
const port = 5000;
const { users } = require("./mock_data");

// Midlewares
app.use(cors());

function createUser(input) {
  const id = Date.now();
  return {
    id: id,
    ...input,
  };
}

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id == id);
  },
  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
};
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

app.listen(port, () => console.log(`Server is running on port ${port}`));
