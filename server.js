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

app.get("/api/:date", (req, res, next) => {
  const { date } = req.params;

  res.json({
    unix: !date.includes("-") ? parseInt(date) : (new Date(date) / 1000) * 1000,
    utc: `${
      !date.includes("-")
        ? new Date((date / 1000) * 1000).toGMTString()
        : new Date(date).toGMTString()
    }`,
  });
  console.log(new Date(date) / 1000);
  console.log(new Date((new Date(date) / 1000) * 1000).toGMTString());
  console.log(date);
  next();
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
