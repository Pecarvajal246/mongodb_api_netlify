let connectDB = require("../../config/connectDB");
let output = require("../../utils/utils.js");

const handler = async (event) => {
  let { httpMethod: method, queryStringParameters: p } = event;
  let client = await connectDB();
  const colItems = client.db().collection("items");
  let r;
  if (method == "GET") {
    try {
      if (p.id) {
        r = await colItems.find({ id: parseInt(p.id) }).toArray();
      } else {
        r = await colItems.find({}).toArray();
      }
      console.log(r)
      return output(r);
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = { handler };
