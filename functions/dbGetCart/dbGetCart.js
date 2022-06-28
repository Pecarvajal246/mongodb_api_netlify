let connectDB = require("../../config/connectDB");
let output = require("../../utils/utils.js");

const handler = async (event) => {
  let { httpMethod: method, queryStringParameters: p } = event;
  let client = await connectDB();
  const colUsers = client.db().collection("users");
  if (method == "GET") {
    try {
      let itemsInCart = colUsers.aggregate([
        {
          $lookup: {
            from: "items",
            localField: "items",
            foreignField: "id",
            as: "items_info",
          },
        },
      ]);
      for await (const items of itemsInCart) {
        if (items.userId === parseInt(p.userId)) {
          let text = items.items_info
          console.log(text);
          return output(text);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = { handler };
