const express = require("express");
const cors = require('cors');
const { google } = require("googleapis");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const { username, score } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "creadentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "19AviszQbiPmqZHoRnPUHI3TJJimtYYLZzpnH_VmQcdI";

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

app.listen(1337, (req, res) => console.log("running on 1337"));