let connectDB = require("../../config/connectDB");
let output = require("../../utils/utils.js");

const handler = async (event) => {
  let { httpMethod: method, queryStringParameters: p } = event;
  let client = await connectDB();
  const colUsers = client.db().collection("users");
  if (method == "GET") {
    try {
      let users = colUsers.aggregate([
        {
          $lookup: {
            from: "items",
            localField: "items",
            foreignField: "id",
            as: "items_info",
          },
        },
      ]);
      for await (const user of users) {
        if (user.userId === parseInt(p.userId)) {
          return output(user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = { handler };
