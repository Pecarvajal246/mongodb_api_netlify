let connectDB = require("../../config/connectDB");
let output = require("../../utils/utils.js");
import middy from '@middy/core'
import validator from '@middy/validator'
import httpJsonBodyParser from '@middy/http-json-body-parser'

const inputSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        userId: { type: "number" },
        userFirstName: { type: "string" },
        userLastName: { type: "string" },
        username: { type: "string" },
      },
      required: ["userId"],
    },
  },
};

const addUser = async (event, context) => {
  let { httpMethod: method } = event;
  let client = await connectDB();
  const colUsers = client.db().collection("users");
  if (method == "POST") {
    const { userId, userFirstName, userLastName, username } = event.body;
    try {
      // agrega el id del usuario, si este no se encuentra en la base de datos
      let r = await colUsers.updateOne(
        {
          userId,
          userFirstName,
          userLastName,
          username,
        },
        {
          $setOnInsert: {
            userId,
            userFirstName,
            userLastName,
            username,
          },
        },
        { upsert: true }
      );
      console.log(r);
      return output(r);
    } catch (error) {
      console.log(error);
    }
  }
};

const handler = middy(addUser)
  .use(httpJsonBodyParser())
  .use(validator({ inputSchema }))
module.exports = { handler };
