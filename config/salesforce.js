const cors = require("cors");
var express = require("express"); //Adding Express
var http = require("http"); //Adding http
var jsforce = require("jsforce"); //Adding JsForce
var app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

require('dotenv').config({ path: '../.env' })
console.log(process.env)

const { URL, USERNAME, PASSWORD, TOKEN } = process.env;


const conn = new jsforce.Connection({
  loginUrl: URL,
});

conn.login(USERNAME, PASSWORD + TOKEN, (err, userInfo) => {
  if (err) {
    console.log(err);
  } else {
    console.log("User Id: " + userInfo.id);
    console.log("Ord Id: " + userInfo.organizationId);
  }
});

//-----------------------------------------------------------------------------------

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

//Defauly API call (for testing)
app.get("/", (req, res) => {
  res.status(200).send({
    message: "working",
  });
});

app.post("/users", (req, res) => {
    checkEmailSF(conn, req.body.email).then((result) => {
    console.log(result);
    res.send({
      isEmail: result,
    });
  });
});

async function checkEmailSF(conn, email) {
  let isEmail = false;
  await conn.query("SELECT ID, Name, Email FROM Contact", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      result.records.forEach((account) => {
        if (account.Email === email) {
          console.log(account.Email);
          isEmail = 'SUCCESS';
        }
      });
    }
  });

  return isEmail;
}

// async function main() {
//   let conn = await connect();
//   await login(conn);

//   const email = "allanwzhang04@gmail.com";

//   let isEmailSF = await checkEmailSF(conn, email);
//   console.log(isEmailSF);
// }

// main();
