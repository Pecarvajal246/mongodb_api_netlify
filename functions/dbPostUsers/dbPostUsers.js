let connectDB = require("../../config/connectDB");
let output = require("../../utils/utils.js");

const handler = async (event) => {
  let { httpMethod: method } = event;
  let client = await connectDB();
  const colUsers = client.db().collection("users");
  if (method == "POST") {
    const { userId, userFirstName, userLastName, username } = JSON.parse(event.body);
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

module.exports = { handler };
