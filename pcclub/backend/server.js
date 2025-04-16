const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();


const app = express();


app.use(express.json());
app.use(cors());


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB sėkmingai prisijungta"))
  .catch(err => console.error(err));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/computers', require('./routes/computers'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveris paleistas per ${PORT} portą`);
});
