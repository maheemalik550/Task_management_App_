require('dotenv').config();
const express = require("express")
// express instance
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser");
const allroutes = require("./routes/index")
const { connect_to_database } = require("./database");
app.use(cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200
  })
);



app.get('/new', (req, res) => {
  res.send('This is the /new endpoint');
});

app.use(express.json());
app.use(cookieParser());
connect_to_database()
app.use(allroutes)


app.listen(3000, () => {
    console.log(`server is listening at port:3000`);
  });