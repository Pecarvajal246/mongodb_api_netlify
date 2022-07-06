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
        r = await colUsers.findOne({ userId });
        let itemsInCart = r.items;
        for (const item of items) {
          const index = itemsInCart.indexOf(item);
          if (index !== -1) {
            itemsInCart.splice(index, 1);
          }
        }
        r = await colUsers.updateOne({ userId }, { $set: { items: itemsInCart } });
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
