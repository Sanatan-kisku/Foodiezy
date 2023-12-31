const dotenv = require("dotenv");

dotenv.config();
const mongoose = require('mongoose');

const mongoDB = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("---", err)
    else {
      console.log("Connected Successfully")
      const fetched_data = await mongoose.connection.db.collection("food_items")
      fetched_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection("foodCategory")
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.food_items = data;
            global.foodCategory = catData;
          }
        })
        // if (err) console.log(err);
        // else {
        //   global.food_items = data;
        // }
      })
    }
  });
}

module.exports = mongoDB;