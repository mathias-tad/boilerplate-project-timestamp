import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 8000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  var { date } = req.params;
  var ddate = {};
  console.log(new Date("December 25, 2023"));
  console.log(date);

  if (!date) {
    ddate = {
      unix: (new Date() / 1000) * 1000,
      utc: `${new Date().toGMTString()}`,
    };
  } else {
    ddate = {
      unix:
        !date.includes("-") && !date.includes(" ")
          ? parseInt(date)
          : (new Date(date) / 1000) * 1000,
      utc: `${
        !date.includes("-") && !date.includes(" ")
          ? new Date((date / 1000) * 1000).toGMTString()
          : new Date(date).toGMTString()
      }`,
    };
  }
  res.json(ddate.utc != "Invalid Date" ? ddate : { error: "Invalid Date" });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
