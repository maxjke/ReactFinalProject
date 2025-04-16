require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const adminEmail = "admin@gmail.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const admin = new User({
        username: "admin",
        email: adminEmail,
        password: "admin123",
        role: "admin"
      });
      await admin.save();
      console.log("Admin account created.");
    } else {
      console.log("Admin account already exists.");
    }
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
