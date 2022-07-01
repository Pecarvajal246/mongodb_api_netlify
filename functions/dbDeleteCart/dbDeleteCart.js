let connectDB = require("../../config/connectDB");
let output = require("../../utils/utils.js");

const handler = async (event) => {
  let { httpMethod: method } = event;
  let client = await connectDB();
  const colUsers = client.db().collection("users");
  if (method == "DELETE") {
    try {
      const { userId } = JSON.parse(event.body);
      let r = await colUsers.updateOne({ userId }, { $unset: { items: "" } });
      console.log(r);
      return output(r);
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = { handler };
