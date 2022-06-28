let connectDB = require("../../config/connectDB");
let output = require("../../utils/utils.js");
const middy = require("middy");
const {
  jsonBodyParser,
  validator,
  httpErrorHandler,
} = require("middy/middlewares");

const inputSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        userId: { type: "number" },
        items: { type: "array" },
      },
      required: ["userId", "items"],
    },
  },
};

const addToCart = async (event) => {
  let { httpMethod: method } = event;
  let client = await connectDB();
  const colUsers = client.db().collection("users");
  if (method == "POST") {
    try {
      const { userId, items } = event.body;
      let r = await colUsers.updateOne(
        { userId },
        { $push: { items: { $each: items } } }
      );
      console.log(r);
      return output(r);
    } catch (error) {
      console.log(error);
    }
  }
};
const handler = middy(addToCart)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());
module.exports = { handler };
