const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("=====================================");
    console.log(" MongoDB Connection Successful ");
    console.log(" Host:", conn.connection.host);
    console.log(" Database Name:", conn.connection.name);
    console.log("=====================================");

  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
  console.log("MONGO URI FROM RENDER:", process.env.MONGO_URI);

};

module.exports = connectDB;
