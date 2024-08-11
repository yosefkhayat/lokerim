const express = require("express");
const cors = require('cors');
const { google } = require("googleapis");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
(async () => {
// Parse the credentials JSON from the environment variable
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const auth = new google.auth.GoogleAuth({
  credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key.replace(/\\n/g, '\n'),
  },
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "19AviszQbiPmqZHoRnPUHI3TJJimtYYLZzpnH_VmQcdI";


app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

app.post("/", async (req, res) => {
  const { username, score } = req.body;
  
  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "info!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[username, score]],
    },
  });

  res.send("Successfully submitted! Thank you!");
});
})();
const port =  process.env.PORT || 1337; 
app.listen(port, (req, res) => console.log("running on 1337"));