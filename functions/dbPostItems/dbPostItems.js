// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
let connectDB = require("../../config/connectDB");
let output = require("../../utils/utils.js");
let axios = require("axios");

const handler = async (event) => {
  let { httpMethod: method, queryStringParameters: p } = event;
  let client = await connectDB();
  const colItems = client.db().collection("items");
  if (method == "POST") {
    const { link } = p;
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products?limit=20"
        // link
      );
      const data = response.data;
      await colItems.insertMany(data);
      return output(data);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = { handler };
