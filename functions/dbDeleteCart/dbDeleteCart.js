let connectDB = require("../../config/connectDB");
let output = require("../../utils/utils.js");

const handler = async (event) => {
  let { httpMethod: method } = event;
  let client = await connectDB();
  const colUsers = client.db().collection("users");
  let r;
  if (method == "DELETE") {
    try {
      const { userId, items } = JSON.parse(event.body);
      if (items) {
        console.log(items);
        r = await colUsers.updateOne({ userId }, { $pullAll: { items } });
        return output(r);
      }
      r = await colUsers.updateOne({ userId }, { $unset: { items: "" } });
      return output(r);
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = { handler };
