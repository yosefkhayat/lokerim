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

  const checkRangeExists = async (sheetName) => {
    try {
      const response = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
        ranges: [sheetName],
        fields: 'sheets.properties'
      });

      return response.data.sheets.length > 0;
    } catch (error) {
      return false;
    }
  };

  app.get("/", (req, res) => {
    res.status(200).send("Hello, world!");
  });
  app.get("/:question", async (req, res) => {
    const sheetName = req.params['question'];

    const rangeExists = await checkRangeExists(sheetName);
    if (rangeExists) {

      const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: `${sheetName}!A:G`,
      });
      const welcome = getRows.data.values[0];
      // Extract headers from the first sub-array
      const headers = getRows.data.values[1];


      let result ={};
      result.welcome = welcome;
      // Convert the remaining data into the desired format
      result.questions = getRows.data.values.slice(2).map(item => ({
        question: item[headers.indexOf("question")],
        options: [
          item[headers.indexOf("1")],
          item[headers.indexOf("2")],
          item[headers.indexOf("3")],
          item[headers.indexOf("4")]
        ],
        correctAnswer: parseInt(item[headers.indexOf("correctAnswer")], 10),
        image: item[headers.indexOf("image")]
      }));
      res.status(200).send(result);

    } else {
      res.status(404).send('No questions found');
    }});
  app.post("/", async (req, res) => {
    const { username, score, quizName } = req.body;

    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "info!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[username, score, quizName]],
      },
    });

    res.send("Successfully submitted! Thank you!");
  });
})();
const port = process.env.PORT || 1337;
app.listen(port, (req, res) => console.log("running on 1337"));